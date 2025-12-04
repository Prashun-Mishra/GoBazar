"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronRight, Filter, SlidersHorizontal, Loader2 } from "lucide-react"
import type { Product } from "@/types"

export default function BrandClient({ brandSlug }: { brandSlug: string }) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [sortBy, setSortBy] = useState("popularity")
    const [showFilters, setShowFilters] = useState(false)

    // Pagination state
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const LIMIT = 20

    const brandName = decodeURIComponent(brandSlug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

    // Fetch products when brand or page changes
    const fetchProducts = useCallback(async (isLoadMore = false) => {
        try {
            if (isLoadMore) {
                setLoadingMore(true)
            } else {
                setLoading(true)
            }

            const queryParams = new URLSearchParams()
            // Use the slug directly or formatted name depending on how strict the backend search is.
            // Since backend uses 'contains', 'yojana' from 'yojana' slug works for 'Yojana Poultry'.
            // But 'yojana-poultry' might fail if brand is 'Yojana Poultry'.
            // Safest bet is to replace hyphens with spaces for the search.
            queryParams.append('brand', brandSlug.replace(/-/g, ' '))

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
    }, [brandSlug, sortBy, page])

    // Trigger fetch when dependencies change (excluding page, which is handled by load more)
    useEffect(() => {
        fetchProducts(false)
    }, [brandSlug, sortBy])

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            fetchProducts(true)
        }
    }

    if (loading && products.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, index) => (
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
                    <span className="text-gray-900">Brand</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900">{brandName}</span>
                </nav>

                <div className="flex gap-6">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Brand Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                {brandName}
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
                                <p className="text-gray-600">We couldn't find any products for this brand.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
