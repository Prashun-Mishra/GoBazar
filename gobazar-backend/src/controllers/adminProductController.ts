import { Request, Response } from 'express';
import { ResponseUtil } from '@/utils/response';
import { asyncHandler } from '@/middleware/errorHandler';
import { AuthenticatedRequest } from '@/types';
import prisma from '@/config/database';

class AdminProductController {
  // Create new product
  createProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {
      name,
      description,
      brand,
      categoryId,
      subcategoryId,
      price,
      mrp,
      discount,
      stock,
      unit,
      images,
      tags,
      isFeatured,
      isOrganic,
      variants,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description: description || '',
        brand,
        categoryId,
        subcategoryId: subcategoryId || null,
        price: parseFloat(price),
        mrp: parseFloat(mrp),
        discountPercent: parseInt(discount || 0),
        stock: parseInt(stock),
        unit,
        images: images || [],
        tags: tags || [],
        highlights: [],
        rating: 0,
        reviewCount: 0,
      },
      include: {
        category: true,
        subcategory: true,
      },
    });

    // Create variants if provided
    if (variants && variants.length > 0) {
      await prisma.productVariant.createMany({
        data: variants.map((variant: any) => ({
          productId: product.id,
          name: variant.name,
          unit: variant.unit || unit,
          price: parseFloat(variant.price),
          mrp: parseFloat(variant.mrp || variant.price),
          stock: parseInt(variant.stock),
          size: variant.size || null,
          weight: variant.weight || null,
        })),
      });
    }

    return ResponseUtil.success(res, product, 'Product created successfully', 201);
  });

  // Update product
  updateProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    // Convert numeric fields
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.mrp) updateData.mrp = parseFloat(updateData.mrp);
    if (updateData.discount) updateData.discount = parseFloat(updateData.discount);
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        subcategory: true,
        variants: true,
      },
    });

    return ResponseUtil.success(res, product, 'Product updated successfully');
  });

  // Delete product
  deleteProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    // Delete variants first
    await prisma.productVariant.deleteMany({
      where: { productId: id },
    });

    // Delete product
    await prisma.product.delete({
      where: { id },
    });

    return ResponseUtil.success(res, null, 'Product deleted successfully');
  });

  // Get all products with pagination (admin view)
  getAllProducts = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 2000;
    console.log(`🔍 [AdminProductController] getAllProducts - Page: ${page}, Limit: ${limit}, Query Limit: ${req.query.limit}`);
    const search = req.query.search as string;
    const categoryId = req.query.categoryId as string;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          subcategory: true,
          variants: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return ResponseUtil.paginated(res, products, page, limit, total, 'Products retrieved successfully');
  });

  // Update stock
  updateStock = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { stock, variantId } = req.body;

    if (variantId) {
      // Update variant stock
      await prisma.productVariant.update({
        where: { id: variantId },
        data: { stock: parseInt(stock) },
      });
    } else {
      // Update product stock
      await prisma.product.update({
        where: { id },
        data: { stock: parseInt(stock) },
      });
    }

    return ResponseUtil.success(res, null, 'Stock updated successfully');
  });

  // Bulk update products
  bulkUpdate = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { products } = req.body;

    const updates = products.map((product: any) =>
      prisma.product.update({
        where: { id: product.id },
        data: product.data,
      })
    );

    await Promise.all(updates);

    return ResponseUtil.success(res, null, 'Bulk update completed successfully');
  });

  // Get low stock products
  getLowStockProducts = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const threshold = parseInt(req.query.threshold as string) || 10;

    const products = await prisma.product.findMany({
      where: {
        stock: {
          lte: threshold,
        },
      },
      include: {
        category: true,
        subcategory: true,
      },
      orderBy: { stock: 'asc' },
    });

    return ResponseUtil.success(res, products, 'Low stock products retrieved successfully');
  });
}

export default new AdminProductController();
