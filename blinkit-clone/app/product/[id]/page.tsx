"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import { VariantSelector } from "@/components/variant-selector"
import { ProductHighlights } from "@/components/product-highlights"
import { Button } from "@/components/ui/button"
import { Star, Plus, Minus, Truck, DollarSign, Package } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/types"
import Link from "next/link"
import { SmartRecommendations } from "@/components/smart-recommendations"
import { formatProductDescription } from "@/lib/text-utils"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [topProducts, setTopProducts] = useState<Product[]>([])
  const [peopleBought, setPeopleBought] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const { items, addItem, updateQuantity } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        // Handle both old and new API response formats
        const products = data.products || data.data || data
        const productsArray = Array.isArray(products) ? products : []
        const currentProduct = productsArray.find((p: Product) => p.id === params.id)
        setProduct(currentProduct)

        if (currentProduct) {
          // Set default variant if available
          if (currentProduct.variants && currentProduct.variants.length > 0) {
            setSelectedVariant(currentProduct.variants[0].id)
          }

          // Get related products from same subcategory or category
          const related = productsArray
            .filter(
              (p: Product) =>
                (p.subcategoryId === currentProduct.subcategoryId || p.categoryId === currentProduct.categoryId) &&
                p.id !== currentProduct.id,
            )
            .slice(0, 8)
          setRelatedProducts(related)

          // Get top products in category
          const top = productsArray
            .filter((p: Product) => p.categoryId === currentProduct.categoryId && p.id !== currentProduct.id)
            .sort((a: Product, b: Product) => b.rating - a.rating)
            .slice(0, 8)
          setTopProducts(top)

          // Get people also bought (products with similar tags or random from different categories)
          const peopleBoughtProducts = productsArray
            .filter((p: Product) => p.categoryId !== currentProduct.categoryId)
            .sort(() => Math.random() - 0.5)
            .slice(0, 8)
          setPeopleBought(peopleBoughtProducts)
        }
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 aspect-square rounded-lg"></div>
              <div className="space-y-4">
                <div className="bg-gray-200 h-8 rounded w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                <div className="bg-gray-200 h-6 rounded w-1/4"></div>
                <div className="bg-gray-200 h-20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const cartItem = items.find((item) => item.productId === product.id && item.variantId === selectedVariant)
  const quantity = cartItem?.quantity || 0

  const handleAddToCart = () => {
    if (quantity === 0) {
      addItem(product.id, selectedVariant || undefined)
    } else {
      updateQuantity(product.id, quantity + 1, selectedVariant || undefined)
    }
  }

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1, selectedVariant || undefined)
    }
  }

  const currentPrice = selectedVariant
    ? product.variants?.find((v) => v.id === selectedVariant)?.price || product.price
    : product.price

  const currentMrp = selectedVariant
    ? product.variants?.find((v) => v.id === selectedVariant)?.mrp || product.mrp
    : product.mrp

  const discountPercent = Math.round(((currentMrp - currentPrice) / currentMrp) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/category/${product.categoryId}`} className="hover:text-gray-900 transition-colors">
            Category
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <ImageCarousel images={product.images} productName={product.name} />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2 text-balance">{product.name}</h1>
              <Link
                href={`/brand/${product.brand.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                {product.brand}
              </Link>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />
            )}

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">₹{currentPrice}</span>
                {currentMrp > currentPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">₹{currentMrp}</span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {selectedVariant ? product.variants?.find((v) => v.id === selectedVariant)?.unit : product.unit}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center space-x-4">
              {quantity === 0 ? (
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 text-base font-medium"
                >
                  Add to cart
                </Button>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={handleRemoveFromCart}
                    size="lg"
                    variant="outline"
                    className="w-12 h-12 p-0 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <span className="text-xl font-bold text-center min-w-[3rem]">{quantity}</span>
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    variant="outline"
                    className="w-12 h-12 p-0 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Key Selling Points */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Why shop from Go Bazar?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Superfast Delivery</h4>
                    <p className="text-xs text-gray-600">
                      Get your order delivered to your doorstep at the earliest from dark stores near you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Best Prices & Offers</h4>
                    <p className="text-xs text-gray-600">
                      Best price destination with offers directly from the manufacturers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Wide Assortment</h4>
                    <p className="text-xs text-gray-600">
                      Choose from 5000+ products across food, personal care, household & other categories.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Highlights */}
        {product.highlights && product.highlights.length > 0 && (
          <section className="mb-8">
            <ProductHighlights highlights={product.highlights} />
          </section>
        )}

        {/* Product Details */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h2>
          <div className="bg-white rounded-lg p-6 border">
            <div className="text-sm text-gray-700 leading-relaxed space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Description</h3>
                <div className={`prose prose-sm max-w-none ${showFullDescription ? "" : "line-clamp-3"}`}>
                  {formatProductDescription(product.description).map((paragraph, index) => (
                    <p key={index} className="mb-2 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {product.description.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-green-600 hover:text-green-700 text-sm font-medium mt-3 inline-flex items-center gap-1 transition-colors"
                  >
                    {showFullDescription ? "View less" : "View more details"}
                    <span className="text-xs">
                      {showFullDescription ? "↑" : "↓"}
                    </span>
                  </button>
                )}
              </div>

              {product.ingredients && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Ingredients</h3>
                  <div className="prose prose-sm max-w-none">
                    {product.ingredients.split('\n').map((line, index) => (
                      <p key={index} className="mb-1 text-gray-700 leading-relaxed">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {product.nutritionalInfo && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Nutritional Information</h3>
                  <div className="prose prose-sm max-w-none">
                    {product.nutritionalInfo.split('\n').map((line, index) => (
                      <p key={index} className="mb-1 text-gray-700 leading-relaxed">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {product.benefits && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Benefits</h3>
                  <div className="prose prose-sm max-w-none">
                    {product.benefits.split('\n').map((line, index) => (
                      <p key={index} className="mb-1 text-gray-700 leading-relaxed">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Similar products */}
        {relatedProducts.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Similar products</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="flex-shrink-0 w-40">
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Top 10 products in this category */}
        {topProducts.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Top 10 products in this category</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {topProducts.map((topProduct) => (
                <div key={topProduct.id} className="flex-shrink-0 w-40">
                  <ProductCard product={topProduct} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* People also bought */}
        {peopleBought.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">People also bought</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {peopleBought.map((boughtProduct) => (
                <div key={boughtProduct.id} className="flex-shrink-0 w-40">
                  <ProductCard product={boughtProduct} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Product-specific recommendations */}
        <div className="mt-12">
          <SmartRecommendations context="product" productId={params.id} categoryId={product?.categoryId} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
