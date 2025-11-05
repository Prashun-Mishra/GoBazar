"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { CategoryGrid } from "@/components/category-grid"
import { ProductCard } from "@/components/product-card"
import { SmartRecommendations } from "@/components/smart-recommendations"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"
import type { Product } from "@/types"

// Category slug to name mapping
const categoryConfig = [
  { slug: 'dairy-breakfast', name: 'Dairy, Bread & Eggs', limit: 6 },
  { slug: 'munchies', name: 'Snacks & Munchies', limit: 6 },
  { slug: 'paan-corner', name: 'Mouth fresheners', limit: 6 },
  { slug: 'cold-drinks-juices', name: 'Cold Drinks & Juices', limit: 6 },
  { slug: 'sweet-tooth', name: 'Candies & Gums', limit: 6 },
]

export default function HomePage() {
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const productsByCategory: Record<string, Product[]> = {}
        
        // Fetch products for each category
        await Promise.all(
          categoryConfig.map(async (config) => {
            try {
              const response = await fetch(
                `/api/products?category=${config.slug}&limit=${config.limit}&page=1`
              )
              if (response.ok) {
                const data = await response.json()
                productsByCategory[config.slug] = data.products || []
              }
            } catch (error) {
              console.error(`Error fetching ${config.name}:`, error)
              productsByCategory[config.slug] = []
            }
          })
        )
        
        setCategoryProducts(productsByCategory)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Main Promotional Banner - Paan Corner */}
        <section className="container py-4">
          <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Paan corner</h2>
              <p className="text-lg mb-4 text-green-100">Your favourite paan shop is now online</p>
              <Button className="bg-white text-green-600 hover:bg-gray-100 font-medium">Shop Now</Button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Paan items"
                width={400}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Three Promotional Cards */}
        <section className="container py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Pharmacy at your doorstep</h3>
              <p className="text-sm mb-3 text-cyan-100">Cough syrups, pain relief and more</p>
              <Button size="sm" className="bg-white text-cyan-600 hover:bg-gray-100">
                Order Now
              </Button>
            </div>
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Pet Care supplies in 8 minutes</h3>
              <p className="text-sm mb-3 text-orange-100">Food, treats, toys and more</p>
              <Button size="sm" className="bg-white text-orange-600 hover:bg-gray-100">
                Order Now
              </Button>
            </div>
            <div className="bg-gradient-to-r from-pink-400 to-pink-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">No time for a diaper run?</h3>
              <p className="text-sm mb-3 text-pink-100">Get baby care essentials in minutes</p>
              <Button size="sm" className="bg-white text-pink-600 hover:bg-gray-100">
                Order Now
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="container py-6">
          <CategoryGrid />
        </section>

        <SmartRecommendations context="homepage" />

        {/* Dynamic Category Sections */}
        {loading ? (
          <div className="container py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          categoryConfig.map((config) => {
            const products = categoryProducts[config.slug] || []
            if (products.length === 0) return null
            
            return (
              <section key={config.slug} className="container py-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{config.name}</h2>
                  <Button 
                    variant="ghost" 
                    className="text-green-600 hover:text-green-700"
                    onClick={() => window.location.href = `/category/${config.slug}`}
                  >
                    see all
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {products.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-40">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </section>
            )
          })
        )}
      </main>

      <Footer />
    </div>
  )
}
