"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Plus, Minus, X, ShoppingBag, Tag, Info } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/types"
import { SmartRecommendations } from "@/components/smart-recommendations"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponDiscount, setCouponDiscount] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        // Handle both old and new API response formats
        const productsArray = data.products || data.data || data
        setProducts(Array.isArray(productsArray) ? productsArray : [])
      } catch (error) {
        console.error("Failed to fetch products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const cartProducts = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (!product) return null

      const variant = item.variantId ? product.variants?.find((v) => v.id === item.variantId) : null
      const price = variant?.price || product.price
      const mrp = variant?.mrp || product.mrp
      const unit = variant?.unit || product.unit

      return {
        ...item,
        product,
        price,
        mrp,
        unit,
        total: price * item.quantity,
        savings: (mrp - price) * item.quantity,
      }
    })
    .filter(Boolean)

  const subtotal = getCartTotal(products)
  const totalSavings = cartProducts.reduce((sum, item) => sum + (item?.savings || 0), 0)

  const deliveryFee = subtotal >= 199 ? 0 : 25
  const handlingCharge = subtotal > 0 ? Math.max(2, Math.round(subtotal * 0.01)) : 0 // 1% of subtotal, minimum ₹2
  const platformFee = subtotal > 0 ? 3 : 0 // Fixed platform fee
  const gst = Math.round((subtotal + handlingCharge + platformFee) * 0.05) // 5% GST on subtotal + charges
  const totalCharges = deliveryFee + handlingCharge + platformFee + gst
  const finalTotal = subtotal + totalCharges - couponDiscount

  const applyCoupon = () => {
    const validCoupons = {
      WELCOME50: { discount: 50, minOrder: 200, description: "₹50 off on orders above ₹200" },
      SAVE20: { discount: 20, minOrder: 100, description: "₹20 off on orders above ₹100" },
      FIRST10: { discount: 10, minOrder: 50, description: "₹10 off on orders above ₹50" },
      FREESHIP: { discount: deliveryFee, minOrder: 100, description: "Free delivery on orders above ₹100" },
    }

    const coupon = validCoupons[couponCode as keyof typeof validCoupons]
    if (coupon && subtotal >= coupon.minOrder) {
      setAppliedCoupon(couponCode)
      setCouponDiscount(Math.min(coupon.discount, subtotal)) // Don't exceed subtotal
      setCouponCode("")
    } else {
      alert(coupon ? `Minimum order of ₹${coupon.minOrder} required` : "Invalid coupon code")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponDiscount(0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <div className="flex space-x-4">
                      <div className="bg-gray-200 w-20 h-20 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                        <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg p-4 h-fit">
                <div className="bg-gray-200 h-6 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded"></div>
                  <div className="bg-gray-200 h-4 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartProducts.map((item) => {
                if (!item) return null

                return (
                  <div
                    key={`${item.productId}-${item.variantId || "default"}`}
                    className="bg-white rounded-lg p-6 border"
                  >
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg?height=80&width=80"}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-balance">{item.product.name}</h3>
                            <p className="text-sm text-gray-600">{item.product.brand}</p>
                            <p className="text-sm text-gray-500">{item.unit}</p>
                            {item.mrp > item.price && (
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                  {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                                </span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.productId, item.variantId)}
                            className="text-gray-400 hover:text-red-500 p-1 h-fit"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg text-gray-900">{formatPrice(item.price)}</span>
                            {item.mrp > item.price && (
                              <span className="text-sm text-gray-500 line-through">{formatPrice(item.mrp)}</span>
                            )}
                          </div>

                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                              className="w-8 h-8 rounded-full border-2 border-green-600 text-green-600 flex items-center justify-center hover:bg-green-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                              className="w-8 h-8 rounded-full border-2 border-green-600 text-green-600 flex items-center justify-center hover:bg-green-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                          <span className="font-semibold text-gray-900">Total: {formatPrice(item.total)}</span>
                          {item.savings > 0 && (
                            <span className="text-sm text-green-600 font-medium">
                              You save {formatPrice(item.savings)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Coupon Code */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-green-600" />
                  Apply Coupon
                </h3>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg border border-green-200">
                    <div>
                      <span className="text-green-800 font-semibold">{appliedCoupon}</span>
                      <p className="text-sm text-green-600">Coupon applied successfully!</p>
                    </div>
                    <button onClick={removeCoupon} className="text-green-600 hover:text-green-800 p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <Button
                        onClick={applyCoupon}
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        Apply
                      </Button>
                    </div>
                    <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium mb-1">Available coupons:</p>
                      <p>• WELCOME50 - ₹50 off on orders above ₹200</p>
                      <p>• SAVE20 - ₹20 off on orders above ₹100</p>
                      <p>• FIRST10 - ₹10 off on orders above ₹50</p>
                      <p>• FREESHIP - Free delivery on orders above ₹100</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bill Details */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Bill Details
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Item total ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                    </span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Product discounts</span>
                      <span>-{formatPrice(totalSavings)}</span>
                    </div>
                  )}

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery charge</span>
                      <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                        {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Handling charge</span>
                      <span>{formatPrice(handlingCharge)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform fee</span>
                      <span>{formatPrice(platformFee)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (5%)</span>
                      <span>{formatPrice(gst)}</span>
                    </div>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600 border-t pt-3">
                      <span>Coupon discount ({appliedCoupon})</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}

                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Grand Total</span>
                    <span className="text-green-600">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {subtotal < 199 && (
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg text-sm text-orange-800 border border-orange-200">
                    <p className="font-medium">💡 Add ₹{199 - subtotal} more for FREE delivery</p>
                  </div>
                )}

                {totalSavings > 0 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-800 border border-green-200">
                    <p className="font-medium">🎉 You're saving ₹{totalSavings} on this order!</p>
                  </div>
                )}

                <Link href="/checkout">
                  <Button
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 py-3 text-base font-semibold"
                    size="lg"
                  >
                    Proceed to Checkout • {formatPrice(finalTotal)}
                  </Button>
                </Link>
              </div>

              {/* Delivery Info */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="font-semibold mb-3 text-gray-900">Delivery Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Delivery in 8-15 minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Free delivery on orders above ₹199</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Fresh guarantee or money back</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Contact-free delivery available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-12">
            <SmartRecommendations context="cart" />
          </div>
        )}
      </main>
    </div>
  )
}
