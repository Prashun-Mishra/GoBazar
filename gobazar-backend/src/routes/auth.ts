import { Router } from 'express';
import authController from '@/controllers/authController';
import { validateBody } from '@/middleware/validation';
import { authenticateToken } from '@/middleware/auth';
import { authLimiter, otpLimiter } from '@/middleware/rateLimiter';
import { ValidationSchemas } from '@/utils/validation';

const router = Router();

// Public routes
router.post('/send-otp', otpLimiter, validateBody(ValidationSchemas.sendOTP), authController.sendOTP);
router.post('/verify-otp', authLimiter, validateBody(ValidationSchemas.verifyOTP), authController.verifyOTP);
router.post('/register', authLimiter, validateBody(ValidationSchemas.register), authController.register);

// Protected routes
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, authController.updateProfile);
router.post('/logout', authenticateToken, authController.logout);

export default router;
