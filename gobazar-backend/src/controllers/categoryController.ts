import { Request, Response } from 'express';
import { ResponseUtil } from '@/utils/response';
import { asyncHandler } from '@/middleware/errorHandler';
import categoryService from '@/services/categoryService';

class CategoryController {
  getCategories = asyncHandler(async (req: Request, res: Response) => {
    const includeProductCount = req.query.includeProductCount === 'true';
    
    let categories;
    if (includeProductCount) {
      categories = await categoryService.getCategoriesWithProductCount();
    } else {
      categories = await categoryService.getCategories();
    }
    
    return ResponseUtil.success(res, categories, 'Categories retrieved successfully');
  });

  getCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const category = await categoryService.getCategoryById(id);
    
    if (!category) {
      return ResponseUtil.notFound(res, 'Category not found');
    }
    
    return ResponseUtil.success(res, category, 'Category retrieved successfully');
  });

  getCategoryBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    
    const category = await categoryService.getCategoryBySlug(slug);
    
    if (!category) {
      return ResponseUtil.notFound(res, 'Category not found');
    }
    
    return ResponseUtil.success(res, category, 'Category retrieved successfully');
  });

  getSubcategories = asyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.query;
    const includeProductCount = req.query.includeProductCount === 'true';
    
    let subcategories;
    if (includeProductCount) {
      subcategories = await categoryService.getSubcategoriesWithProductCount(categoryId as string);
    } else {
      subcategories = await categoryService.getSubcategories(categoryId as string);
    }
    
    return ResponseUtil.success(res, subcategories, 'Subcategories retrieved successfully');
  });

  getSubcategoryById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const subcategory = await categoryService.getSubcategoryById(id);
    
    if (!subcategory) {
      return ResponseUtil.notFound(res, 'Subcategory not found');
    }
    
    return ResponseUtil.success(res, subcategory, 'Subcategory retrieved successfully');
  });

  getSubcategoryBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    
    const subcategory = await categoryService.getSubcategoryBySlug(slug);
    
    if (!subcategory) {
      return ResponseUtil.notFound(res, 'Subcategory not found');
    }
    
    return ResponseUtil.success(res, subcategory, 'Subcategory retrieved successfully');
  });

  // Admin endpoints (for future use)
  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const { name, slug, image, order } = req.body;
    
    const category = await categoryService.createCategory({
      name,
      slug,
      image,
      order,
    });
    
    return ResponseUtil.success(res, category, 'Category created successfully', 201);
  });

  updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    
    const category = await categoryService.updateCategory(id, updateData);
    
    if (!category) {
      return ResponseUtil.notFound(res, 'Category not found');
    }
    
    return ResponseUtil.success(res, category, 'Category updated successfully');
  });

  deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const success = await categoryService.deleteCategory(id);
    
    if (!success) {
      return ResponseUtil.notFound(res, 'Category not found');
    }
    
    return ResponseUtil.success(res, null, 'Category deleted successfully');
  });

  createSubcategory = asyncHandler(async (req: Request, res: Response) => {
    const { name, slug, categoryId, description, order } = req.body;
    
    const subcategory = await categoryService.createSubcategory({
      name,
      slug,
      categoryId,
      description,
      order,
    });
    
    return ResponseUtil.success(res, subcategory, 'Subcategory created successfully', 201);
  });

  updateSubcategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    
    const subcategory = await categoryService.updateSubcategory(id, updateData);
    
    if (!subcategory) {
      return ResponseUtil.notFound(res, 'Subcategory not found');
    }
    
    return ResponseUtil.success(res, subcategory, 'Subcategory updated successfully');
  });

  deleteSubcategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const success = await categoryService.deleteSubcategory(id);
    
    if (!success) {
      return ResponseUtil.notFound(res, 'Subcategory not found');
    }
    
    return ResponseUtil.success(res, null, 'Subcategory deleted successfully');
  });
}

export default new CategoryController();
