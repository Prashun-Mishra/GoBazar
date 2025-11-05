export interface Category {
  id: string
  name: string
  slug: string
  image?: string
  order: number
}

export interface SubCategory {
  id: string
  categoryId: string
  name: string
  slug: string
  description?: string
  order: number
}

export interface Product {
  id: string
  name: string
  brand: string
  categoryId: string
  subcategoryId?: string
  price: number
  mrp: number
  discountPercent: number
  images: string[]
  unit: string
  variants?: ProductVariant[]
  stock: number
  description: string
  highlights: string[]
  rating: number
  reviewCount: number
  tags?: string[]
  nutritionalInfo?: string
  ingredients?: string
  benefits?: string
  isFeatured?: boolean
  createdAt?: string | Date
}

export interface ProductVariant {
  id: string
  name: string
  unit: string
  price: number
  mrp: number
  stock: number
  size?: string
  weight?: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  addresses: Address[]
  role: "user" | "admin"
  createdAt: string
}

export interface Address {
  id: string
  type: "home" | "work" | "other"
  street: string
  city: string
  state: string
  pincode: string
  landmark?: string
  isDefault: boolean
}

export interface CartItem {
  productId: string
  quantity: number
  variantId?: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: "RECEIVED" | "PACKING" | "ON_THE_WAY" | "DELIVERED" | "CANCELED"
  total: number
  subtotal: number
  discount: number
  deliveryFee: number
  taxes: number
  createdAt: string
  deliverySlot: string
  address: Address
  couponCode?: string
}

export interface OrderItem {
  productId: string
  variantId?: string
  quantity: number
  price: number
  name: string
  image: string
  unit: string
}

export interface Coupon {
  id: string
  code: string
  description: string
  discountType: "percentage" | "fixed"
  discountValue: number
  minOrderValue: number
  maxDiscount?: number
  validFrom: string
  validTo: string
  isActive: boolean
}
