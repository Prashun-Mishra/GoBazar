"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Package, DollarSign, AlertTriangle } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/types"

export default function ProductAnalyticsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [timeRange, setTimeRange] = useState("7d")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Calculate analytics
  const analytics = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
    averagePrice: products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0,
    lowStockItems: products.filter((p) => p.stock > 0 && p.stock <= 10),
    outOfStockItems: products.filter((p) => p.stock === 0),
    topCategories: getTopCategories(products),
    priceRanges: getPriceRanges(products),
    stockDistribution: getStockDistribution(products),
  }

  function getTopCategories(products: Product[]) {
    const categoryCount = products.reduce(
      (acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([category, count]) => ({ category, count }))
  }

  function getPriceRanges(products: Product[]) {
    const ranges = {
      "Under ₹50": 0,
      "₹50-₹100": 0,
      "₹100-₹200": 0,
      "₹200-₹500": 0,
      "Above ₹500": 0,
    }

    products.forEach((product) => {
      if (product.price < 50) ranges["Under ₹50"]++
      else if (product.price < 100) ranges["₹50-₹100"]++
      else if (product.price < 200) ranges["₹100-₹200"]++
      else if (product.price < 500) ranges["₹200-₹500"]++
      else ranges["Above ₹500"]++
    })

    return Object.entries(ranges).map(([range, count]) => ({ range, count }))
  }

  function getStockDistribution(products: Product[]) {
    const distribution = {
      "Out of Stock": products.filter((p) => p.stock === 0).length,
      "Low Stock (1-10)": products.filter((p) => p.stock > 0 && p.stock <= 10).length,
      "Medium Stock (11-50)": products.filter((p) => p.stock > 10 && p.stock <= 50).length,
      "High Stock (50+)": products.filter((p) => p.stock > 50).length,
    }

    return Object.entries(distribution).map(([level, count]) => ({ level, count }))
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Analytics</h1>
          <p className="text-gray-600">Insights and performance metrics for your products</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inventory Value</p>
                <p className="text-3xl font-bold text-gray-900">{formatPrice(analytics.totalValue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Price</p>
                <p className="text-3xl font-bold text-gray-900">{formatPrice(analytics.averagePrice)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-3xl font-bold text-red-600">{analytics.lowStockItems.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topCategories.map(({ category, count }) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="font-medium">{category}</span>
                  <Badge variant="secondary">{count} products</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Price Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.priceRanges.map(({ range, count }) => (
                <div key={range} className="flex items-center justify-between">
                  <span className="font-medium">{range}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(count / analytics.totalProducts) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stock Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.stockDistribution.map(({ level, count }) => (
                <div key={level} className="flex items-center justify-between">
                  <span className="font-medium">{level}</span>
                  <Badge
                    variant={
                      level.includes("Out of Stock") ? "destructive" : level.includes("Low") ? "secondary" : "default"
                    }
                  >
                    {count} products
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {analytics.lowStockItems.slice(0, 10).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-600">{product.brand}</p>
                  </div>
                  <Badge variant="destructive">{product.stock} left</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
