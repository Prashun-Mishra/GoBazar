"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Info, Clock, MapPin, CreditCard, Receipt, CheckCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/utils"
import { calculateDeliveryCharges } from "@/lib/serviceability"
import type { Product, Address } from "@/types"

export default function BillDetailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, getCartTotal, clearCart } = useCart()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  // Get checkout details from URL params or localStorage
  const addressId = searchParams.get("address")
  const paymentMethod = searchParams.get("payment") || "upi"
  const deliverySlot = searchParams.get("slot") || "8:00 AM - 10:00 AM"

  // Mock address data - in real app, fetch from API
  const selectedAddress: Address = {
    id: addressId || "1",
    type: "home",
    street: "123 Main Street, Apartment 4B",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    landmark: "Near Metro Station",
    isDefault: true,
  }

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

  // Redirect if cart is empty
  useEffect(() => {
    if (!loading && items.length === 0) {
      router.push("/cart")
    }
  }, [items, loading, router])

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

  const deliveryCharges = calculateDeliveryCharges(selectedAddress.pincode, subtotal)
  const handlingCharge = subtotal > 0 ? Math.max(2, Math.round(subtotal * 0.01)) : 0
  const platformFee = subtotal > 0 ? 3 : 0
  const gst = Math.round((subtotal + handlingCharge + platformFee) * 0.05)
  const total = subtotal + deliveryCharges.deliveryFee + handlingCharge + platformFee + gst

  const handlePlaceOrder = async () => {
    setProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      clearCart()
      router.push("/orders/success")
    }, 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full mr-4">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Summary</h1>
            <p className="text-gray-600">Review your order details before payment</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                Delivery Details
              </h2>

              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-green-800">Delivering to:</span>
                    <span className="text-sm text-green-600 font-medium capitalize">{selectedAddress.type}</span>
                  </div>
                  <p className="text-green-800 font-medium">{selectedAddress.street}</p>
                  <p className="text-green-700">
                    {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                  </p>
                  {selectedAddress.landmark && (
                    <p className="text-green-600 text-sm mt-1">Landmark: {selectedAddress.landmark}</p>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">Delivery Slot</p>
                      <p className="text-blue-700 text-sm">{deliverySlot}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-800 font-medium">Expected Delivery</p>
                    <p className="text-blue-600 text-sm">8-15 minutes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Receipt className="w-5 h-5 mr-2 text-blue-600" />
                Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>

              <div className="space-y-4">
                {cartProducts.map((item) => {
                  if (!item) return null

                  return (
                    <div
                      key={`${item.productId}-${item.variantId || "default"}`}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg?height=64&width=64"}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-balance">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.product.brand} • {item.unit}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="font-semibold text-gray-900">{formatPrice(item.price)}</span>
                          {item.mrp > item.price && (
                            <span className="text-sm text-gray-500 line-through">{formatPrice(item.mrp)}</span>
                          )}
                          <span className="text-sm text-gray-600">× {item.quantity}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(item.total)}</p>
                        {item.savings > 0 && <p className="text-sm text-green-600">Save {formatPrice(item.savings)}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                Payment Method
              </h2>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-purple-800 capitalize">{paymentMethod}</p>
                      <p className="text-purple-600 text-sm">
                        {paymentMethod === "cod" ? "Pay when you receive" : "Pay securely online"}
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="bg-white rounded-lg p-6 h-fit border sticky top-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Bill Details
            </h3>

            <div className="space-y-4 text-sm">
              {/* Items Total */}
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

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery charge</span>
                  <span className={deliveryCharges.deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                    {deliveryCharges.deliveryFee === 0 ? "FREE" : formatPrice(deliveryCharges.deliveryFee)}
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

              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span className="text-green-600">{formatPrice(total)}</span>
              </div>
            </div>

            {!deliveryCharges.isFreeDelivery && (
              <div className="mt-4 p-3 bg-orange-50 rounded-lg text-sm text-orange-800 border border-orange-200">
                <p className="font-medium">
                  💡 Add ₹{deliveryCharges.minimumForFree - subtotal} more for FREE delivery
                </p>
              </div>
            )}

            {totalSavings > 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-800 border border-green-200">
                <p className="font-medium">🎉 You're saving ₹{totalSavings} on this order!</p>
              </div>
            )}

            <Button
              onClick={handlePlaceOrder}
              disabled={processing}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 py-3 text-base font-semibold"
              size="lg"
            >
              {processing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing Order...
                </div>
              ) : paymentMethod === "cod" ? (
                `Place Order • ${formatPrice(total)}`
              ) : (
                `Pay ${formatPrice(total)}`
              )}
            </Button>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium mb-1">100% Secure Payment</p>
                  <p>Your payment information is encrypted and secure. We never store your card details.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
