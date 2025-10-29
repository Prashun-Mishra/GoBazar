import prisma from '@/config/database';
import { CartItemWithRelations, AddToCartRequest, UpdateCartRequest } from '@/types';

class CartService {
  async getCart(userId: string): Promise<CartItemWithRelations[]> {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            category: true,
            subcategory: true,
          },
        },
        variant: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return cartItems as CartItemWithRelations[];
  }

  async addToCart(userId: string, data: AddToCartRequest): Promise<{ success: boolean; message: string; cartItem?: CartItemWithRelations }> {
    try {
      console.log('🛒 [Cart Service] Adding to cart:', { userId, data });

      // Check if product exists and is active
      const product = await prisma.product.findFirst({
        where: {
          id: data.productId,
          isActive: true,
        },
      });

      console.log('🛒 [Cart Service] Product found:', !!product);

      if (!product) {
        console.error('❌ [Cart Service] Product not found:', data.productId);
        return {
          success: false,
          message: 'Product not found or unavailable',
        };
      }

      // Check if variant exists (if provided)
      if (data.variantId) {
        const variant = await prisma.productVariant.findFirst({
          where: {
            id: data.variantId,
            productId: data.productId,
            isActive: true,
          },
        });

        if (!variant) {
          return {
            success: false,
            message: 'Product variant not found or unavailable',
          };
        }

        // Check variant stock
        if (variant.stock < data.quantity) {
          return {
            success: false,
            message: 'Insufficient stock for this variant',
          };
        }
      } else {
        // Check product stock
        if (product.stock < data.quantity) {
          return {
            success: false,
            message: 'Insufficient stock',
          };
        }
      }

      // Check if item already exists in cart
      console.log('🛒 [Cart Service] Checking existing cart item with:', {
        userId,
        productId: data.productId,
        variantId: data.variantId || null
      });

      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          userId,
          productId: data.productId,
          variantId: data.variantId || null,
        },
      });

      console.log('🛒 [Cart Service] Existing cart item found:', !!existingCartItem);

      let cartItem;

      if (existingCartItem) {
        // Update quantity
        const newQuantity = existingCartItem.quantity + data.quantity;
        
        // Check stock again for new quantity
        const maxStock = data.variantId 
          ? (await prisma.productVariant.findUnique({ where: { id: data.variantId } }))?.stock || 0
          : product.stock;

        if (newQuantity > maxStock) {
          return {
            success: false,
            message: 'Cannot add more items. Insufficient stock.',
          };
        }

        cartItem = await prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: newQuantity },
          include: {
            product: {
              include: {
                category: true,
                subcategory: true,
              },
            },
            variant: true,
          },
        });
      } else {
        // Create new cart item
        cartItem = await prisma.cartItem.create({
          data: {
            userId,
            productId: data.productId,
            variantId: data.variantId,
            quantity: data.quantity,
          },
          include: {
            product: {
              include: {
                category: true,
                subcategory: true,
              },
            },
            variant: true,
          },
        });
      }

      return {
        success: true,
        message: 'Item added to cart successfully',
        cartItem: cartItem as CartItemWithRelations,
      };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return {
        success: false,
        message: 'Failed to add item to cart',
      };
    }
  }

  async updateCartItem(userId: string, cartItemId: string, data: UpdateCartRequest): Promise<{ success: boolean; message: string; cartItem?: CartItemWithRelations }> {
    try {
      // Find the cart item
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          id: cartItemId,
          userId,
        },
        include: {
          product: true,
          variant: true,
        },
      });

      if (!existingCartItem) {
        return {
          success: false,
          message: 'Cart item not found',
        };
      }

      // If quantity is 0, remove the item
      if (data.quantity === 0) {
        await prisma.cartItem.delete({
          where: { id: cartItemId },
        });

        return {
          success: true,
          message: 'Item removed from cart',
        };
      }

      // Check stock availability
      const maxStock = existingCartItem.variant 
        ? existingCartItem.variant.stock
        : existingCartItem.product.stock;

      if (data.quantity > maxStock) {
        return {
          success: false,
          message: 'Insufficient stock available',
        };
      }

      // Update the cart item
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: data.quantity },
        include: {
          product: {
            include: {
              category: true,
              subcategory: true,
            },
          },
          variant: true,
        },
      });

      return {
        success: true,
        message: 'Cart item updated successfully',
        cartItem: updatedCartItem as CartItemWithRelations,
      };
    } catch (error) {
      console.error('Error updating cart item:', error);
      return {
        success: false,
        message: 'Failed to update cart item',
      };
    }
  }

  async removeFromCart(userId: string, cartItemId: string): Promise<{ success: boolean; message: string }> {
    try {
      const cartItem = await prisma.cartItem.findFirst({
        where: {
          id: cartItemId,
          userId,
        },
      });

      if (!cartItem) {
        return {
          success: false,
          message: 'Cart item not found',
        };
      }

      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });

      return {
        success: true,
        message: 'Item removed from cart successfully',
      };
    } catch (error) {
      console.error('Error removing from cart:', error);
      return {
        success: false,
        message: 'Failed to remove item from cart',
      };
    }
  }

  async clearCart(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      await prisma.cartItem.deleteMany({
        where: { userId },
      });

      return {
        success: true,
        message: 'Cart cleared successfully',
      };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return {
        success: false,
        message: 'Failed to clear cart',
      };
    }
  }

  async getCartSummary(userId: string): Promise<{
    items: CartItemWithRelations[];
    totalItems: number;
    subtotal: number;
    total: number;
  }> {
    const cartItems = await this.getCart(userId);
    
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    const subtotal = cartItems.reduce((sum, item) => {
      const price = item.variant ? Number(item.variant.price) : Number(item.product.price);
      return sum + (price * item.quantity);
    }, 0);

    // For now, total equals subtotal (no taxes or delivery fees in cart)
    const total = subtotal;

    return {
      items: cartItems,
      totalItems,
      subtotal,
      total,
    };
  }

  async validateCartForCheckout(userId: string): Promise<{ 
    valid: boolean; 
    message?: string; 
    unavailableItems?: string[] 
  }> {
    const cartItems = await this.getCart(userId);

    if (cartItems.length === 0) {
      return {
        valid: false,
        message: 'Cart is empty',
      };
    }

    const unavailableItems: string[] = [];

    for (const item of cartItems) {
      // Check if product is still active
      if (!item.product.isActive) {
        unavailableItems.push(item.product.name);
        continue;
      }

      // Check stock availability
      const availableStock = item.variant ? item.variant.stock : item.product.stock;
      
      if (availableStock < item.quantity) {
        unavailableItems.push(`${item.product.name} (only ${availableStock} available)`);
      }
    }

    if (unavailableItems.length > 0) {
      return {
        valid: false,
        message: 'Some items in your cart are no longer available',
        unavailableItems,
      };
    }

    return {
      valid: true,
    };
  }
}

export default new CartService();
