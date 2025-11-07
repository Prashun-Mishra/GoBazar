import { NextRequest, NextResponse } from 'next/server'
import { BACKEND_URL } from '@/lib/api-config'

export async function POST(request: NextRequest) {
  try {
    const { productIds } = await request.json()
    
    console.log('🛒 [Cart Products API] Fetching products for cart:', productIds)
    
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ success: true, data: [] })
    }
    
    const backendUrl = `${BACKEND_URL}/api/products/bulk`
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productIds }),
    })

    console.log('🛒 [Cart Products API] Backend response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ [Cart Products API] Backend error:', errorData)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch cart products' },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('✅ [Cart Products API] Products fetched:', data.data?.length || 0)

    return NextResponse.json(data)
  } catch (error) {
    console.error('💥 [Cart Products API] Exception:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
