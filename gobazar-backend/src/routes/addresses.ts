import { Router } from 'express';
import addressController from '@/controllers/addressController';
import { validateBody } from '@/middleware/validation';
import { authenticateToken } from '@/middleware/auth';
import { ValidationSchemas } from '@/utils/validation';

const router = Router();

// Public route for pincode validation
router.get('/validate-pincode/:pincode', addressController.validatePincode);

// Protected routes
router.use(authenticateToken);

router.get('/', addressController.getAddresses);
router.get('/default', addressController.getDefaultAddress);
router.post('/', validateBody(ValidationSchemas.createAddress), addressController.createAddress);
router.get('/:addressId', addressController.getAddressById);
router.put('/:addressId', addressController.updateAddress);
router.delete('/:addressId', addressController.deleteAddress);
router.put('/:addressId/set-default', addressController.setDefaultAddress);

export default router;
