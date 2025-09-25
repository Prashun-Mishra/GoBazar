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

// Admin routes
router.get('/admin/all', requireAdmin, orderController.getAllOrders);
router.get('/admin/:orderId', requireAdmin, orderController.getOrderByIdAdmin);
router.put('/admin/:orderId/status', requireAdmin, orderController.updateOrderStatus);
router.get('/admin/stats/overview', requireAdmin, orderController.getOrderStats);

export default router;
