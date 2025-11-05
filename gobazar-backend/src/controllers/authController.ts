import { Request, Response } from 'express';
import { ResponseUtil } from '@/utils/response';
import { asyncHandler } from '@/middleware/errorHandler';
import authService from '@/services/authService';
import { AuthenticatedRequest } from '@/types';

class AuthController {
  sendOTP = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    const result = await authService.sendOTP(email);

    if (result.success) {
      return ResponseUtil.success(res, null, result.message);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  verifyOTP = asyncHandler(async (req: Request, res: Response) => {
    const { email, code } = req.body;

    const result = await authService.verifyOTP(email, code);

    if (result.success) {
      return ResponseUtil.success(res, {
        token: result.token,
        user: result.user,
      }, result.message);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;

    const result = await authService.register({ name, email, phone });

    if (result.success) {
      return ResponseUtil.success(res, result.user, result.message, 201);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;

    const result = await authService.getUserProfile(userId);

    if (result.success) {
      return ResponseUtil.success(res, result.user, result.message);
    } else {
      return ResponseUtil.notFound(res, result.message);
    }
  });

  updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const { name, phone } = req.body;

    const result = await authService.updateProfile(userId, { name, phone });

    if (result.success) {
      return ResponseUtil.success(res, result.user, result.message);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    // Since we're using stateless JWT, logout is handled on the client side
    // by removing the token. We can add token blacklisting here if needed.
    return ResponseUtil.success(res, null, 'Logged out successfully');
  });
}

export default new AuthController();
