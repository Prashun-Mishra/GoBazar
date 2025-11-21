import { Request, Response } from 'express';
import { ResponseUtil } from '@/utils/response';
import { asyncHandler } from '@/middleware/errorHandler';
import payuService from '@/services/payuService';
import orderService from '@/services/orderService';
import { AuthenticatedRequest } from '@/types';

class PaymentController {
  /**
   * Initiate PayU payment for an order
   */
  initiatePayment = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { orderId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return ResponseUtil.unauthorized(res, 'User not authenticated');
    }

    console.log('💳 [Payment Controller] Initiating payment for order:', orderId);

    // Get order details
    const order = await orderService.getOrderById(orderId, userId);

    if (!order) {
      return ResponseUtil.notFound(res, 'Order not found');
    }

    // Check if order already paid
    if (order.paymentStatus === 'PAID') {
      return ResponseUtil.error(res, 'Order already paid', 400);
    }

    // Prepare payment request
    const paymentRequest = {
      orderId: order.id,
      amount: Number(order.total),
      productInfo: `Order #${order.id}`,
      firstName: order.user.name || 'Customer',
      email: order.user.email,
      phone: order.user.phone,
      address: order.address.street,
      city: order.address.city,
      state: order.address.state,
      zipcode: order.address.pincode,
      country: 'India',
    };

    // Initiate payment
    const paymentData = await payuService.initiatePayment(paymentRequest);

    console.log('✅ [Payment Controller] Payment initiated successfully');

    return ResponseUtil.success(res, {
      paymentData,
      payuUrl: process.env.PAYU_API_URL || 'https://secure.payu.in/_payment',
    }, 'Payment initiated successfully');
  });

  /**
   * Handle PayU payment callback (success/failure)
   */
  handleCallback = asyncHandler(async (req: Request, res: Response) => {
    console.log('📥 [Payment Controller] Received payment callback');
    console.log('📥 [Payment Controller] Callback data:', req.body);

    const result = await payuService.processPaymentCallback(req.body);

    if (result.success) {
      // Redirect to success page with order details
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3001'}/payment/success?orderId=${result.orderId}&txnId=${result.transactionId}`);
    } else {
      // Redirect to failure page
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3001'}/payment/failure?orderId=${result.orderId}&message=${encodeURIComponent(result.message)}`);
    }
  });

  /**
   * Get payment status
   */
  getPaymentStatus = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { transactionId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return ResponseUtil.unauthorized(res, 'User not authenticated');
    }

    console.log('📊 [Payment Controller] Getting payment status:', transactionId);

    const payment = await payuService.getPaymentStatus(transactionId);

    return ResponseUtil.success(res, payment, 'Payment status retrieved successfully');
  });

  /**
   * Handle PayU webhook (for server-to-server notifications)
   */
  handleWebhook = asyncHandler(async (req: Request, res: Response) => {
    console.log('🔔 [Payment Webhook] Received webhook notification');
    console.log('🔔 [Payment Webhook] Webhook data:', req.body);

    try {
      const result = await payuService.processPaymentCallback(req.body);

      console.log('✅ [Payment Webhook] Webhook processed successfully');

      return ResponseUtil.success(res, { processed: true }, 'Webhook processed successfully');
    } catch (error) {
      console.error('❌ [Payment Webhook] Error processing webhook:', error);
      return ResponseUtil.error(res, 'Failed to process webhook', 500);
    }
  });
}

export default new PaymentController();
