"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { AdvancedSearch } from "@/components/advanced-search"
import { Button } from "@/components/ui/button"
import { Loader2, Package } from "lucide-react"
import type { Product } from "@/types"

interface SearchFilters {
  query: string
  categoryId: string
  subcategoryId: string
  minPrice: string
  maxPrice: string
  rating: string
  sortBy: string
  sortOrder: string
  inStock: boolean
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""
  const subcategory = searchParams.get("subcategory") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  
  const [filters, setFilters] = useState<SearchFilters>({
    query,
    categoryId: category,
    subcategoryId: subcategory,
    minPrice: '',
    maxPrice: '',
    rating: '',
    sortBy: 'relevance',
    sortOrder: 'desc',
    inStock: true,
  })

  useEffect(() => {
    // Update filters when URL params change
    setFilters(prev => ({
      ...prev,
      query,
      categoryId: category,
      subcategoryId: subcategory,
    }))
  }, [query, category, subcategory])

  const fetchProducts = async (searchFilters: SearchFilters, page: number = 1) => {
    try {
      setLoading(true)
      
      // Build query parameters
      const queryParams = new URLSearchParams()
      if (searchFilters.query) queryParams.append('search', searchFilters.query)
      if (searchFilters.categoryId) queryParams.append('category', searchFilters.categoryId)
      if (searchFilters.subcategoryId) queryParams.append('subcategory', searchFilters.subcategoryId)
      if (searchFilters.minPrice) queryParams.append('minPrice', searchFilters.minPrice)
      if (searchFilters.maxPrice) queryParams.append('maxPrice', searchFilters.maxPrice)
      if (searchFilters.rating) queryParams.append('rating', searchFilters.rating)
      if (searchFilters.sortBy) queryParams.append('sortBy', searchFilters.sortBy)
      if (searchFilters.sortOrder) queryParams.append('sortOrder', searchFilters.sortOrder)
      if (searchFilters.inStock) queryParams.append('inStock', 'true')
      queryParams.append('page', page.toString())
      queryParams.append('limit', '20')

      const response = await fetch(`/api/products?${queryParams.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch products')
      
      const data = await response.json()
      const newProducts = data.products || data.data || []
      
      if (page === 1) {
        setProducts(newProducts)
      } else {
        setProducts(prev => [...prev, ...newProducts])
      }
      
      setTotalResults(data.total || newProducts.length)
      setHasMore(data.hasMore || false)
      setCurrentPage(page)
    } catch (error) {
      console.error("Failed to fetch products:", error)
      setProducts([])
      setTotalResults(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(filters)
  }, [])

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    fetchProducts(newFilters, 1)
    
    // Update URL with search parameters
    const params = new URLSearchParams()
    if (newFilters.query) params.set('q', newFilters.query)
    if (newFilters.categoryId) params.set('category', newFilters.categoryId)
    if (newFilters.subcategoryId) params.set('subcategory', newFilters.subcategoryId)
    
    const newUrl = `/search${params.toString() ? '?' + params.toString() : ''}`
    router.push(newUrl, { scroll: false })
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchProducts(filters, currentPage + 1)
    }
  }

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-8">
        {/* Advanced Search */}
        <div className="mb-8">
          <AdvancedSearch
            onSearch={handleSearch}
            initialFilters={filters}
            className="w-full"
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {filters.query ? `Search Results for "${filters.query}"` : 'All Products'}
            </h1>
            <p className="text-gray-600 mt-1">
              {totalResults} {totalResults === 1 ? 'product' : 'products'} found
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center">
                <Button
                  onClick={handleLoadMore}
                  disabled={loading}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Load More Products</span>
                  )}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No products found</h2>
            <p className="text-gray-600 mb-8">
              {filters.query
                ? `No products match your search for "${filters.query}". Try adjusting your filters or search terms.`
                : 'No products available at the moment.'}
            </p>
            <Button
              onClick={() => handleSearch({
                query: '',
                categoryId: '',
                subcategoryId: '',
                minPrice: '',
                maxPrice: '',
                rating: '',
                sortBy: 'relevance',
                sortOrder: 'desc',
                inStock: true,
              })}
              className="bg-green-600 hover:bg-green-700"
            >
              Browse All Products
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
