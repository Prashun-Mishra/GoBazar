"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronRight, Filter, SlidersHorizontal, Loader2 } from "lucide-react"
import type { Category, SubCategory, Product } from "@/types"

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [category, setCategory] = useState<Category | null>(null)
  const [subcategories, setSubcategories] = useState<SubCategory[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [sortBy, setSortBy] = useState("popularity")
  const [showFilters, setShowFilters] = useState(false)
  const [activeSubcategory, setActiveSubcategory] = useState<string>("")

  // Pagination state
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const LIMIT = 20

  // Fetch category and subcategories initially
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true)
        // Fetch category details
        const categoriesResponse = await fetch("/api/categories")
        const categoriesResult = await categoriesResponse.json()
        const categories = categoriesResult.data || categoriesResult
        const currentCategory = Array.isArray(categories) ? categories.find((cat: Category) => cat.slug === params.slug) : null
        setCategory(currentCategory)

        if (currentCategory) {
          // Fetch subcategories
          const subcategoriesResponse = await fetch("/api/subcategories")
          const subcategoriesResult = await subcategoriesResponse.json()
          const allSubcategories = subcategoriesResult.data || subcategoriesResult
          const categorySubcategories = Array.isArray(allSubcategories) ? allSubcategories.filter(
            (sub: SubCategory) => sub.categoryId === currentCategory.id,
          ) : []
          setSubcategories(categorySubcategories)

          // Set active subcategory from URL or default to first
          const subParam = searchParams.get("sub")
          const activeSubcat = subParam
            ? categorySubcategories.find((sub: SubCategory) => sub.slug === subParam)?.id || ""
            : ""
          setActiveSubcategory(activeSubcat)
        }
      } catch (error) {
        console.error("Failed to fetch category data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryData()
  }, [params.slug])

  // Fetch products when category, subcategory, or page changes
  const fetchProducts = useCallback(async (isLoadMore = false) => {
    if (!category) return

    try {
      if (isLoadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      const queryParams = new URLSearchParams()
      queryParams.append('category', category.id)

      if (activeSubcategory) {
        queryParams.append('subcategory', activeSubcategory)
      }

      queryParams.append('page', isLoadMore ? (page + 1).toString() : '1')
      queryParams.append('limit', LIMIT.toString())
      queryParams.append('sortBy', sortBy)

      const response = await fetch(`/api/products?${queryParams.toString()}`)
      const data = await response.json()
      const newProducts = data.products || data.data || []

      if (isLoadMore) {
        setProducts(prev => [...prev, ...newProducts])
        setPage(prev => prev + 1)
      } else {
        setProducts(newProducts)
        setPage(1)
      }

      setHasMore(newProducts.length === LIMIT)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [category, activeSubcategory, subcategories, sortBy, page])

  // Trigger fetch when dependencies change (excluding page, which is handled by load more)
  useEffect(() => {
    if (category) {
      fetchProducts(false)
    }
  }, [category, activeSubcategory, sortBy])

  // Handle subcategory change from URL
  useEffect(() => {
    const subParam = searchParams.get("sub")
    if (subcategories.length > 0) {
      const activeSubcat = subParam
        ? subcategories.find((sub: SubCategory) => sub.slug === subParam)?.id || ""
        : ""
      if (activeSubcat !== activeSubcategory) {
        setActiveSubcategory(activeSubcat)
      }
    }
  }, [searchParams, subcategories])

  const handleSubcategoryChange = (subcategoryId: string) => {
    setActiveSubcategory(subcategoryId)
    const subcategory = subcategories.find((sub) => sub.id === subcategoryId)
    if (subcategory) {
      router.push(`/category/${params.slug}?sub=${subcategory.slug}`)
    } else {
      router.push(`/category/${params.slug}`)
    }
  }

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchProducts(true)
    }
  }

  const activeSubcategoryData = subcategories.find((sub) => sub.id === activeSubcategory)

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="flex">
              <div className="w-64 bg-gray-200 rounded h-96 mr-6"></div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <div className="bg-gray-200 aspect-square rounded mb-3"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!category && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
            <p className="text-gray-600">The category you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{category?.name}</span>
          {activeSubcategoryData && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">{activeSubcategoryData.name}</span>
            </>
          )}
        </nav>

        {/* Mobile Subcategory Tabs */}
        <div className="md:hidden mb-6">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            <button
              onClick={() => handleSubcategoryChange("")}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 ${!activeSubcategory
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-200"
                }`}
            >
              All
            </button>
            {subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() => handleSubcategoryChange(subcategory.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 ${activeSubcategory === subcategory.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
                  }`}
              >
                {subcategory.image && (
                  <div className="w-6 h-6 relative rounded-full overflow-hidden bg-white">
                    <Image
                      src={subcategory.image}
                      alt={subcategory.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                {subcategory.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">{category?.name}</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleSubcategoryChange("")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between group ${!activeSubcategory
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <span className="font-medium">All Products</span>
                </button>
                {subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => handleSubcategoryChange(subcategory.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between group ${activeSubcategory === subcategory.id
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {subcategory.image && (
                        <div className={`w-10 h-10 relative rounded-full overflow-hidden border ${activeSubcategory === subcategory.id ? "border-green-200" : "border-gray-100"
                          }`}>
                          <Image
                            src={subcategory.image}
                            alt={subcategory.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      <span className="font-medium">{subcategory.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {activeSubcategoryData ? activeSubcategoryData.name : category?.name}
              </h1>
              <p className="text-gray-600">
                {products.length} products shown {hasMore && '(more available)'}
              </p>
            </div>

            {/* Sort and Filter Bar */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Price
                  </Button>
                  <Button variant="outline" size="sm">
                    Brand
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="bg-white rounded-lg border p-4 mb-6">
                <h3 className="font-medium mb-4">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Price Range</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Under ₹50</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">₹50 - ₹100</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Above ₹100</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      variant="outline"
                      className="flex items-center space-x-2 min-w-[150px]"
                    >
                      {loadingMore ? (
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
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try selecting a different subcategory or adjusting your filters.</p>
              </div>
            )}

            {/* SEO Content Section */}
            {activeSubcategoryData && (
              <div className="bg-white rounded-lg border p-6 mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About {activeSubcategoryData.name}</h2>
                <p className="text-gray-600 mb-4">
                  {activeSubcategoryData.description ||
                    `Discover our wide range of ${activeSubcategoryData.name.toLowerCase()} products. We offer the best quality items at competitive prices with fast delivery.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
