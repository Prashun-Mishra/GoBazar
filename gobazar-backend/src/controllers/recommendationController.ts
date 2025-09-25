import { Request, Response } from 'express';
import { ResponseUtil } from '@/utils/response';
import { asyncHandler } from '@/middleware/errorHandler';
import recommendationService from '@/services/recommendationService';
import { RecommendationQuery, AuthenticatedRequest } from '@/types';

class RecommendationController {
  getRecommendations = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query as unknown as RecommendationQuery;
    
    // Validate required type parameter
    if (!query.type) {
      return ResponseUtil.error(res, 'Recommendation type is required', 400);
    }

    const recommendations = await recommendationService.getRecommendations(query);
    
    return ResponseUtil.success(res, recommendations, 'Recommendations retrieved successfully');
  });

  getHomepageRecommendations = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    
    const recommendations = await recommendationService.getHomepageRecommendations(userId);
    
    return ResponseUtil.success(res, recommendations, 'Homepage recommendations retrieved successfully');
  });

  trackBehavior = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    const { productId, action } = req.body;
    
    if (!userId) {
      return ResponseUtil.unauthorized(res, 'Authentication required');
    }

    if (!productId || !action) {
      return ResponseUtil.error(res, 'Product ID and action are required', 400);
    }

    if (!['view', 'purchase', 'cart_add'].includes(action)) {
      return ResponseUtil.error(res, 'Invalid action type', 400);
    }

    await recommendationService.trackUserBehavior(userId, productId, action);
    
    return ResponseUtil.success(res, null, 'Behavior tracked successfully');
  });

  // Specific recommendation endpoints for better frontend integration
  getTrendingProducts = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 6;
    
    const recommendations = await recommendationService.getRecommendations({
      type: 'trending',
      limit,
    });
    
    return ResponseUtil.success(res, recommendations, 'Trending products retrieved successfully');
  });

  getPopularProducts = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 6;
    const categoryId = req.query.categoryId as string;
    
    const recommendations = await recommendationService.getRecommendations({
      type: 'popular',
      limit,
      categoryId,
    });
    
    return ResponseUtil.success(res, recommendations, 'Popular products retrieved successfully');
  });

  getSimilarProducts = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const limit = parseInt(req.query.limit as string) || 6;
    
    const recommendations = await recommendationService.getRecommendations({
      type: 'similar',
      limit,
      productId,
    });
    
    return ResponseUtil.success(res, recommendations, 'Similar products retrieved successfully');
  });

  getFrequentlyBoughtTogether = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const limit = parseInt(req.query.limit as string) || 6;
    
    const recommendations = await recommendationService.getRecommendations({
      type: 'frequently-bought',
      limit,
      productId,
    });
    
    return ResponseUtil.success(res, recommendations, 'Frequently bought together products retrieved successfully');
  });

  getPersonalizedRecommendations = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    const limit = parseInt(req.query.limit as string) || 6;
    
    if (!userId) {
      return ResponseUtil.unauthorized(res, 'Authentication required for personalized recommendations');
    }
    
    const recommendations = await recommendationService.getRecommendations({
      type: 'personalized',
      limit,
      userId,
    });
    
    return ResponseUtil.success(res, recommendations, 'Personalized recommendations retrieved successfully');
  });

  getRecentlyViewed = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    const limit = parseInt(req.query.limit as string) || 6;
    
    const recommendations = await recommendationService.getRecommendations({
      type: 'recently-viewed',
      limit,
      userId,
    });
    
    return ResponseUtil.success(res, recommendations, 'Recently viewed products retrieved successfully');
  });
}

export default new RecommendationController();
