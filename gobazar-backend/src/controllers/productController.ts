import { Request, Response } from 'express';
import { ResponseUtil } from '@/utils/response';
import { asyncHandler } from '@/middleware/errorHandler';
import productService from '@/services/productService';
import { ProductQuery } from '@/types';

class ProductController {
  getProducts = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query as unknown as ProductQuery;
    console.log('🔍 [ProductController] getProducts query:', JSON.stringify(query));

    const result = await productService.getProducts(query);

    return ResponseUtil.paginated(
      res,
      result.products,
      result.page,
      result.limit,
      result.total,
      'Products retrieved successfully'
    );
  });

  getBulkProducts = asyncHandler(async (req: Request, res: Response) => {
    const { productIds } = req.body;

    console.log('🛒 [Product Controller] Bulk fetch request:', productIds?.length || 0, 'products');

    if (!productIds || !Array.isArray(productIds)) {
      return ResponseUtil.error(res, 'Product IDs array is required', 400);
    }

    const products = await productService.getBulkProducts(productIds);

    console.log('✅ [Product Controller] Bulk fetch result:', products.length, 'products found');

    return ResponseUtil.success(res, products, 'Products retrieved successfully');
  });

  getProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    if (!product) {
      return ResponseUtil.notFound(res, 'Product not found');
    }

    return ResponseUtil.success(res, product, 'Product retrieved successfully');
  });

  getProductsByCategory = asyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const limit = parseInt(req.query.limit as string) || 20;

    const products = await productService.getProductsByCategory(categoryId, limit);

    return ResponseUtil.success(res, products, 'Products retrieved successfully');
  });

  getProductsBySubcategory = asyncHandler(async (req: Request, res: Response) => {
    const { subcategoryId } = req.params;
    const limit = parseInt(req.query.limit as string) || 20;

    const products = await productService.getProductsBySubcategory(subcategoryId, limit);

    return ResponseUtil.success(res, products, 'Products retrieved successfully');
  });

  getFeaturedProducts = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;

    const products = await productService.getFeaturedProducts(limit);

    return ResponseUtil.success(res, products, 'Featured products retrieved successfully');
  });

  getPopularProducts = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;

    const products = await productService.getPopularProducts(limit);

    return ResponseUtil.success(res, products, 'Popular products retrieved successfully');
  });

  getTrendingProducts = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;

    const products = await productService.getTrendingProducts(limit);

    return ResponseUtil.success(res, products, 'Trending products retrieved successfully');
  });

  getSimilarProducts = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const limit = parseInt(req.query.limit as string) || 6;

    const products = await productService.getSimilarProducts(productId, limit);

    return ResponseUtil.success(res, products, 'Similar products retrieved successfully');
  });

  searchProducts = asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;
    const limit = parseInt(req.query.limit as string) || 20;

    if (!q || typeof q !== 'string') {
      return ResponseUtil.error(res, 'Search query is required', 400);
    }

    const products = await productService.searchProducts(q, limit);

    return ResponseUtil.success(res, products, 'Search results retrieved successfully');
  });

  checkAvailability = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { variantId, quantity } = req.query;

    const qty = parseInt(quantity as string) || 1;
    const isAvailable = await productService.checkProductAvailability(
      productId,
      variantId as string || null,
      qty
    );

    return ResponseUtil.success(res, {
      available: isAvailable,
      productId,
      variantId: variantId || null,
      quantity: qty
    }, isAvailable ? 'Product is available' : 'Product is out of stock');
  });
  getHomePageProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await productService.getHomePageProducts();
    return ResponseUtil.success(res, products, 'Homepage products retrieved successfully');
  });
}

export default new ProductController();
