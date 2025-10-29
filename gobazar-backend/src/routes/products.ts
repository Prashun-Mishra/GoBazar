import { Router } from 'express';
import productController from '@/controllers/productController';
import { validateQuery } from '@/middleware/validation';
import { optionalAuth } from '@/middleware/auth';
import { ValidationSchemas } from '@/utils/validation';

const router = Router();

// Public routes
router.get('/', validateQuery(ValidationSchemas.productQuery), productController.getProducts);
router.post('/bulk', productController.getBulkProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/popular', productController.getPopularProducts);
router.get('/trending', productController.getTrendingProducts);
router.get('/search', productController.searchProducts);
router.get('/category/:categoryId', productController.getProductsByCategory);
router.get('/subcategory/:subcategoryId', productController.getProductsBySubcategory);
router.get('/:id', productController.getProductById);
router.get('/:id/similar', productController.getSimilarProducts);
router.get('/:productId/availability', productController.checkAvailability);

export default router;
