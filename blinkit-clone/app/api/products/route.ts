import { NextResponse } from "next/server"
import { BACKEND_URL } from "@/lib/api-config"

// Category slug mapping for backend compatibility
const categorySlugMapping: Record<string, string> = {
  'dairy-breakfast': 'dairy-breakfast',
  'munchies': 'munchies',
  'paan-corner': 'paan-corner',
  'cold-drinks-juices': 'cold-drinks-juices',
  'sweet-tooth': 'sweet-tooth',
  'vegetables-fruits': 'vegetables-fruits',
  'tea-coffee-health-drinks': 'tea-coffee-health-drinks',
  'bakery-biscuits': 'bakery-biscuits',
  'breakfast-instant-food': 'breakfast-instant-food',
  'atta-rice-dal': 'atta-rice-dal',
  'masala-oil-more': 'masala-oil-more',
  'sauces-spreads': 'sauces-spreads',
  'chicken-meat-fish': 'chicken-meat-fish',
  'organic-healthy-living': 'organic-healthy-living',
  'baby-care': 'baby-care',
  'pharma-wellness': 'pharma-wellness',
  'cleaning-essentials': 'cleaning-essentials',
  'home-office': 'home-office',
  'personal-care': 'personal-care',
  'pet-care': 'pet-care'
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || searchParams.get("categoryId")
    const subcategory = searchParams.get("subcategory") || searchParams.get("subcategoryId")
    const search = searchParams.get("search")
    const limit = searchParams.get("limit") || "50"
    const page = searchParams.get("page") || "1"
    const sortBy = searchParams.get("sortBy")
    const sortOrder = searchParams.get("sortOrder")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    // Build query parameters for backend
    const queryParams = new URLSearchParams()

    // Map category slug if needed
    const mappedCategory = category ? (categorySlugMapping[category] || category) : null
    if (category && mappedCategory !== category) {
      console.log(`🔄 [Products API] Mapped category: ${category} → ${mappedCategory}`)
    }
    if (mappedCategory) queryParams.append('category', mappedCategory)
    if (subcategory) queryParams.append('subcategory', subcategory)
    if (search) queryParams.append('search', search)
    queryParams.append('limit', limit)
    queryParams.append('page', page)
    if (sortBy) queryParams.append('sortBy', sortBy)
    if (sortOrder) queryParams.append('sortOrder', sortOrder)
    if (minPrice) queryParams.append('minPrice', minPrice)
    if (maxPrice) queryParams.append('maxPrice', maxPrice)

    const backendUrl = `${BACKEND_URL}/api/products?${queryParams.toString()}`
    console.log(`🔍 [Products API] Fetching from backend: ${backendUrl}`)

    const response = await fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ [Products API] Backend error ${response.status}:`, errorText)

      // Return empty results instead of throwing error
      return NextResponse.json({
        products: [],
        total: 0,
        hasMore: false,
        page: 1,
        totalPages: 1,
        error: `Backend returned ${response.status}: ${errorText}`
      })
    }

    const data = await response.json()

    // Backend can return data in two formats:
    // 1. { data: [...], total, page, ... } - old format
    // 2. { products: [...], pagination: { total, page, ... } } - new format
    const products = data.data || data.products || []
    const pagination = data.pagination || {}
    const total = pagination.total || data.total || 0
    const page = pagination.page || data.page || 1
    const totalPages = pagination.totalPages || data.totalPages || 1
    const limit = pagination.limit || data.limit || 50

    console.log(`✅ [Products API] Backend response:`, {
      productsCount: products.length,
      total,
      page,
      format: data.pagination ? 'new (with pagination)' : 'old (flat)'
    })

    // Calculate hasMore
    const hasMore = page < totalPages || products.length >= limit

    // Transform backend response to match frontend expectations
    return NextResponse.json({
      products,
      total,
      hasMore,
      page,
      totalPages,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
