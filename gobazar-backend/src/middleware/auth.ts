import { Request, Response, NextFunction } from 'express';
import { JWTUtil } from '@/utils/jwt';
import { ResponseUtil } from '@/utils/response';
import { AuthenticatedRequest, JWTPayload } from '@/types';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return ResponseUtil.unauthorized(res, 'Access token is required');
  }

  try {
    const decoded = JWTUtil.verifyToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    return ResponseUtil.unauthorized(res, 'Invalid or expired token');
  }
};

export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = JWTUtil.verifyToken(token);
      req.user = decoded;
    } catch (error) {
      // Token is invalid, but we continue without authentication
      req.user = undefined;
    }
  }

  next();
};

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return ResponseUtil.unauthorized(res, 'Authentication required');
  }

  if (req.user.role !== 'ADMIN') {
    return ResponseUtil.forbidden(res, 'Admin access required');
  }

  return next();
};

export const requireUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return ResponseUtil.unauthorized(res, 'Authentication required');
  }

  if (req.user.role !== 'USER' && req.user.role !== 'ADMIN') {
    return ResponseUtil.forbidden(res, 'User access required');
  }

  return next();
};
