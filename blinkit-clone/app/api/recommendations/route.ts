import { type NextRequest, NextResponse } from "next/server"
import { BACKEND_URL } from "@/lib/api-config"

// Simulate user behavior data
const userBehavior = {
  views: new Map<string, string[]>(), // userId -> productIds
  purchases: new Map<string, string[]>(), // userId -> productIds
  ratings: new Map<string, Map<string, number>>(), // userId -> productId -> rating
}

// Initialize some mock behavior data
userBehavior.views.set("user1", ["1", "2", "3", "15", "20"])
userBehavior.purchases.set("user1", ["1", "5", "10"])
userBehavior.ratings.set(
  "user1",
  new Map([
    ["1", 5],
    ["5", 4],
    ["10", 5],
  ]),
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "popular"
    const limit = searchParams.get("limit") || "6"
    const productId = searchParams.get("productId")
    const categoryId = searchParams.get("categoryId")
    const userId = searchParams.get("userId")

    // Build query parameters for backend
    const queryParams = new URLSearchParams()
    queryParams.append('type', type)
    queryParams.append('limit', limit)
    if (productId) queryParams.append('productId', productId)
    if (categoryId) queryParams.append('categoryId', categoryId)
    if (userId) queryParams.append('userId', userId)

    const response = await fetch(`${BACKEND_URL}/api/recommendations?${queryParams.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations from backend')
    }

    const data = await response.json()
    return NextResponse.json(data.data || data)
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    
    // Fallback to simple logic if backend is not available
    try {
      const productsData = require('@/data/seed/products.json')
      const { searchParams } = new URL(request.url)
      const limit = Number.parseInt(searchParams.get("limit") || "6")
      
      // Simple fallback: return highest rated products
      const recommendations = productsData
        .sort((a: any, b: any) => b.rating - a.rating)
        .slice(0, limit)
      
      return NextResponse.json(recommendations)
    } catch (seedError) {
      return NextResponse.json(
        { error: 'Failed to fetch recommendations' },
        { status: 500 }
      )
    }
  }
}
