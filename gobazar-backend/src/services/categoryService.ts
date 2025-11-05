import prisma from '@/config/database';
import { Category, SubCategory } from '@/types';

class CategoryService {
  async getCategories(): Promise<(Category & { subcategories: SubCategory[] })[]> {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        subcategories: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    return categories;
  }

  async getCategoryById(id: string): Promise<(Category & { subcategories: SubCategory[] }) | null> {
    const category = await prisma.category.findFirst({
      where: {
        id,
        isActive: true,
      },
      include: {
        subcategories: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    return category;
  }

  async getCategoryBySlug(slug: string): Promise<(Category & { subcategories: SubCategory[] }) | null> {
    const category = await prisma.category.findFirst({
      where: {
        slug,
        isActive: true,
      },
      include: {
        subcategories: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    return category;
  }

  async getSubcategories(categoryId?: string): Promise<SubCategory[]> {
    console.log('🔍 CategoryService.getSubcategories called with categoryId:', categoryId);
    
    const where: any = { isActive: true };
    
    if (categoryId) {
      where.categoryId = categoryId;
    }

    console.log('🔍 Query where clause:', where);

    const subcategories = await prisma.subCategory.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    console.log('🔍 Found subcategories:', subcategories.length);
    console.log('🔍 First subcategory:', subcategories[0]);

    return subcategories;
  }

  async getSubcategoryById(id: string): Promise<SubCategory | null> {
    const subcategory = await prisma.subCategory.findFirst({
      where: {
        id,
        isActive: true,
      },
    });

    return subcategory;
  }

  async getSubcategoryBySlug(slug: string): Promise<SubCategory | null> {
    const subcategory = await prisma.subCategory.findFirst({
      where: {
        slug,
        isActive: true,
      },
    });

    return subcategory;
  }

  async getCategoriesWithProductCount(): Promise<(Category & { productCount: number })[]> {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await prisma.product.count({
          where: {
            categoryId: category.id,
            isActive: true,
          },
        });

        return {
          ...category,
          productCount,
        };
      })
    );

    return categoriesWithCount;
  }

  async getSubcategoriesWithProductCount(categoryId?: string): Promise<(SubCategory & { productCount: number })[]> {
    const where: any = { isActive: true };
    
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const subcategories = await prisma.subCategory.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    const subcategoriesWithCount = await Promise.all(
      subcategories.map(async (subcategory) => {
        const productCount = await prisma.product.count({
          where: {
            subcategoryId: subcategory.id,
            isActive: true,
          },
        });

        return {
          ...subcategory,
          productCount,
        };
      })
    );

    return subcategoriesWithCount;
  }

  // Admin functions (for future use)
  async createCategory(data: {
    name: string;
    slug: string;
    image?: string;
    order?: number;
  }): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        image: data.image,
        order: data.order || 0,
      },
    });

    return category;
  }

  async updateCategory(id: string, data: {
    name?: string;
    slug?: string;
    image?: string;
    order?: number;
    isActive?: boolean;
  }): Promise<Category | null> {
    try {
      const category = await prisma.category.update({
        where: { id },
        data,
      });

      return category;
    } catch (error) {
      return null;
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      await prisma.category.update({
        where: { id },
        data: { isActive: false },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async createSubcategory(data: {
    name: string;
    slug: string;
    categoryId: string;
    description?: string;
    order?: number;
  }): Promise<SubCategory> {
    const subcategory = await prisma.subCategory.create({
      data: {
        name: data.name,
        slug: data.slug,
        categoryId: data.categoryId,
        description: data.description,
        order: data.order || 0,
      },
    });

    return subcategory;
  }

  async updateSubcategory(id: string, data: {
    name?: string;
    slug?: string;
    description?: string;
    order?: number;
    isActive?: boolean;
  }): Promise<SubCategory | null> {
    try {
      const subcategory = await prisma.subCategory.update({
        where: { id },
        data,
      });

      return subcategory;
    } catch (error) {
      return null;
    }
  }

  async deleteSubcategory(id: string): Promise<boolean> {
    try {
      await prisma.subCategory.update({
        where: { id },
        data: { isActive: false },
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new CategoryService();
