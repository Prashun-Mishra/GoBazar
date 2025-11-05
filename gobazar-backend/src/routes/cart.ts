import { Router } from 'express';
import cartController from '@/controllers/cartController';
import { validateBody } from '@/middleware/validation';
import { authenticateToken } from '@/middleware/auth';
import { ValidationSchemas } from '@/utils/validation';

const router = Router();

// All cart routes require authentication
router.use(authenticateToken);

router.get('/', cartController.getCart);
router.get('/summary', cartController.getCartSummary);
router.post('/add', validateBody(ValidationSchemas.addToCart), cartController.addToCart);
router.post('/sync', cartController.syncCart);
router.put('/:cartItemId', validateBody(ValidationSchemas.updateCart), cartController.updateCartItem);
router.delete('/:cartItemId', cartController.removeFromCart);
router.delete('/', cartController.clearCart);
router.get('/validate', cartController.validateCart);

export default router;
