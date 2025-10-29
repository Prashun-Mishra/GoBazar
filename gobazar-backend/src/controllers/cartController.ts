import { Request, Response } from 'express';
import { ResponseUtil } from '@/utils/response';
import { asyncHandler } from '@/middleware/errorHandler';
import cartService from '@/services/cartService';
import { AuthenticatedRequest } from '@/types';

class CartController {
  getCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;

    const cartItems = await cartService.getCart(userId);

    return ResponseUtil.success(res, cartItems, 'Cart retrieved successfully');
  });

  getCartSummary = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;

    const summary = await cartService.getCartSummary(userId);

    return ResponseUtil.success(res, summary, 'Cart summary retrieved successfully');
  });

  addToCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const { productId, variantId, quantity } = req.body;

    console.log('🛒 [Cart Controller] Add to cart request:', {
      userId,
      productId,
      variantId,
      quantity,
      quantityType: typeof quantity
    });

    try {
      const result = await cartService.addToCart(userId, {
        productId,
        variantId,
        quantity,
      });

      console.log('🛒 [Cart Controller] Service result:', result);

      if (result.success) {
        return ResponseUtil.success(res, result.cartItem, result.message, 201);
      } else {
        console.error('❌ [Cart Controller] Service failed:', result.message);
        return ResponseUtil.error(res, result.message, 400);
      }
    } catch (error) {
      console.error('💥 [Cart Controller] Exception:', error);
      return ResponseUtil.error(res, 'Failed to add item to cart', 500);
    }
  });

  updateCartItem = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const result = await cartService.updateCartItem(userId, cartItemId, { quantity });

    if (result.success) {
      return ResponseUtil.success(res, result.cartItem, result.message);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  removeFromCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const { cartItemId } = req.params;

    const result = await cartService.removeFromCart(userId, cartItemId);

    if (result.success) {
      return ResponseUtil.success(res, null, result.message);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  clearCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;

    const result = await cartService.clearCart(userId);

    if (result.success) {
      return ResponseUtil.success(res, null, result.message);
    } else {
      return ResponseUtil.error(res, result.message, 400);
    }
  });

  validateCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;

    const validation = await cartService.validateCartForCheckout(userId);

    if (validation.valid) {
      return ResponseUtil.success(res, { valid: true }, 'Cart is valid for checkout');
    } else {
      return ResponseUtil.success(res, {
        valid: false,
        message: validation.message,
        unavailableItems: validation.unavailableItems,
      }, 'Cart validation completed');
    }
  });

  syncCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.userId;
    const { items } = req.body;

    // For now, just return success - implement actual sync logic if needed
    return ResponseUtil.success(res, { synced: true, items: [] }, 'Cart synced successfully');
  });
}

export default new CartController();
