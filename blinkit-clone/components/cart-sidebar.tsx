"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { calculatePricing, formatPrice } from "@/lib/pricing"
import type { Product } from "@/types"

export function CartSidebar() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getCartTotal } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        console.log('🛒 [Cart Sidebar] Fetching products for cart items:', items.length)
        
        // Extract unique product IDs from cart items
        const productIds = [...new Set(items.map(item => item.productId))]
        console.log('🛒 [Cart Sidebar] Unique product IDs:', productIds)
        
        if (productIds.length === 0) {
          setProducts([])
          setLoading(false)
          return
        }
        
        const response = await fetch("/api/cart/products", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productIds }),
        })
        
        const result = await response.json()
        console.log('🛒 [Cart Sidebar] Products API response:', result)
        
        // Handle response from backend
        const productsData = result.data || result
        const products = Array.isArray(productsData) ? productsData : []
        
        console.log('🛒 [Cart Sidebar] Setting products:', products.length)
        setProducts(products)
      } catch (error) {
        console.error("Failed to fetch cart products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    if (isOpen && items.length > 0) {
      fetchCartProducts()
    } else if (isOpen && items.length === 0) {
      setProducts([])
      setLoading(false)
    }
  }, [isOpen, items])

  console.log('🛒 [Cart Sidebar] Items:', items.length, 'Products loaded:', products.length)
  console.log('🛒 [Cart Sidebar] Cart items:', items)
  console.log('🛒 [Cart Sidebar] Products:', products.map(p => ({ id: p.id, name: p.name, price: p.price })))

  const cartProducts = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId)
      console.log('🛒 [Cart Sidebar] Finding product for:', item.productId, 'Found:', !!product)
      if (!product) return null

      const variant = item.variantId ? product.variants?.find((v) => v.id === item.variantId) : null
      const price = variant?.price || product.price
      const unit = variant?.unit || product.unit

      console.log('🛒 [Cart Sidebar] Product details:', {
        name: product.name,
        price,
        quantity: item.quantity,
        total: price * item.quantity
      })

      return {
        ...item,
        product,
        price,
        unit,
        total: price * item.quantity,
      }
    })
    .filter(Boolean)

  // Calculate accurate pricing
  const pricing = calculatePricing(items, products)

  console.log('🛒 [Cart Sidebar] Pricing:', pricing)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleCart} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-green-50">
          <h2 className="text-lg font-semibold text-green-800">My Cart ({items.length})</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-green-100 rounded-full">
            <X className="w-5 h-5 text-green-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse flex space-x-3">
                  <div className="bg-gray-200 w-16 h-16 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some products to get started</p>
              <Button onClick={toggleCart} className="bg-green-600 hover:bg-green-700">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cartProducts.map((item) => {
                if (!item) return null

                return (
                  <div
                    key={`${item.productId}-${item.variantId || "default"}`}
                    className="flex space-x-3 bg-gray-50 rounded-lg p-3 border"
                  >
                    <div className="w-14 h-14 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{item.unit}</p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-sm text-gray-900">₹{item.price}</span>

                        <div className="flex items-center bg-green-600 text-white rounded px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-green-700 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium px-2 min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-green-700 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-gray-400 hover:text-red-500 p-1 self-start"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t bg-gray-50 p-4 space-y-4">
            {/* Delivery Info */}
            <div className="text-sm">
              {pricing.deliveryFee === 0 ? (
                <div className="text-green-700 bg-green-100 p-3 rounded-lg font-medium">🎉 You get FREE delivery!</div>
              ) : (
                <div className="text-orange-700 bg-orange-100 p-3 rounded-lg font-medium">
                  Add {formatPrice(199 - pricing.subtotal)} more for FREE delivery
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-sm bg-white p-3 rounded-lg">
              <div className="flex justify-between">
                <span>Subtotal ({pricing.itemCount} items)</span>
                <span>{formatPrice(pricing.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{pricing.deliveryFee === 0 ? "FREE" : formatPrice(pricing.deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Handling Charges</span>
                <span>{formatPrice(pricing.handlingCharges)}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>{formatPrice(pricing.platformFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>{formatPrice(pricing.gst)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2 text-green-700">
                <span>Total</span>
                <span>{formatPrice(pricing.total)}</span>
              </div>
              {pricing.savings > 0 && (
                <div className="text-green-600 text-xs">
                  You saved {formatPrice(pricing.savings)} on this order!
                </div>
              )}
            </div>

            {/* Checkout Button */}
            <Link href="/cart" onClick={toggleCart}>
              <Button className="w-full bg-green-600 hover:bg-green-700 font-medium py-3">Proceed to Checkout</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
