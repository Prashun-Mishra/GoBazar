import type { CartItem, Product } from '@/types'

export interface PricingBreakdown {
  subtotal: number
  deliveryFee: number
  handlingCharges: number
  platformFee: number
  gst: number
  total: number
  savings: number
  itemCount: number
}

export function calculatePricing(
  items: CartItem[],
  products: Product[],
  pincode?: string
): PricingBreakdown {
  console.log('💰 [Pricing] Calculating for:', items.length, 'items')
  
  // Calculate subtotal
  let subtotal = 0
  let totalMRP = 0
  let itemCount = 0
  
  items.forEach(item => {
    const product = products.find(p => p.id === item.productId)
    if (!product) {
      console.warn('💰 [Pricing] Product not found:', item.productId)
      return
    }
    
    const variant = item.variantId 
      ? product.variants?.find(v => v.id === item.variantId)
      : null
    
    const price = variant?.price || product.price
    const mrp = variant?.mrp || product.mrp || price
    
    subtotal += price * item.quantity
    totalMRP += mrp * item.quantity
    itemCount += item.quantity
  })
  
  // Calculate delivery fee
  const deliveryFee = subtotal >= 199 ? 0 : 25
  
  // Calculate other charges
  const handlingCharges = 2
  const platformFee = 3
  
  // Calculate GST (5% on subtotal + charges)
  const taxableAmount = subtotal + handlingCharges + platformFee
  const gst = Math.round(taxableAmount * 0.05)
  
  // Calculate total
  const total = subtotal + deliveryFee + handlingCharges + platformFee + gst
  
  // Calculate savings
  const savings = totalMRP - subtotal
  
  const breakdown: PricingBreakdown = {
    subtotal,
    deliveryFee,
    handlingCharges,
    platformFee,
    gst,
    total,
    savings,
    itemCount
  }
  
  console.log('💰 [Pricing] Breakdown:', breakdown)
  return breakdown
}

export function formatPrice(amount: number): string {
  return `₹${amount.toFixed(0)}`
}

export function calculateDeliveryCharges(pincode: string, orderValue: number) {
  // Free delivery for orders above ₹199
  const isFreeDelivery = orderValue >= 199
  const deliveryFee = isFreeDelivery ? 0 : 25
  const minimumForFree = 199
  
  return {
    deliveryFee,
    isFreeDelivery,
    minimumForFree,
    amountForFreeDelivery: isFreeDelivery ? 0 : minimumForFree - orderValue
  }
}
