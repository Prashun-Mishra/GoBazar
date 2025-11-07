import { NextRequest, NextResponse } from 'next/server'
import { BACKEND_URL } from '@/lib/api-config'

export async function GET(request: NextRequest) {
  try {
    console.log('📊 [Admin Orders API] Fetching all orders')
    
    // Get auth token from request headers
    const authHeader = request.headers.get('authorization')
    console.log('📊 [Admin Orders API] Auth header:', !!authHeader)
    
    const backendUrl = `${BACKEND_URL}/api/orders/admin/all`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Forward auth token if present
    if (authHeader) {
      headers['Authorization'] = authHeader
    }
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers,
    })

    console.log('📊 [Admin Orders API] Backend response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ [Admin Orders API] Backend error:', errorData)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch orders' },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('✅ [Admin Orders API] Orders fetched:', data.data?.length || 0)

    return NextResponse.json(data)
  } catch (error) {
    console.error('💥 [Admin Orders API] Exception:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
