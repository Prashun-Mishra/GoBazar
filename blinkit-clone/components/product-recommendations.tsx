"use client"

import { useState, useEffect, useRef } from "react"
import { ProductCard } from "@/components/product-card"
import { ChevronLeft, ChevronRight, TrendingUp, Users, Clock, Star, Zap } from "lucide-react"
import type { Product } from "@/types"

interface ProductRecommendationsProps {
  type: "trending" | "popular" | "recently-viewed" | "similar" | "frequently-bought" | "personalized"
  title?: string
  productId?: string
  categoryId?: string
  userId?: string
  limit?: number
  showHeader?: boolean
}

export function ProductRecommendations({
  type,
  title,
  productId,
  categoryId,
  userId,
  limit = 6,
  showHeader = true,
}: ProductRecommendationsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollPrev(scrollLeft > 0)
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 300
    const newPosition =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount
    scrollContainerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
  }

  useEffect(() => {
    checkScroll()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [products])

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const params = new URLSearchParams({
          type,
          limit: limit.toString(),
          ...(productId && { productId }),
          ...(categoryId && { categoryId }),
          ...(userId && { userId }),
        })

        const response = await fetch(`/api/recommendations?${params}`)
        const data = await response.json()
        // Handle both old and new API response formats
        const productsArray = data.products || data.data || data
        setProducts(Array.isArray(productsArray) ? productsArray : [])
      } catch (error) {
        console.error("Failed to fetch recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [type, productId, categoryId, userId, limit])

  const getRecommendationConfig = () => {
    switch (type) {
      case "trending":
        return {
          title: title || "Trending Now",
          icon: <TrendingUp className="w-5 h-5" />,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          description: "What's hot right now",
        }
      case "popular":
        return {
          title: title || "Most Popular",
          icon: <Users className="w-5 h-5" />,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          description: "Customer favorites",
        }
      case "recently-viewed":
        return {
          title: title || "Recently Viewed",
          icon: <Clock className="w-5 h-5" />,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          description: "Continue where you left off",
        }
      case "similar":
        return {
          title: title || "Similar Products",
          icon: <Star className="w-5 h-5" />,
          color: "text-green-600",
          bgColor: "bg-green-50",
          description: "You might also like",
        }
      case "frequently-bought":
        return {
          title: title || "Frequently Bought Together",
          icon: <Zap className="w-5 h-5" />,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          description: "Perfect combinations",
        }
      case "personalized":
        return {
          title: title || "Recommended for You",
          icon: <Star className="w-5 h-5" />,
          color: "text-pink-600",
          bgColor: "bg-pink-50",
          description: "Curated just for you",
        }
      default:
        return {
          title: title || "Recommendations",
          icon: <Star className="w-5 h-5" />,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          description: "",
        }
    }
  }

  const config = getRecommendationConfig()

  if (loading) {
    return (
      <section className="py-6">
        {showHeader && (
          <div className="flex items-center justify-between mb-4">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        )}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-40">
              <div className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-32 mb-2"></div>
                <div className="bg-gray-200 rounded h-4 mb-1"></div>
                <div className="bg-gray-200 rounded h-3 w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="container py-6">
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
                <div className={config.color}>{config.icon}</div>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">{config.title}</h2>
            </div>
            {config.description && <p className="text-sm text-gray-600">{config.description}</p>}
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollPrev}
              className={`p-2 rounded-full transition-all ${
                canScrollPrev
                  ? 'bg-green-100 hover:bg-green-200 text-green-700 cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollNext}
              className={`p-2 rounded-full transition-all ${
                canScrollNext
                  ? 'bg-green-100 hover:bg-green-200 text-green-700 cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Carousel */}
      <div className="overflow-hidden -mx-2" ref={scrollContainerRef} style={{ scrollBehavior: 'smooth' }}>
        <div className="flex gap-4 px-2">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-40 sm:w-48 md:w-56"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
