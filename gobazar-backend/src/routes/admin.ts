import express from 'express';
import { authenticateToken, requireAdmin } from '@/middleware/auth';
import adminProductController from '@/controllers/adminProductController';
import { validateBody } from '@/middleware/validation';
import { ValidationSchemas } from '@/utils/validation';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Product Management
router.post('/products', validateBody(ValidationSchemas.createProduct), adminProductController.createProduct);
router.get('/products', adminProductController.getAllProducts);
router.put('/products/:id', validateBody(ValidationSchemas.updateProduct), adminProductController.updateProduct);
router.delete('/products/:id', adminProductController.deleteProduct);
router.patch('/products/:id/stock', validateBody(ValidationSchemas.updateStock), adminProductController.updateStock);
router.post('/products/bulk-update', adminProductController.bulkUpdate);
router.get('/products/low-stock', adminProductController.getLowStockProducts);

export default router;
