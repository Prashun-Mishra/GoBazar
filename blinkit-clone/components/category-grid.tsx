"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Category } from "@/types"

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Add timestamp to force cache refresh
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/categories?t=${timestamp}`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        })
        const result = await response.json()
        // Handle backend response format
        const categoriesData = result.data || result
        console.log('📊 Categories fetched with Grofers images:', categoriesData?.length || 0, categoriesData)
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="animate-pulse flex flex-col items-center">
            <div className="bg-gray-200 rounded-full w-16 h-16 mb-2"></div>
            <div className="bg-gray-200 h-3 rounded w-12"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="text-sm text-gray-600 mb-2">Showing {categories.length} categories</div>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-4 w-full">
        {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.slug}`} className="group flex flex-col items-center">
          <div className="w-16 h-16 relative mb-2 bg-gray-50 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-green-200 transition-colors">
            <Image
              src={category.image || "/placeholder.svg?height=64&width=64"}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-200"
            />
          </div>
          <h3 className="font-medium text-xs text-gray-900 text-center leading-tight max-w-16 line-clamp-2">
            {category.name}
          </h3>
        </Link>
        ))}
      </div>
    </div>
  )
}
