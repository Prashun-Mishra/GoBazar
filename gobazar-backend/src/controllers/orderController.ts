import { Request, Response } from 'express';
import { ResponseUtil } from '@/utils/response';
import { asyncHandler } from '@/middleware/errorHandler';
import orderService from '@/services/orderService';
import { AuthenticatedRequest } from '@/types';

class OrderController {
  createOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const orderData = req.body;

    const result = await orderService.createOrder(userId, orderData);

    if (result.success) {
      return ResponseUtil.success(res, result.order, result.message, 201);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  getOrders = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await orderService.getOrders(userId, page, limit);

    return ResponseUtil.paginated(
      res,
      result.orders,
      result.page,
      result.limit,
      result.total,
      'Orders retrieved successfully'
    );
  });

  getOrderById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const { orderId } = req.params;

    const order = await orderService.getOrderById(orderId, userId);

    if (!order) {
      return ResponseUtil.notFound(res, 'Order not found');
    }

    return ResponseUtil.success(res, order, 'Order retrieved successfully');
  });

  cancelOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const { orderId } = req.params;

    const result = await orderService.cancelOrder(orderId, userId);

    if (result.success) {
      return ResponseUtil.success(res, null, result.message);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  // Admin endpoints
  getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;

    const result = await orderService.getAllOrders(page, limit, status);

    return ResponseUtil.paginated(
      res,
      result.orders,
      result.page,
      result.limit,
      result.total,
      'Orders retrieved successfully'
    );
  });

  getOrderByIdAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return ResponseUtil.notFound(res, 'Order not found');
    }

    return ResponseUtil.success(res, order, 'Order retrieved successfully');
  });

  updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['RECEIVED', 'PACKING', 'ON_THE_WAY', 'DELIVERED', 'CANCELED'].includes(status)) {
      return ResponseUtil.error(res, 'Invalid order status', 400);
    }

    const result = await orderService.updateOrderStatus(orderId, status);

    if (result.success) {
      return ResponseUtil.success(res, result.order, result.message);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  getOrderStats = asyncHandler(async (req: Request, res: Response) => {
    const stats = await orderService.getOrderStats();

    return ResponseUtil.success(res, stats, 'Order statistics retrieved successfully');
  });

  // Order tracking endpoints
  trackOrder = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { phone } = req.query;

    if (!phone) {
      return ResponseUtil.error(res, 'Phone number is required for tracking', 400);
    }

    const result = await orderService.trackOrderByPhone(orderId, phone as string);

    if (!result.success) {
      return ResponseUtil.error(res, result.message, 404);
    }

    return ResponseUtil.success(res, result.order, 'Order tracking information retrieved successfully');
  });

  getOrderTimeline = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { orderId } = req.params;
    const userId = req.user!.userId;

    const timeline = await orderService.getOrderTimeline(orderId, userId);

    if (!timeline) {
      return ResponseUtil.notFound(res, 'Order not found');
    }

    return ResponseUtil.success(res, timeline, 'Order timeline retrieved successfully');
  });

  updateDeliveryPartner = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { partnerName, partnerPhone, vehicleNumber } = req.body;

    const result = await orderService.updateDeliveryPartner(orderId, {
      partnerName,
      partnerPhone,
      vehicleNumber,
    });

    if (!result.success) {
      return ResponseUtil.error(res, result.message, 400);
    }

    return ResponseUtil.success(res, result.order, 'Delivery partner updated successfully');
  });

  updateOrderLocation = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { latitude, longitude, address } = req.body;

    const result = await orderService.updateOrderLocation(orderId, {
      latitude,
      longitude,
      address,
    });

    if (!result.success) {
      return ResponseUtil.error(res, result.message, 400);
    }

    return ResponseUtil.success(res, null, 'Order location updated successfully');
  });
}

export default new OrderController();
