import { Router } from 'express';
import orderController from '@/controllers/orderController';
import { validateBody } from '@/middleware/validation';
import { authenticateToken, requireAdmin } from '@/middleware/auth';
import { ValidationSchemas } from '@/utils/validation';

const router = Router();

// User routes (require authentication)
router.post('/', authenticateToken, validateBody(ValidationSchemas.createOrder), orderController.createOrder);
router.get('/', authenticateToken, orderController.getOrders);
router.get('/:orderId', authenticateToken, orderController.getOrderById);
router.put('/:orderId/cancel', authenticateToken, orderController.cancelOrder);

// Order tracking routes
router.get('/:orderId/timeline', authenticateToken, orderController.getOrderTimeline);
router.get('/track/:orderId', orderController.trackOrder);

// Admin routes (require authentication + admin role)
router.get('/admin/all', authenticateToken, requireAdmin, orderController.getAllOrders);
router.get('/admin/:orderId', authenticateToken, requireAdmin, orderController.getOrderByIdAdmin);
router.put('/admin/:orderId/status', authenticateToken, requireAdmin, orderController.updateOrderStatus);
router.get('/admin/stats/overview', authenticateToken, requireAdmin, orderController.getOrderStats);

// Admin order tracking routes
router.put('/admin/:orderId/delivery-partner', authenticateToken, requireAdmin, orderController.updateDeliveryPartner);
router.put('/admin/:orderId/location', authenticateToken, requireAdmin, orderController.updateOrderLocation);

export default router;
