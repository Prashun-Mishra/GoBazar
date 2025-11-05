import { Router } from 'express';
import paymentController from '@/controllers/paymentController';
import { authenticateToken } from '@/middleware/auth';

const router = Router();

// User routes (require authentication)
router.post('/initiate', authenticateToken, paymentController.initiatePayment);
router.get('/status/:transactionId', authenticateToken, paymentController.getPaymentStatus);

// PayU callback routes (no auth required)
router.post('/callback', paymentController.handleCallback);
router.post('/webhook', paymentController.handleWebhook);

export default router;
