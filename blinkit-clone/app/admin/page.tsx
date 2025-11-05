"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Package, ShoppingCart, Users, DollarSign, ArrowUpRight, ArrowDownRight, Home } from "lucide-react"

const mockStats = {
  totalRevenue: 125000,
  revenueGrowth: 12.5,
  totalOrders: 1250,
  ordersGrowth: 8.3,
  totalProducts: 200,
  productsGrowth: 5.2,
  totalUsers: 850,
  usersGrowth: 15.7,
}

const recentOrders = [
  { id: "BK001", customer: "John Doe", amount: 108, status: "delivered", time: "2 hours ago" },
  { id: "BK002", customer: "Jane Smith", amount: 190, status: "on-the-way", time: "1 hour ago" },
  { id: "BK003", customer: "Mike Johnson", amount: 80, status: "packing", time: "30 minutes ago" },
  { id: "BK004", customer: "Sarah Wilson", amount: 156, status: "received", time: "15 minutes ago" },
]

const topProducts = [
  { name: "Fresh Bananas", sales: 145, revenue: 5800 },
  { name: "Fresh Milk", sales: 128, revenue: 3584 },
  { name: "Red Apples", sales: 89, revenue: 10680 },
  { name: "Brown Bread", sales: 67, revenue: 2345 },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6">
                <div className="bg-gray-200 h-4 rounded mb-4"></div>
                <div className="bg-gray-200 h-8 rounded mb-2"></div>
                <div className="bg-gray-200 h-3 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div
              className={`flex items-center space-x-1 text-sm ${
                mockStats.revenueGrowth > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {mockStats.revenueGrowth > 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(mockStats.revenueGrowth)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">₹{mockStats.totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div
              className={`flex items-center space-x-1 text-sm ${
                mockStats.ordersGrowth > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {mockStats.ordersGrowth > 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(mockStats.ordersGrowth)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{mockStats.totalOrders.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div
              className={`flex items-center space-x-1 text-sm ${
                mockStats.productsGrowth > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {mockStats.productsGrowth > 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(mockStats.productsGrowth)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{mockStats.totalProducts}</div>
          <div className="text-sm text-gray-600">Total Products</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div
              className={`flex items-center space-x-1 text-sm ${
                mockStats.usersGrowth > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {mockStats.usersGrowth > 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(mockStats.usersGrowth)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{mockStats.totalUsers}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">#{order.id}</div>
                    <div className="text-sm text-gray-600">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{order.amount}</div>
                    <div className="text-sm text-gray-600">{order.time}</div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "on-the-way"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "packing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status.replace("-", " ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Top Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.sales} sales</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{product.revenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
