"use client"

import { useState } from "react"
import { Search, Package, Phone, AlertCircle } from "lucide-react"
import { OrderTrackingTimeline } from "@/components/order-tracking-timeline"
import type { Order } from "@/types"

export default function PublicOrderTrackingPage() {
  const [orderId, setOrderId] = useState("")
  const [phone, setPhone] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!orderId.trim() || !phone.trim()) {
      setError('Please enter both Order ID and Phone Number')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/orders/track/${orderId}?phone=${encodeURIComponent(phone)}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to track order')
      }

      const data = await response.json()
      setOrder(data.data)
    } catch (error) {
      console.error('Error tracking order:', error)
      setError(error instanceof Error ? error.message : 'Failed to track order')
      setOrder(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    if (orderId && phone) {
      await handleTrackOrder({ preventDefault: () => {} } as React.FormEvent)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Package className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your order details to track your delivery</p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-lg p-6 border mb-8">
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Tracking...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Track Order</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Tracking Results */}
        {order && (
          <div className="space-y-6">
            {/* Order Header */}
            <div className="bg-white rounded-lg p-6 border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Order #{order.id.slice(-8)}</h2>
                  <p className="text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">₹{order.total}</p>
                  <p className="text-sm text-gray-600">{order.items.length} items</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Phone: {phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Items: {order.items.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    order.status === 'DELIVERED' ? 'bg-green-500' :
                    order.status === 'CANCELED' ? 'bg-red-500' :
                    order.status === 'ON_THE_WAY' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <span className="text-gray-600 capitalize">{order.status.replace('_', ' ').toLowerCase()}</span>
                </div>
              </div>
            </div>

            {/* Order Tracking Timeline */}
            <OrderTrackingTimeline 
              order={order} 
              onRefresh={handleRefresh}
              isLoading={isLoading}
            />

            {/* Order Items */}
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-gray-600 text-sm">{item.unit}</p>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{item.price}</p>
                      <p className="text-gray-600 text-sm">₹{item.price * item.quantity} total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800 mb-4">
            If you're having trouble tracking your order or have any questions, our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800">+91 1800-123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-800">support@gobazar.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
