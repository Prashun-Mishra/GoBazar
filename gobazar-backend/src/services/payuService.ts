import crypto from 'crypto';
import config from '@/config';
import prisma from '@/config/database';

interface PayUPaymentRequest {
  orderId: string;
  amount: number;
  productInfo: string;
  firstName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
}

interface PayUResponse {
  txnid: string;
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  hash: string;
  key: string;
  surl: string;
  furl: string;
  service_provider: string;
  address1?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
}

class PayUService {
  private merchantKey: string;
  private merchantSalt: string;
  private payuUrl: string;
  private successUrl: string;
  private failureUrl: string;

  constructor() {
    this.merchantKey = config.paymentGateways.payu.merchantId;
    this.merchantSalt = config.paymentGateways.payu.secretKey;
    this.payuUrl = config.paymentGateways.payu.apiUrl;
    // PayU should send callbacks to backend, not frontend
    this.successUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payments/callback`;
    this.failureUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payments/callback`;
  }

  /**
   * Generate SHA512 hash for PayU payment
   */
  private generateHash(data: string): string {
    return crypto.createHash('sha512').update(data).digest('hex');
  }

  /**
   * Generate payment hash for PayU with both v1 and v2 formats
   * Formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
   */
  private generatePaymentHash(params: {
    key: string;
    txnid: string;
    amount: string;
    productinfo: string;
    firstname: string;
    email: string;
  }): any {
    const { key, txnid, amount, productinfo, firstname, email } = params;

    // UDF fields (user defined fields) - empty but must be included in correct positions
    const udf1 = '';
    const udf2 = '';
    const udf3 = '';
    const udf4 = '';
    const udf5 = '';

    // Correct PayU hash formula with UDF fields in proper positions
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${this.merchantSalt}`;

    console.log('🔐 [PayU] Generating payment hash');
    console.log('🔐 [PayU] Hash string:', hashString);

    const hash = this.generateHash(hashString);

    console.log('🔐 [PayU] Generated hash:', hash);

    // Return just the hash string (not JSON)
    // PayU expects a simple hash string, not a JSON object
    return hash;
  }

  /**
   * Verify payment response hash
   */
  private verifyResponseHash(params: {
    status: string;
    txnid: string;
    amount: string;
    productinfo: string;
    firstname: string;
    email: string;
    receivedHash: string;
  }): boolean {
    const { status, txnid, amount, productinfo, firstname, email, receivedHash } = params;

    // For successful payment
    const hashString = `${this.merchantSalt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${this.merchantKey}`;
    const calculatedHash = this.generateHash(hashString);

    console.log('🔐 [PayU] Verifying response hash');
    console.log('🔐 [PayU] Calculated hash:', calculatedHash);
    console.log('🔐 [PayU] Received hash:', receivedHash);

    return calculatedHash === receivedHash;
  }

  /**
   * Initiate payment request
   */
  async initiatePayment(paymentRequest: PayUPaymentRequest): Promise<PayUResponse> {
    try {
      console.log('💳 [PayU] Initiating payment for order:', paymentRequest.orderId);

      // Generate unique transaction ID
      const txnid = `TXN${Date.now()}${Math.random().toString(36).substring(7).toUpperCase()}`;

      // Generate payment hash
      // Note: PayU expects amount as string without unnecessary decimals
      // For whole numbers like 82, use "82" not "82.00"
      const amountStr = paymentRequest.amount % 1 === 0
        ? paymentRequest.amount.toString()
        : paymentRequest.amount.toFixed(2);

      const hash = this.generatePaymentHash({
        key: this.merchantKey,
        txnid,
        amount: amountStr,
        productinfo: paymentRequest.productInfo,
        firstname: paymentRequest.firstName,
        email: paymentRequest.email,
      });

      // Create payment record in database
      await prisma.payment.create({
        data: {
          orderId: paymentRequest.orderId,
          transactionId: txnid,
          amount: paymentRequest.amount,
          status: 'PENDING',
          paymentMethod: 'PAYU',
          paymentGateway: 'PayU',
        },
      });

      console.log('✅ [PayU] Payment initiated with transaction ID:', txnid);

      // Return payment request data
      return {
        txnid,
        amount: paymentRequest.amount,
        productinfo: paymentRequest.productInfo,
        firstname: paymentRequest.firstName,
        email: paymentRequest.email,
        phone: paymentRequest.phone,
        hash,
        key: this.merchantKey,
        surl: this.successUrl,
        furl: this.failureUrl,
        service_provider: 'payu_paisa',
        address1: paymentRequest.address,
        city: paymentRequest.city,
        state: paymentRequest.state,
        zipcode: paymentRequest.zipcode,
        country: paymentRequest.country || 'India',
      };
    } catch (error) {
      console.error('❌ [PayU] Error initiating payment:', error);
      throw new Error('Failed to initiate payment');
    }
  }

  /**
   * Verify and process payment callback
   */
  async processPaymentCallback(callbackData: any): Promise<{
    success: boolean;
    orderId?: string;
    transactionId?: string;
    message: string;
  }> {
    try {
      console.log('📥 [PayU] Processing payment callback');
      console.log('📥 [PayU] Callback data:', callbackData);

      const {
        status,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        hash,
        mihpayid,
        error_Message,
      } = callbackData;

      // Verify hash
      const isHashValid = this.verifyResponseHash({
        status,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        receivedHash: hash,
      });

      if (!isHashValid) {
        console.error('❌ [PayU] Invalid hash in callback');
        return {
          success: false,
          message: 'Invalid payment response',
        };
      }

      // Find payment record
      const payment = await prisma.payment.findFirst({
        where: { transactionId: txnid },
        include: { order: true },
      });

      if (!payment) {
        console.error('❌ [PayU] Payment record not found:', txnid);
        return {
          success: false,
          message: 'Payment record not found',
        };
      }

      // Process based on payment status
      if (status === 'success') {
        console.log('✅ [PayU] Payment successful');

        // Update payment record
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: 'PAID',
            gatewayTransactionId: mihpayid,
            gatewayResponse: callbackData,
            completedAt: new Date(),
          },
        });

        // Update order status
        await prisma.order.update({
          where: { id: payment.orderId },
          data: {
            paymentStatus: 'PAID',
            status: 'RECEIVED',
          },
        });

        console.log('✅ [PayU] Order updated to RECEIVED status');

        // Send emails after successful payment
        try {
          // Get complete order details for email
          const completeOrder = await prisma.order.findUnique({
            where: { id: payment.orderId },
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

          if (completeOrder && completeOrder.user) {
            console.log('📧 [PayU] Sending payment confirmation emails');

            // Import emailService dynamically to avoid circular dependency
            const emailService = (await import('./emailService')).default;

            // Send order confirmation email
            await emailService.sendOrderConfirmation(completeOrder.user.email, {
              id: completeOrder.id,
              total: completeOrder.total,
              deliverySlot: completeOrder.deliverySlot,
            });

            // Send invoice with full details (products, GST, delivery fee, total)
            await emailService.sendInvoice(completeOrder.user.email, completeOrder as any);

            // Send admin notification
            await emailService.sendAdminOrderNotification(completeOrder as any);

            console.log('✅ [PayU] All emails sent successfully');
          }
        } catch (emailError) {
          console.error('❌ [PayU] Error sending emails:', emailError);
          // Don't fail the payment callback if emails fail
        }

        return {
          success: true,
          orderId: payment.orderId,
          transactionId: txnid,
          message: 'Payment successful',
        };
      } else if (status === 'failure') {
        console.log('❌ [PayU] Payment failed');

        // Get order with items to restore stock
        const orderWithItems = await prisma.order.findUnique({
          where: { id: payment.orderId },
          include: { items: true },
        });

        // Update payment record and order status in transaction
        await prisma.$transaction(async (tx) => {
          // Update payment record
          await tx.payment.update({
            where: { id: payment.id },
            data: {
              status: 'FAILED',
              gatewayResponse: callbackData,
              failureReason: error_Message || 'Payment failed',
            },
          });

          // Update order status to CANCELED
          await tx.order.update({
            where: { id: payment.orderId },
            data: {
              paymentStatus: 'FAILED',
              status: 'CANCELED',
            },
          });

          // Restore stock for each item
          if (orderWithItems) {
            console.log('📦 [PayU] Restoring stock for canceled order');
            for (const item of orderWithItems.items) {
              if (item.variantId) {
                await tx.productVariant.update({
                  where: { id: item.variantId },
                  data: { stock: { increment: item.quantity } },
                });
                console.log(`✅ [PayU] Restored ${item.quantity} units to variant ${item.variantId}`);
              } else {
                await tx.product.update({
                  where: { id: item.productId },
                  data: { stock: { increment: item.quantity } },
                });
                console.log(`✅ [PayU] Restored ${item.quantity} units to product ${item.productId}`);
              }
            }
          }
        });

        console.log('✅ [PayU] Order canceled and stock restored');

        return {
          success: false,
          orderId: payment.orderId,
          transactionId: txnid,
          message: error_Message || 'Payment failed',
        };
      } else {
        // Pending or other status
        console.log('⏳ [PayU] Payment pending');

        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: 'PENDING',
            gatewayResponse: callbackData,
          },
        });

        return {
          success: false,
          orderId: payment.orderId,
          transactionId: txnid,
          message: 'Payment is pending',
        };
      }
    } catch (error) {
      console.error('❌ [PayU] Error processing callback:', error);
      throw error;
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(transactionId: string): Promise<any> {
    try {
      const payment = await prisma.payment.findFirst({
        where: { transactionId },
        include: { order: true },
      });

      if (!payment) {
        throw new Error('Payment not found');
      }

      return {
        transactionId: payment.transactionId,
        orderId: payment.orderId,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
        gatewayTransactionId: payment.gatewayTransactionId,
        createdAt: payment.createdAt,
        completedAt: payment.completedAt,
      };
    } catch (error) {
      console.error('❌ [PayU] Error getting payment status:', error);
      throw error;
    }
  }
}

export default new PayUService();
