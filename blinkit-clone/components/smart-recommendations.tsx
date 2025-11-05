"use client"

import { useState, useEffect } from "react"
import { ProductRecommendations } from "@/components/product-recommendations"
import { Button } from "@/components/ui/button"
import { Sparkles, RefreshCw, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

interface SmartRecommendationsProps {
  context?: "homepage" | "product" | "cart" | "checkout"
  productId?: string
  categoryId?: string
}

export function SmartRecommendations({ context = "homepage", productId, categoryId }: SmartRecommendationsProps) {
  const { user } = useAuth()
  const { items } = useCart()
  const [refreshKey, setRefreshKey] = useState(0)
  const [showPersonalized, setShowPersonalized] = useState(false)

  useEffect(() => {
    // Show personalized recommendations if user is logged in and has cart items or order history
    setShowPersonalized(!!user && (items.length > 0 || Math.random() > 0.5)) // Simulate order history
  }, [user, items])

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const getRecommendationsForContext = () => {
    switch (context) {
      case "homepage":
        return (
          <div className="space-y-2">
            {/* Personalized recommendations for logged-in users */}
            {showPersonalized && (
              <div key={`personalized-${refreshKey}`}>
                <ProductRecommendations type="personalized" userId={user?.id} limit={8} />
              </div>
            )}

            {/* Trending products */}
            <div key={`trending-${refreshKey}`}>
              <ProductRecommendations type="trending" limit={6} />
            </div>

            {/* Popular products */}
            <div key={`popular-${refreshKey}`}>
              <ProductRecommendations type="popular" limit={6} />
            </div>

            {/* Recently viewed for returning users */}
            {user && (
              <div key={`recent-${refreshKey}`}>
                <ProductRecommendations type="recently-viewed" userId={user.id} limit={6} />
              </div>
            )}
          </div>
        )

      case "product":
        return (
          <div className="space-y-2">
            {/* Similar products */}
            <div key={`similar-${refreshKey}`}>
              <ProductRecommendations type="similar" productId={productId} limit={6} />
            </div>

            {/* Frequently bought together */}
            <div key={`frequent-${refreshKey}`}>
              <ProductRecommendations type="frequently-bought" productId={productId} limit={4} />
            </div>

            {/* More from this category */}
            {categoryId && (
              <div key={`category-${refreshKey}`}>
                <ProductRecommendations
                  type="popular"
                  categoryId={categoryId}
                  title="More from this category"
                  limit={6}
                />
              </div>
            )}
          </div>
        )

      case "cart":
        return (
          <div className="space-y-2">
            {/* Frequently bought together based on cart items */}
            <div key={`cart-frequent-${refreshKey}`}>
              <ProductRecommendations
                type="frequently-bought"
                title="Complete your order"
                limit={4}
                productId={items[0]?.productId}
              />
            </div>

            {/* Trending in categories of cart items */}
            <div key={`cart-trending-${refreshKey}`}>
              <ProductRecommendations type="trending" title="You might also need" limit={6} />
            </div>
          </div>
        )

      case "checkout":
        return (
          <div className="space-y-2">
            {/* Last minute additions */}
            <div key={`checkout-${refreshKey}`}>
              <ProductRecommendations
                type="popular"
                title="Don't forget these essentials"
                limit={4}
                showHeader={true}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white">
      {/* Smart Recommendations Header */}
      {context === "homepage" && (
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Smart Recommendations</h2>
                <p className="text-gray-600">Discover products tailored just for you</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} className="bg-transparent border-gray-300">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-gray-300">
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Content */}
      <div className="container">{getRecommendationsForContext()}</div>
    </div>
  )
}
