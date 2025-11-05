"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, Info } from "lucide-react"
import { Header } from "@/components/header"
import { AddressSelector } from "@/components/address-selector"
import { PaymentMethodSelector } from "@/components/payment-method-selector"
import { DeliveryInfoBanner } from "@/components/delivery-info-banner"
import { PayUPaymentForm } from "@/components/payu-payment-form"
import { formatPrice } from "@/lib/utils"
import { calculateDeliveryCharges } from "@/lib/serviceability"
import type { Product, Address } from "@/types"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

const deliverySlots = [
  { id: "1", time: "8:00 AM - 10:00 AM", available: true },
  { id: "2", time: "10:00 AM - 12:00 PM", available: true },
  { id: "3", time: "12:00 PM - 2:00 PM", available: false },
  { id: "4", time: "2:00 PM - 4:00 PM", available: true },
  { id: "5", time: "4:00 PM - 6:00 PM", available: true },
  { id: "6", time: "6:00 PM - 8:00 PM", available: true },
]

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loadingAddresses, setLoadingAddresses] = useState(true)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string>("")
  const [selectedPayment, setSelectedPayment] = useState<string>("payu")
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [showServiceabilityChecker, setShowServiceabilityChecker] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch("/api/products")
        const productsData = await productsResponse.json()
        setProducts(productsData.products || [])

        // Fetch user addresses if logged in
        if (user) {
          const addressesResponse = await fetch("/api/addresses")
          if (addressesResponse.ok) {
            const addressesData = await addressesResponse.json()
            const userAddresses = addressesData.data || addressesData
            setAddresses(userAddresses)
            
            // Set default address
            const defaultAddress = userAddresses.find((addr: Address) => addr.isDefault)
            if (defaultAddress) {
              setSelectedAddress(defaultAddress)
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
        setLoadingAddresses(false)
      }
    }

    fetchData()
  }, [user])

  // Redirect if cart is empty
  useEffect(() => {
    if (!loading && items.length === 0) {
      router.push("/cart")
      return
    }

    if (!selectedAddress) {
      alert("Please select a delivery address")
      return
    }
  }, [items, loading, router, selectedAddress])

  const subtotal = getCartTotal(products)
  const selectedAddressData = addresses.find((addr) => addr.id === selectedAddress?.id)
  const deliveryCharges = selectedAddressData
    ? calculateDeliveryCharges(selectedAddressData.pincode, subtotal)
    : { deliveryFee: 25, isFreeDelivery: false, minimumForFree: 199 }

  const handleAddressAdd = async (addressData: Omit<Address, "id">) => {
    try {
      const response = await fetch('/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      })

      if (!response.ok) {
        throw new Error('Failed to save address')
      }

      const result = await response.json()
      const newAddress = result.data || result

      if (newAddress.isDefault) {
        setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: false })))
      }

      setAddresses((prev) => [...prev, newAddress])
      setSelectedAddress(newAddress)
      alert('Address saved successfully!')
    } catch (error) {
      console.error('Error saving address:', error)
      alert('Failed to save address. Please try again.')
    }
  }

  const handleAddressEdit = async (addressId: string, addressData: Omit<Address, "id">) => {
    try {
      const response = await fetch(`/api/addresses/${addressId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      })

      if (!response.ok) {
        throw new Error('Failed to update address')
      }

      const result = await response.json()
      const updatedAddress = result.data || result

      setAddresses((prev) =>
        prev.map((addr) => {
          if (addr.id === addressId) {
            return updatedAddress
          }
          if (addressData.isDefault && addr.id !== addressId) {
            return { ...addr, isDefault: false }
          }
          return addr
        }),
      )
      alert('Address updated successfully!')
    } catch (error) {
      console.error('Error updating address:', error)
      alert('Failed to update address. Please try again.')
    }
  }

  const handleAddressDelete = async (addressId: string) => {
    try {
      const response = await fetch(`/api/addresses/${addressId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete address')
      }

      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId))
      if (selectedAddress?.id === addressId) {
        const remainingAddresses = addresses.filter((addr) => addr.id !== addressId)
        setSelectedAddress(remainingAddresses[0] || null)
      }
      alert('Address deleted successfully!')
    } catch (error) {
      console.error('Error deleting address:', error)
      alert('Failed to delete address. Please try again.')
    }
  }

  const handlePlaceOrder = async () => {
    // Check if cart has items
    if (!items || items.length === 0) {
      alert("Your cart is empty. Please add items before checkout.")
      router.push('/')
      return
    }

    if (!selectedAddress || !selectedSlot || !selectedPayment) {
      alert("Please select address, delivery slot, and payment method")
      return
    }

    if (!user) {
      alert("Please login to place order")
      router.push('/auth/login?redirect=/checkout')
      return
    }

    setIsPlacingOrder(true)

    try {
      const orderData = {
        addressId: selectedAddress.id,
        deliverySlot: selectedSlot,
        paymentMethod: selectedPayment === 'payu' ? 'ONLINE' : selectedPayment.toUpperCase(),
        items: items.map(item => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity
        }))
      }

      console.log('📦 [Checkout] Creating order with data:', orderData)
      console.log('📦 [Checkout] Items count:', items.length)

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to place order')
      }

      const result = await response.json()
      const orderId = result.data?.id || result.id
      
      console.log('✅ [Checkout] Order created:', orderId)

      // If PayU payment selected, initiate payment
      if (selectedPayment === 'payu') {
        console.log('💳 [Checkout] Initiating PayU payment...')
        await handlePayUPayment(orderId)
      } else {
        // COD order - clear cart and redirect to order details
        await clearCart()
        alert("Order placed successfully!")
        router.push(`/orders/${orderId}`)
      }
    } catch (error) {
      console.error('❌ [Checkout] Error placing order:', error)
      alert(error instanceof Error ? error.message : 'Failed to place order. Please try again.')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const handlePayUPayment = async (orderId: string) => {
    try {
      console.log('💳 [PayU] Initiating payment for order:', orderId)

      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ orderId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to initiate payment')
      }

      const result = await response.json()
      console.log('✅ [PayU] Payment data received:', result)

      // Create and submit PayU payment form
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = result.data.payuUrl || 'https://test.payu.in/_payment'

      // Add all PayU parameters
      const paymentData = result.data.paymentData
      Object.keys(paymentData).forEach(key => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = paymentData[key]
        form.appendChild(input)
      })

      document.body.appendChild(form)
      
      // Clear cart before redirecting to PayU
      await clearCart()
      console.log('🛒 [PayU] Cart cleared before payment redirect')
      
      console.log('💳 [PayU] Submitting payment form...')
      form.submit()
    } catch (error) {
      console.error('❌ [PayU] Error initiating payment:', error)
      alert(error instanceof Error ? error.message : 'Failed to initiate payment. Please try again.')
      throw error
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <div className="bg-gray-200 h-6 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="bg-gray-200 h-4 rounded"></div>
                    <div className="bg-gray-200 h-4 rounded"></div>
                  </div>
                </div>
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

      <main className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {selectedAddressData && (
          <DeliveryInfoBanner pincode={selectedAddressData.pincode} orderValue={subtotal} className="mb-6" />
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Address Selection */}
            <AddressSelector
              addresses={addresses}
              selectedAddressId={selectedAddress?.id || null}
              onAddressSelect={(addressId: string) => {
                const address = addresses.find(addr => addr.id === addressId)
                setSelectedAddress(address || null)
              }}
              onAddressAdd={handleAddressAdd}
              onAddressEdit={handleAddressEdit}
              onAddressDelete={handleAddressDelete}
            />

            {/* Delivery Slot */}
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                Choose Delivery Slot
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {deliverySlots.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      !slot.available
                        ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                        : selectedSlot === slot.id
                          ? "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-200"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    {slot.time}
                    {!slot.available && <div className="text-xs mt-1">Not Available</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <PaymentMethodSelector
              selectedMethod={selectedPayment}
              onMethodSelect={setSelectedPayment}
              onProceedToPayment={handlePlaceOrder}
              total={subtotal + deliveryCharges.deliveryFee + 2 + 3 + Math.round(subtotal * 0.05)} // Exact total with all charges
              isProcessing={false}
            />
          </div>

          {/* Quick Order Summary */}
          <div className="bg-white rounded-lg p-6 h-fit border">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Bill Details
            </h3>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Item total ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Delivery charge</span>
                <span className={deliveryCharges.deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                  {deliveryCharges.deliveryFee === 0 ? "FREE" : formatPrice(deliveryCharges.deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Handling charge</span>
                <span className="font-medium">{formatPrice(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Platform fee</span>
                <span className="font-medium">{formatPrice(3)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">GST (5%)</span>
                <span className="font-medium">{formatPrice(Math.round(subtotal * 0.05))}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span className="text-green-600">
                  {formatPrice(subtotal + deliveryCharges.deliveryFee + 2 + 3 + Math.round(subtotal * 0.05))}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Delivery in 8-15 minutes</span>
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

            <button
              onClick={handlePlaceOrder}
              disabled={!selectedAddress || !selectedSlot || !selectedPayment || isPlacingOrder}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">By placing order, you agree to our terms</p>
          </div>
        </div>
      </main>
    </div>
  )
}
