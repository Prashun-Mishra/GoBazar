import { Request, Response } from 'express';
import { ResponseUtil } from '@/utils/response';
import { asyncHandler } from '@/middleware/errorHandler';
import addressService from '@/services/addressService';
import { AuthenticatedRequest } from '@/types';

class AddressController {
  getAddresses = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;

    const addresses = await addressService.getAddresses(userId);

    return ResponseUtil.success(res, addresses, 'Addresses retrieved successfully');
  });

  getAddressById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const { addressId } = req.params;

    const address = await addressService.getAddressById(addressId, userId);

    if (!address) {
      return ResponseUtil.notFound(res, 'Address not found');
    }

    return ResponseUtil.success(res, address, 'Address retrieved successfully');
  });

  createAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const addressData = req.body;

    const result = await addressService.createAddress(userId, addressData);

    if (result.success) {
      return ResponseUtil.success(res, result.address, result.message, 201);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  updateAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const { addressId } = req.params;
    const updateData = req.body;

    const result = await addressService.updateAddress(addressId, userId, updateData);

    if (result.success) {
      return ResponseUtil.success(res, result.address, result.message);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  deleteAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const { addressId } = req.params;

    const result = await addressService.deleteAddress(addressId, userId);

    if (result.success) {
      return ResponseUtil.success(res, null, result.message);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  setDefaultAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const { addressId } = req.params;

    const result = await addressService.setDefaultAddress(addressId, userId);

    if (result.success) {
      return ResponseUtil.success(res, result.address, result.message);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  getDefaultAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;

    const address = await addressService.getDefaultAddress(userId);

    if (!address) {
      return ResponseUtil.notFound(res, 'No default address found');
    }

    return ResponseUtil.success(res, address, 'Default address retrieved successfully');
  });

  validatePincode = asyncHandler(async (req: Request, res: Response) => {
    const { pincode } = req.params;

    const validation = await addressService.validatePincode(pincode);

    return ResponseUtil.success(res, validation, 'Pincode validation completed');
  });
}

export default new AddressController();
