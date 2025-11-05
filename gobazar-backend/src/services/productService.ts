import prisma from '@/config/database';
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
      limit = 20,
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
    orderBy[sortBy] = sortOrder;

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

  async getProductsByCategory(categoryId: string, limit: number = 20): Promise<ProductWithRelations[]> {
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

  async getProductsBySubcategory(subcategoryId: string, limit: number = 20): Promise<ProductWithRelations[]> {
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

  async searchProducts(searchTerm: string, limit: number = 20): Promise<ProductWithRelations[]> {
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
}

export default new ProductService();
