import { Router } from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import categoryRoutes from './categories';
import recommendationRoutes from './recommendations';
import cartRoutes from './cart';
import orderRoutes from './orders';
import addressRoutes from './addresses';
import locationRoutes from './location';
import adminRoutes from './admin';
import paymentRoutes from './payments';
import categoryController from '@/controllers/categoryController';
import productFeedController from '@/controllers/productFeedController';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'GoBazar API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/addresses', addressRoutes);
router.use('/location', locationRoutes);
router.use('/admin', adminRoutes);
router.use('/payments', paymentRoutes);

// Legacy route for frontend compatibility
// Direct subcategories endpoint
router.get('/subcategories', categoryController.getSubcategories);

// Product Feed for Google Merchant Center
router.get('/feed/google-merchant', productFeedController.getGoogleMerchantFeed);

export default router;
