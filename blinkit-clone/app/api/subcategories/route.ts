import { NextResponse } from "next/server"
import { BACKEND_URL } from "@/lib/api-config"

// Disable caching for this API route

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    
    console.log('🔍 Subcategories API called with categoryId:', categoryId)

    // Build query parameters for backend
    const queryParams = new URLSearchParams()
    if (categoryId) queryParams.append('categoryId', categoryId)
    
    const backendUrl = `${BACKEND_URL}/api/subcategories?${queryParams.toString()}`
    console.log('🔍 Fetching from backend URL:', backendUrl)

    const response = await fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    console.log('🔍 Backend response status:', response.status)

    if (!response.ok) {
      console.error('❌ Backend subcategories error:', response.status, response.statusText)
      throw new Error('Failed to fetch subcategories from backend')
    }

    const data = await response.json()
    console.log('🔍 Backend subcategories response:', {
      success: data.success,
      dataType: typeof data.data,
      dataLength: data.data?.length,
      firstItem: data.data?.[0],
      message: data.message
    })
    
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('❌ Subcategories API error:', error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch subcategories",
        error: (error as Error).message
      },
      { status: 500 },
    )
  }
}
