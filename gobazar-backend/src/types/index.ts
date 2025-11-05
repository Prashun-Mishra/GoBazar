import { User, Address, Category, SubCategory, Product, ProductVariant, CartItem, Order, OrderItem, Coupon, OTP } from '@prisma/client';
import { Request } from 'express';

// Re-export Prisma types
export { User, Address, Category, SubCategory, Product, ProductVariant, CartItem, Order, OrderItem, Coupon, OTP };

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
}

export interface OTPRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  code: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

// Product types
export interface ProductWithRelations extends Product {
  category: Category;
  subcategory?: SubCategory;
  variants: ProductVariant[];
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  category?: string;
  subcategory?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  sortBy?: 'price' | 'rating' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// Order types
export interface OrderWithRelations extends Order {
  user: User;
  address: Address;
  items: (OrderItem & {
    product: Product;
    variant?: ProductVariant;
  })[];
  coupon?: Coupon;
  payments?: any[];
}

export interface CreateOrderRequest {
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
  }[];
  addressId: string;
  deliverySlot?: string;
  paymentMethod?: string;
  couponCode?: string;
}

// Cart types
export interface CartItemWithRelations extends CartItem {
  product: Product;
  variant?: ProductVariant;
}

export interface AddToCartRequest {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartRequest {
  quantity: number;
}

// Address types
export interface CreateAddressRequest {
  type: 'HOME' | 'WORK' | 'OTHER';
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
}

// Recommendation types
export interface RecommendationQuery {
  type: 'trending' | 'popular' | 'recently-viewed' | 'similar' | 'frequently-bought' | 'personalized';
  limit?: number;
  productId?: string;
  categoryId?: string;
  userId?: string;
}

// Payment types
export interface PaymentRequest {
  orderId: string;
  amount: number;
  gateway: 'RMC' | 'SABPAISA' | 'PAYU';
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  redirectUrl?: string;
  error?: string;
}

// File upload types
export interface UploadResponse {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: ValidationError[];
}

// Middleware types
export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

// Database query options
export interface QueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  include?: Record<string, boolean>;
}

// Email types
export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  context?: Record<string, any>;
}

// OTP types
export interface OTPData {
  email: string;
  code: string;
  expiresAt: Date;
}

// Analytics types
export interface ProductAnalytics {
  views: number;
  purchases: number;
  rating: number;
  reviewCount: number;
}

export interface UserBehavior {
  userId: string;
  productId: string;
  action: 'view' | 'purchase' | 'cart_add' | 'cart_remove';
  timestamp: Date;
}

// Configuration types
export interface DatabaseConfig {
  url: string;
}

export interface JWTConfig {
  secret: string;
  expiresIn: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

export interface PaymentGatewayConfig {
  merchantId: string;
  secretKey: string;
  apiUrl: string;
}

export interface AppConfig {
  port: number;
  nodeEnv: string;
  frontendUrl: string;
  database: DatabaseConfig;
  jwt: JWTConfig;
  email: EmailConfig;
  cloudinary: CloudinaryConfig;
  paymentGateways: {
    rmc: PaymentGatewayConfig;
    sabpaisa: PaymentGatewayConfig;
    payu: PaymentGatewayConfig;
  };
  otp: {
    expiryMinutes: number;
    length: number;
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
}
