import prisma from '@/config/database';
import { ProductWithRelations, RecommendationQuery } from '@/types';

class RecommendationService {
  async getRecommendations(query: RecommendationQuery): Promise<ProductWithRelations[]> {
    const { type, limit = 6, productId, categoryId, userId } = query;

    switch (type) {
      case 'trending':
        return this.getTrendingProducts(limit);
      
      case 'popular':
        return this.getPopularProducts(limit, categoryId);
      
      case 'recently-viewed':
        return this.getRecentlyViewedProducts(userId, limit);
      
      case 'similar':
        return this.getSimilarProducts(productId, limit);
      
      case 'frequently-bought':
        return this.getFrequentlyBoughtTogether(productId, limit);
      
      case 'personalized':
        return this.getPersonalizedRecommendations(userId, limit);
      
      default:
        return this.getPopularProducts(limit);
    }
  }

  private async getTrendingProducts(limit: number): Promise<ProductWithRelations[]> {
    // Products with high recent activity (simulated by rating and recent updates)
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        rating: { gte: 4.0 },
      },
      include: {
        category: true,
        subcategory: true,
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
      },
      orderBy: [
        { updatedAt: 'desc' },
        { rating: 'desc' },
      ],
      take: limit,
    });

    return products as ProductWithRelations[];
  }

  private async getPopularProducts(limit: number, categoryId?: string): Promise<ProductWithRelations[]> {
    const where: any = { isActive: true };
    
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        subcategory: true,
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
      },
      orderBy: [
        { reviewCount: 'desc' },
        { rating: 'desc' },
      ],
      take: limit,
    });

    return products as ProductWithRelations[];
  }

  private async getRecentlyViewedProducts(userId?: string, limit: number = 6): Promise<ProductWithRelations[]> {
    if (!userId) {
      return this.getPopularProducts(limit);
    }

    // In a real implementation, you'd track user views in a separate table
    // For now, we'll return popular products as fallback
    return this.getPopularProducts(limit);
  }

  private async getSimilarProducts(productId?: string, limit: number = 6): Promise<ProductWithRelations[]> {
    if (!productId) {
      return [];
    }

    const baseProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!baseProduct) {
      return [];
    }

    const priceRange = Number(baseProduct.price) * 0.3; // 30% price tolerance

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        NOT: { id: productId },
        OR: [
          { categoryId: baseProduct.categoryId },
          { brand: baseProduct.brand },
          {
            price: {
              gte: Number(baseProduct.price) - priceRange,
              lte: Number(baseProduct.price) + priceRange,
            },
          },
        ],
      },
      include: {
        category: true,
        subcategory: true,
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
      },
      orderBy: {
        rating: 'desc',
      },
      take: limit,
    });

    return products as ProductWithRelations[];
  }

  private async getFrequentlyBoughtTogether(productId?: string, limit: number = 6): Promise<ProductWithRelations[]> {
    if (!productId) {
      return [];
    }

    const baseProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!baseProduct) {
      return [];
    }

    // Define complementary categories (this would be more sophisticated in a real app)
    const complementaryCategories: Record<string, string[]> = {
      // You can customize these based on your category IDs
    };

    const complementary = complementaryCategories[baseProduct.categoryId] || [];

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        NOT: { id: productId },
        OR: [
          { categoryId: { in: complementary } },
          { categoryId: baseProduct.categoryId },
        ],
      },
      include: {
        category: true,
        subcategory: true,
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
      },
      orderBy: {
        rating: 'desc',
      },
      take: limit,
    });

    return products as ProductWithRelations[];
  }

  private async getPersonalizedRecommendations(userId?: string, limit: number = 6): Promise<ProductWithRelations[]> {
    if (!userId) {
      return this.getPopularProducts(limit);
    }

    // Get user's order history to understand preferences
    const userOrders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10, // Last 10 orders
    });

    if (userOrders.length === 0) {
      return this.getPopularProducts(limit);
    }

    // Extract categories and brands from user's purchase history
    const purchasedCategories = new Set<string>();
    const purchasedBrands = new Set<string>();
    const purchasedProductIds = new Set<string>();

    userOrders.forEach(order => {
      order.items.forEach(item => {
        purchasedCategories.add(item.product.categoryId);
        purchasedBrands.add(item.product.brand);
        purchasedProductIds.add(item.product.id);
      });
    });

    // Get recommendations based on user's preferences
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        NOT: { id: { in: Array.from(purchasedProductIds) } }, // Exclude already purchased
        OR: [
          { categoryId: { in: Array.from(purchasedCategories) } },
          { brand: { in: Array.from(purchasedBrands) } },
        ],
      },
      include: {
        category: true,
        subcategory: true,
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
      },
      orderBy: {
        rating: 'desc',
      },
      take: limit,
    });

    // If not enough personalized products, fill with popular ones
    if (products.length < limit) {
      const additionalProducts = await this.getPopularProducts(limit - products.length);
      products.push(...additionalProducts.filter(p => !products.some(existing => existing.id === p.id)));
    }

    return products.slice(0, limit) as ProductWithRelations[];
  }

  // Method to track user behavior (for future implementation)
  async trackUserBehavior(userId: string, productId: string, action: 'view' | 'purchase' | 'cart_add'): Promise<void> {
    // In a real implementation, you'd store this in a user_behavior table
    // For now, this is a placeholder for future enhancement
    console.log(`User ${userId} performed ${action} on product ${productId}`);
  }

  // Method to get product recommendations for homepage
  async getHomepageRecommendations(userId?: string): Promise<{
    trending: ProductWithRelations[];
    popular: ProductWithRelations[];
    personalized?: ProductWithRelations[];
  }> {
    const [trending, popular, personalized] = await Promise.all([
      this.getTrendingProducts(8),
      this.getPopularProducts(8),
      userId ? this.getPersonalizedRecommendations(userId, 8) : Promise.resolve([]),
    ]);

    const result: any = { trending, popular };
    
    if (userId && personalized.length > 0) {
      result.personalized = personalized;
    }

    return result;
  }
}

export default new RecommendationService();
