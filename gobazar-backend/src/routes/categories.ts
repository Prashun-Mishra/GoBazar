import { Router } from 'express';
import categoryController from '@/controllers/categoryController';
import { requireAdmin } from '@/middleware/auth';

const router = Router();

// Public routes
router.get('/', categoryController.getCategories);
router.get('/subcategories', categoryController.getSubcategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/slug/:slug', categoryController.getCategoryBySlug);
router.get('/subcategories/:id', categoryController.getSubcategoryById);
router.get('/subcategories/slug/:slug', categoryController.getSubcategoryBySlug);

// Admin routes (for future use)
router.post('/', requireAdmin, categoryController.createCategory);
router.put('/:id', requireAdmin, categoryController.updateCategory);
router.delete('/:id', requireAdmin, categoryController.deleteCategory);
router.post('/subcategories', requireAdmin, categoryController.createSubcategory);
router.put('/subcategories/:id', requireAdmin, categoryController.updateSubcategory);
router.delete('/subcategories/:id', requireAdmin, categoryController.deleteSubcategory);

export default router;
