import jwt, { SignOptions } from 'jsonwebtoken';
import config from '@/config';
import { JWTPayload } from '@/types';

export class JWTUtil {
  static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload as object, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    } as SignOptions);
  }

  static verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, config.jwt.secret) as JWTPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  static decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch (error) {
      return null;
    }
  }
}
