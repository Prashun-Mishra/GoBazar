"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Package, CheckCircle, Truck, X, Eye, RotateCcw, Phone } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { formatPrice } from "@/lib/utils"
import type { Order } from "@/types"

const statusConfig = {
  RECEIVED: { icon: Package, color: "text-blue-600", bg: "bg-blue-50", label: "Order Received" },
  PACKING: { icon: Package, color: "text-orange-600", bg: "bg-orange-50", label: "Packing" },
  ON_THE_WAY: { icon: Truck, color: "text-purple-600", bg: "bg-purple-50", label: "On the Way" },
  DELIVERED: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "Delivered" },
  CANCELED: { icon: X, color: "text-red-600", bg: "bg-red-50", label: "Canceled" },
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders")
        
        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to login if unauthorized
            window.location.href = '/auth/login?redirect=/orders'
            return
          }
          throw new Error('Failed to fetch orders')
        }
        
        const result = await response.json()
        const orders = result.data || result // Handle both paginated and direct response
        
        setOrders(
          orders.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        )
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchOrders()
    } else {
      setLoading(false)
    }
  }, [user])

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true
    return order.status === filter
  })

  const getStatusCounts = () => {
    return {
      all: orders.length,
      RECEIVED: orders.filter((o) => o.status === "RECEIVED").length,
      PACKING: orders.filter((o) => o.status === "PACKING").length,
      ON_THE_WAY: orders.filter((o) => o.status === "ON_THE_WAY").length,
      DELIVERED: orders.filter((o) => o.status === "DELIVERED").length,
      CANCELED: orders.filter((o) => o.status === "CANCELED").length,
    }
  }

  const statusCounts = getStatusCounts()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-6">You need to sign in to view your orders.</p>
            <Link href="/auth/login?redirect=/orders">
              <Button className="bg-green-600 hover:bg-green-700">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-6">
                  <div className="bg-gray-200 h-6 rounded mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))}
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">When you place your first order, it will appear here.</p>
            <Link href="/">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
              {[
                { key: "all", label: "All Orders" },
                { key: "RECEIVED", label: "Received" },
                { key: "PACKING", label: "Packing" },
                { key: "ON_THE_WAY", label: "On the Way" },
                { key: "DELIVERED", label: "Delivered" },
                { key: "CANCELED", label: "Canceled" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === tab.key
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                  {statusCounts[tab.key as keyof typeof statusCounts] > 0 && (
                    <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {statusCounts[tab.key as keyof typeof statusCounts]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status]
                const StatusIcon = status.icon

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                  >
                    {/* Order Header */}
                    <div className="p-6 border-b">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${status.bg}`}>
                              <StatusIcon className={`w-4 h-4 ${status.color}`} />
                              <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Delivery slot: {order.deliverySlot}</p>
                            <p>
                              {order.address.street}, {order.address.city}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 mb-1">{formatPrice(order.total)}</div>
                          <div className="text-sm text-gray-600">{order.items.length} items</div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-600 font-medium">
                            +{order.items.length - 3}
                          </div>
                        )}
                        <div className="text-sm text-gray-600">
                          {order.items
                            .slice(0, 2)
                            .map((item) => item.name)
                            .join(", ")}
                          {order.items.length > 2 && ` and ${order.items.length - 2} more items`}
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="flex flex-wrap gap-3">
                        <Link href={`/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link>

                        {order.status === "DELIVERED" && (
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reorder
                          </Button>
                        )}

                        {(order.status === "RECEIVED" || order.status === "PACKING") && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                            onClick={async () => {
                              if (confirm('Are you sure you want to cancel this order?')) {
                                try {
                                  const response = await fetch(`/api/orders/${order.id}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ action: 'cancel' })
                                  })
                                  if (response.ok) {
                                    // Refresh orders
                                    window.location.reload()
                                  }
                                } catch (error) {
                                  alert('Failed to cancel order')
                                }
                              }
                            }}
                          >
                            Cancel Order
                          </Button>
                        )}

                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Phone className="w-4 h-4 mr-2" />
                          Get Help
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
