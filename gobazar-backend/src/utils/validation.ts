import Joi from 'joi';
import { ValidationError } from '@/types';

export class ValidationUtil {
  static formatJoiErrors(error: Joi.ValidationError): ValidationError[] {
    return error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  }

  static validatePincode(pincode: string): boolean {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  }

  static sanitizeString(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
  }

  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Common validation schemas
export const ValidationSchemas = {
  // Auth schemas
  sendOTP: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
  }),

  verifyOTP: Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(6).pattern(/^\d+$/).required().messages({
      'string.length': 'OTP must be 6 digits',
      'string.pattern.base': 'OTP must contain only numbers',
      'any.required': 'OTP code is required',
    }),
  }),

  register: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^(\+91|91)?[6-9]\d{9}$/).required().messages({
      'string.pattern.base': 'Please provide a valid Indian phone number',
      'any.required': 'Phone number is required',
    }),
  }),

  // Address schemas
  createAddress: Joi.object({
    type: Joi.string().valid('HOME', 'WORK', 'OTHER', 'home', 'work', 'other').required(),
    street: Joi.string().min(5).max(200).required(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).required(),
    pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).required().messages({
      'string.pattern.base': 'Please provide a valid pincode',
    }),
    landmark: Joi.string().max(100).optional().allow(''),
    isDefault: Joi.boolean().optional(),
  }),

  // Cart schemas
  addToCart: Joi.object({
    productId: Joi.string().required(),
    variantId: Joi.string().optional(),
    quantity: Joi.number().integer().min(1).max(99).required(),
  }),

  updateCart: Joi.object({
    quantity: Joi.number().integer().min(0).max(99).required(),
  }),

  // Order schemas
  createOrder: Joi.object({
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        variantId: Joi.string().optional().allow(null, ''),
        quantity: Joi.number().integer().min(1).required(),
      })
    ).min(1).required(),
    addressId: Joi.string().required(),
    deliverySlot: Joi.string().optional().allow(''),
    paymentMethod: Joi.string().optional().allow(''),
    couponCode: Joi.string().optional().allow(''),
  }).unknown(true),

  // Product schemas
  productQuery: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    category: Joi.string().optional(),
    categoryId: Joi.string().optional(),
    subcategory: Joi.string().optional(),
    subcategoryId: Joi.string().optional(),
    search: Joi.string().max(100).optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().min(0).optional(),
    brand: Joi.string().optional(),
    sortBy: Joi.string().valid('price', 'rating', 'name', 'createdAt').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').optional(),
  }).unknown(true),

  // Recommendation schemas
  recommendationQuery: Joi.object({
    type: Joi.string().valid('trending', 'popular', 'recently-viewed', 'similar', 'frequently-bought', 'personalized').required(),
    limit: Joi.number().integer().min(1).max(50).optional(),
    productId: Joi.string().optional(),
    categoryId: Joi.string().optional(),
    userId: Joi.string().optional(),
  }),

  // Admin Product schemas
  createProduct: Joi.object({
    name: Joi.string().min(2).max(200).required(),
    description: Joi.string().max(2000).optional().allow(''),
    brand: Joi.string().min(2).max(100).required(),
    categoryId: Joi.string().required(),
    subcategoryId: Joi.string().optional().allow(''),
    price: Joi.number().positive().required(),
    mrp: Joi.number().positive().required(),
    discount: Joi.number().min(0).max(100).optional(),
    stock: Joi.number().integer().min(0).required(),
    unit: Joi.string().max(20).required(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    isFeatured: Joi.boolean().optional(),
    isOrganic: Joi.boolean().optional(),
    variants: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        value: Joi.string().required(),
        price: Joi.number().positive().required(),
        stock: Joi.number().integer().min(0).required(),
      })
    ).optional(),
  }),

  updateProduct: Joi.object({
    name: Joi.string().min(2).max(200).optional(),
    description: Joi.string().min(10).max(2000).optional(),
    brand: Joi.string().min(2).max(100).optional(),
    categoryId: Joi.string().optional(),
    subcategoryId: Joi.string().optional(),
    price: Joi.number().positive().optional(),
    mrp: Joi.number().positive().optional(),
    discount: Joi.number().min(0).max(100).optional(),
    stock: Joi.number().integer().min(0).optional(),
    unit: Joi.string().max(20).optional(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    isFeatured: Joi.boolean().optional(),
    isOrganic: Joi.boolean().optional(),
  }),

  updateStock: Joi.object({
    stock: Joi.number().integer().min(0).required(),
    variantId: Joi.string().optional(),
  }),
};
