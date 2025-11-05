"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Eye, Package, Truck, CheckCircle, X } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import type { Order } from "@/types"

const statusConfig = {
  RECEIVED: { icon: Package, color: "text-blue-600", bg: "bg-blue-50", label: "Received" },
  PACKING: { icon: Package, color: "text-orange-600", bg: "bg-orange-50", label: "Packing" },
  ON_THE_WAY: { icon: Truck, color: "text-purple-600", bg: "bg-purple-50", label: "On the Way" },
  DELIVERED: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "Delivered" },
  CANCELED: { icon: X, color: "text-red-600", bg: "bg-red-50", label: "Canceled" },
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('📊 [Admin Orders] Fetching orders...')
        
        // Get auth token from localStorage
        const token = localStorage.getItem('auth-token')
        console.log('📊 [Admin Orders] Auth token:', !!token)
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        }
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }
        
        const response = await fetch("/api/admin/orders", {
          headers,
        })
        const data = await response.json()
        
        console.log('📊 [Admin Orders] Response:', data)
        
        if (data.success !== false) {
          const ordersData = data.data || data
          setOrders(Array.isArray(ordersData) ? ordersData.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : [])
        } else {
          console.error('Failed to fetch orders:', data.error)
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      console.log('📊 [Admin Orders] Updating order status:', { orderId, newStatus })
      
      // Get auth token from localStorage
      const token = localStorage.getItem('auth-token')
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
      
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()
      
      if (response.ok) {
        // Update local state
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
        console.log('✅ [Admin Orders] Order status updated successfully')
      } else {
        console.error('❌ [Admin Orders] Failed to update order status:', data.error)
        alert('Failed to update order status: ' + data.error)
      }
    } catch (error) {
      console.error('💥 [Admin Orders] Exception updating order status:', error)
      alert('Failed to update order status')
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="bg-white rounded-lg p-6">
            <div className="bg-gray-200 h-10 rounded mb-4"></div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="bg-gray-200 h-20 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
          <p className="text-gray-600">Manage customer orders and delivery status</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Filters */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="RECEIVED">Received</option>
              <option value="PACKING">Packing</option>
              <option value="ON_THE_WAY">On the Way</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELED">Canceled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="divide-y divide-gray-200">
          {filteredOrders.map((order) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon

            return (
              <div key={order.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()} at{" "}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${status.bg}`}>
                      <StatusIcon className={`w-4 h-4 ${status.color}`} />
                      <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{formatPrice(order.total)}</div>
                    <div className="text-sm text-gray-600">{order.items.length} items</div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium mb-2">Items:</h4>
                    <div className="space-y-2">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-xs text-gray-600">
                              Qty: {item.quantity} × {formatPrice(item.price)}
                            </div>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-sm text-gray-600">+{order.items.length - 2} more items</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Delivery Details:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Slot: {order.deliverySlot}</p>
                      <p>{order.address.street}</p>
                      <p>
                        {order.address.city}, {order.address.state} - {order.address.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-2">
                    {order.status === "RECEIVED" && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "PACKING")}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        Start Packing
                      </Button>
                    )}
                    {order.status === "PACKING" && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "ON_THE_WAY")}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Out for Delivery
                      </Button>
                    )}
                    {order.status === "ON_THE_WAY" && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Delivered
                      </Button>
                    )}
                    {(order.status === "RECEIVED" || order.status === "PACKING") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "CANCELED")}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>

                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
