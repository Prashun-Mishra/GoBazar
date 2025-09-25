import prisma from '@/config/database';
import { CreateOrderRequest, OrderWithRelations } from '@/types';
import cartService from './cartService';
import productService from './productService';
import emailService from './emailService';

class OrderService {
  async createOrder(userId: string, orderData: CreateOrderRequest): Promise<{
    success: boolean;
    message: string;
    order?: OrderWithRelations;
  }> {
    try {
      // Validate address
      const address = await prisma.address.findFirst({
        where: {
          id: orderData.addressId,
          userId,
        },
      });

      if (!address) {
        return {
          success: false,
          message: 'Invalid delivery address',
        };
      }

      // Validate cart items or provided items
      let orderItems = orderData.items;
      
      if (!orderItems || orderItems.length === 0) {
        // Get items from cart if not provided
        const cartItems = await cartService.getCart(userId);
        if (cartItems.length === 0) {
          return {
            success: false,
            message: 'No items to order',
          };
        }
        
        orderItems = cartItems.map(item => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        }));
      }

      // Validate stock availability and calculate totals
      let subtotal = 0;
      const validatedItems = [];

      for (const item of orderItems) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          include: { variants: true },
        });

        if (!product || !product.isActive) {
          return {
            success: false,
            message: `Product ${item.productId} is not available`,
          };
        }

        let variant = null;
        let price = Number(product.price);
        let availableStock = product.stock;
        let itemName = product.name;
        let itemImage = product.images[0] || '';
        let itemUnit = product.unit;

        if (item.variantId) {
          variant = product.variants.find(v => v.id === item.variantId);
          if (!variant || !variant.isActive) {
            return {
              success: false,
              message: `Product variant ${item.variantId} is not available`,
            };
          }
          price = Number(variant.price);
          availableStock = variant.stock;
          itemName = `${product.name} - ${variant.name}`;
          itemUnit = variant.unit;
        }

        if (availableStock < item.quantity) {
          return {
            success: false,
            message: `Insufficient stock for ${itemName}. Only ${availableStock} available.`,
          };
        }

        const itemTotal = price * item.quantity;
        subtotal += itemTotal;

        validatedItems.push({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price,
          name: itemName,
          image: itemImage,
          unit: itemUnit,
        });
      }

      // Apply coupon if provided
      let discount = 0;
      let coupon = null;

      if (orderData.couponCode) {
        coupon = await prisma.coupon.findFirst({
          where: {
            code: orderData.couponCode,
            isActive: true,
            validFrom: { lte: new Date() },
            validTo: { gte: new Date() },
          },
        });

        if (!coupon) {
          return {
            success: false,
            message: 'Invalid or expired coupon code',
          };
        }

        if (subtotal < Number(coupon.minOrderValue)) {
          return {
            success: false,
            message: `Minimum order value of ₹${coupon.minOrderValue} required for this coupon`,
          };
        }

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
          return {
            success: false,
            message: 'Coupon usage limit exceeded',
          };
        }

        // Calculate discount
        if (coupon.discountType === 'PERCENTAGE') {
          discount = (subtotal * Number(coupon.discountValue)) / 100;
          if (coupon.maxDiscount) {
            discount = Math.min(discount, Number(coupon.maxDiscount));
          }
        } else {
          discount = Number(coupon.discountValue);
        }

        discount = Math.min(discount, subtotal); // Discount cannot exceed subtotal
      }

      // Calculate delivery fee and taxes
      const deliveryFee = subtotal >= 500 ? 0 : 40; // Free delivery above ₹500
      const taxes = Math.round((subtotal - discount) * 0.05); // 5% tax
      const total = subtotal - discount + deliveryFee + taxes;

      // Create order in transaction
      const order = await prisma.$transaction(async (tx) => {
        // Create the order
        const newOrder = await tx.order.create({
          data: {
            userId,
            addressId: orderData.addressId,
            status: 'RECEIVED',
            subtotal,
            discount,
            deliveryFee,
            taxes,
            total,
            deliverySlot: orderData.deliverySlot,
            couponCode: orderData.couponCode,
          },
        });

        // Create order items
        for (const item of validatedItems) {
          await tx.orderItem.create({
            data: {
              orderId: newOrder.id,
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.quantity,
              price: item.price,
              name: item.name,
              image: item.image,
              unit: item.unit,
            },
          });

          // Update stock
          await productService.updateProductStock(
            item.productId,
            item.variantId,
            item.quantity
          );
        }

        // Update coupon usage count
        if (coupon) {
          await tx.coupon.update({
            where: { id: coupon.id },
            data: { usedCount: { increment: 1 } },
          });
        }

        // Clear cart if items were taken from cart
        if (!orderData.items) {
          await tx.cartItem.deleteMany({
            where: { userId },
          });
        }

        return newOrder;
      });

      // Get complete order with relations
      const completeOrder = await this.getOrderById(order.id, userId);

      if (completeOrder) {
        // Send order confirmation email
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user) {
          await emailService.sendOrderConfirmation(user.email, {
            id: order.id,
            total: order.total,
            deliverySlot: order.deliverySlot,
          });
        }
      }

      return {
        success: true,
        message: 'Order placed successfully',
        order: completeOrder,
      };
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        message: 'Failed to place order. Please try again.',
      };
    }
  }

  async getOrders(userId: string, page: number = 1, limit: number = 10): Promise<{
    orders: OrderWithRelations[];
    total: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        include: {
          user: true,
          address: true,
          items: {
            include: {
              product: true,
              variant: true,
            },
          },
          coupon: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return {
      orders: orders as OrderWithRelations[],
      total,
      page,
      limit,
    };
  }

  async getOrderById(orderId: string, userId?: string): Promise<OrderWithRelations | null> {
    const where: any = { id: orderId };
    if (userId) {
      where.userId = userId;
    }

    const order = await prisma.order.findFirst({
      where,
      include: {
        user: true,
        address: true,
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        coupon: true,
      },
    });

    return order as OrderWithRelations | null;
  }

  async updateOrderStatus(orderId: string, status: 'RECEIVED' | 'PACKING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELED'): Promise<{
    success: boolean;
    message: string;
    order?: OrderWithRelations;
  }> {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status },
        include: {
          user: true,
          address: true,
          items: {
            include: {
              product: true,
              variant: true,
            },
          },
          coupon: true,
        },
      });

      return {
        success: true,
        message: 'Order status updated successfully',
        order: order as OrderWithRelations,
      };
    } catch (error) {
      console.error('Error updating order status:', error);
      return {
        success: false,
        message: 'Failed to update order status',
      };
    }
  }

  async cancelOrder(orderId: string, userId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const order = await prisma.order.findFirst({
        where: {
          id: orderId,
          userId,
        },
        include: {
          items: true,
        },
      });

      if (!order) {
        return {
          success: false,
          message: 'Order not found',
        };
      }

      if (order.status === 'DELIVERED' || order.status === 'CANCELED') {
        return {
          success: false,
          message: 'Order cannot be canceled',
        };
      }

      // Update order status and restore stock
      await prisma.$transaction(async (tx) => {
        await tx.order.update({
          where: { id: orderId },
          data: { status: 'CANCELED' },
        });

        // Restore stock for each item
        for (const item of order.items) {
          if (item.variantId) {
            await tx.productVariant.update({
              where: { id: item.variantId },
              data: { stock: { increment: item.quantity } },
            });
          } else {
            await tx.product.update({
              where: { id: item.productId },
              data: { stock: { increment: item.quantity } },
            });
          }
        }
      });

      return {
        success: true,
        message: 'Order canceled successfully',
      };
    } catch (error) {
      console.error('Error canceling order:', error);
      return {
        success: false,
        message: 'Failed to cancel order',
      };
    }
  }

  // Admin methods
  async getAllOrders(page: number = 1, limit: number = 20, status?: string): Promise<{
    orders: OrderWithRelations[];
    total: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: true,
          address: true,
          items: {
            include: {
              product: true,
              variant: true,
            },
          },
          coupon: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders: orders as OrderWithRelations[],
      total,
      page,
      limit,
    };
  }

  async getOrderStats(): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<string, number>;
  }> {
    const [totalOrders, totalRevenue, ordersByStatus] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { total: true },
      }),
      prisma.order.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    const revenue = Number(totalRevenue._sum.total) || 0;
    const averageOrderValue = totalOrders > 0 ? revenue / totalOrders : 0;

    const statusCounts: Record<string, number> = {};
    ordersByStatus.forEach(item => {
      statusCounts[item.status] = item._count.status;
    });

    return {
      totalOrders,
      totalRevenue: revenue,
      averageOrderValue,
      ordersByStatus: statusCounts,
    };
  }
}

export default new OrderService();
