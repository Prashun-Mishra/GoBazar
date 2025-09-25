import { Router } from 'express';
import recommendationController from '@/controllers/recommendationController';
import { validateQuery } from '@/middleware/validation';
import { authenticateToken, optionalAuth } from '@/middleware/auth';
import { ValidationSchemas } from '@/utils/validation';

const router = Router();

// Public routes with optional authentication
router.get('/', optionalAuth, validateQuery(ValidationSchemas.recommendationQuery), recommendationController.getRecommendations);
router.get('/homepage', optionalAuth, recommendationController.getHomepageRecommendations);
router.get('/trending', recommendationController.getTrendingProducts);
router.get('/popular', recommendationController.getPopularProducts);
router.get('/products/:productId/similar', recommendationController.getSimilarProducts);
router.get('/products/:productId/frequently-bought', recommendationController.getFrequentlyBoughtTogether);

// Protected routes
router.get('/personalized', authenticateToken, recommendationController.getPersonalizedRecommendations);
router.get('/recently-viewed', authenticateToken, recommendationController.getRecentlyViewed);
router.post('/track-behavior', authenticateToken, recommendationController.trackBehavior);

export default router;
