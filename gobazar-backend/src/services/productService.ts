import prisma from '@/config/database';
import { withRetry } from '@/utils/retry';
import { ProductQuery, ProductWithRelations } from '@/types';

class ProductService {
  async getProducts(query: ProductQuery): Promise<{
    products: ProductWithRelations[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      page = 1,
      limit = 50,
      category,
      subcategory,
      search,
      minPrice,
      maxPrice,
      brand,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      isActive: true,
    };

    if (category) {
      where.categoryId = category;
    }

    if (subcategory) {
      where.subcategoryId = subcategory;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (brand) {
      where.brand = { contains: brand, mode: 'insensitive' };
    }

    // Build orderBy clause
    const orderBy: any = {};
    if (sortBy === 'popularity') {
      orderBy['rating'] = 'desc'; // Map popularity to rating
    } else {
      orderBy[sortBy] = sortOrder;
    }

    console.log('🔍 [ProductService] getProducts where:', JSON.stringify(where));

    // Get products with relations
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          subcategory: true,
          variants: {
            where: { isActive: true },
            orderBy: { price: 'asc' },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products: products as ProductWithRelations[],
      total,
      page,
      limit,
    };
  }

  async getProductById(id: string): Promise<ProductWithRelations | null> {
    const product = await prisma.product.findFirst({
      where: {
        id,
        isActive: true,
      },
      include: {
        category: true,
        subcategory: true,
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
      },
    });

    return product as ProductWithRelations | null;
  }

  async getBulkProducts(productIds: string[]): Promise<ProductWithRelations[]> {
    console.log('🛒 [Product Service] Fetching bulk products:', productIds.length);

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
      },
      include: {
        category: true,
        subcategory: true,
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
      },
    });

    console.log('✅ [Product Service] Found products:', products.length);
    return products as ProductWithRelations[];
  }

  async getProductsByCategory(categoryId: string, limit: number = 50): Promise<ProductWithRelations[]> {
    const products = await prisma.product.findMany({
      where: {
        categoryId,
        isActive: true,
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

  async getProductsBySubcategory(subcategoryId: string, limit: number = 50): Promise<ProductWithRelations[]> {
    const products = await prisma.product.findMany({
      where: {
        subcategoryId,
        isActive: true,
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

  async getFeaturedProducts(limit: number = 10): Promise<ProductWithRelations[]> {
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
        { rating: 'desc' },
        { reviewCount: 'desc' },
      ],
      take: limit,
    });

    return products as ProductWithRelations[];
  }

  async getPopularProducts(limit: number = 10): Promise<ProductWithRelations[]> {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
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
        { reviewCount: 'desc' },
        { rating: 'desc' },
      ],
      take: limit,
    });

    return products as ProductWithRelations[];
  }

  async getTrendingProducts(limit: number = 10): Promise<ProductWithRelations[]> {
    // For trending, we'll use products with high ratings and recent activity
    // In a real scenario, you'd track views, purchases, etc.
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

  async getSimilarProducts(productId: string, limit: number = 6): Promise<ProductWithRelations[]> {
    // First get the base product
    const baseProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!baseProduct) {
      return [];
    }

    // Find similar products based on category, brand, and price range
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

  async searchProducts(searchTerm: string, limit: number = 50): Promise<ProductWithRelations[]> {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { brand: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { tags: { has: searchTerm } },
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

  async updateProductStock(productId: string, variantId: string | null, quantity: number): Promise<boolean> {
    try {
      if (variantId) {
        await prisma.productVariant.update({
          where: { id: variantId },
          data: { stock: { decrement: quantity } },
        });
      } else {
        await prisma.product.update({
          where: { id: productId },
          data: { stock: { decrement: quantity } },
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating stock:', error);
      return false;
    }
  }

  async checkProductAvailability(productId: string, variantId: string | null, quantity: number): Promise<boolean> {
    try {
      if (variantId) {
        const variant = await prisma.productVariant.findUnique({
          where: { id: variantId },
        });
        return variant ? variant.stock >= quantity : false;
      } else {
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });
        return product ? product.stock >= quantity : false;
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  }
  private homePageCache: {
    data: Record<string, ProductWithRelations[]> | null;
    timestamp: number;
  } = { data: null, timestamp: 0 };

  // ... (inside class, existing imports remain)

  async getHomePageProducts(): Promise<Record<string, ProductWithRelations[]>> {
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
    const now = Date.now();

    if (this.homePageCache.data && (now - this.homePageCache.timestamp < CACHE_TTL)) {
      console.log('⚡ [Product Service] Serving homepage products from cache');
      return this.homePageCache.data;
    }

    console.log('🔄 [Product Service] Fetching homepage products from DB');

    const categories = [
      { slug: 'vegetables-fruits', limit: 12 },
      { slug: 'dairy-eggs', limit: 12 },
      { slug: 'munchies', limit: 12 },
      { slug: 'cold-drinks-juices', limit: 12 },
      { slug: 'bakery-biscuits', limit: 12 },
      { slug: 'chicken-meat-fish', limit: 12 },
    ];

    const results = [];
    for (const cat of categories) {
      // Wrap DB call with retry
      const products = await withRetry(async () => {
        return prisma.product.findMany({
          where: {
            category: { slug: cat.slug },
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            price: true,
            mrp: true,
            discountPercent: true,
            images: true,
            unit: true,
            rating: true,
            reviewCount: true,
            stock: true,
            categoryId: true,
            subcategoryId: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            brand: true,
            description: true,
            highlights: true,
            tags: true,
            nutritionalInfo: true,
            ingredients: true,
            benefits: true,
            // Relations needed for frontend type compatibility
            category: true,
            subcategory: true,
            variants: {
              where: { isActive: true },
              orderBy: { price: 'asc' },
              take: 1
            }
          },
          orderBy: { rating: 'desc' },
          take: cat.limit,
        });
      }, 3, 1000); // 3 retries, start with 1000ms delay

      results.push({ slug: cat.slug, products });
    }

    const response: Record<string, ProductWithRelations[]> = {};
    results.forEach(result => {
      response[result.slug] = result.products as unknown as ProductWithRelations[];
    });

    this.homePageCache = {
      data: response,
      timestamp: now
    };

    return response;
  }
}

export default new ProductService();
