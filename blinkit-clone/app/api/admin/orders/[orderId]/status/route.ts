import { NextRequest, NextResponse } from 'next/server'
import { BACKEND_URL } from '@/lib/api-config'

export async function PUT(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params
    const body = await request.json()
    
    console.log('📊 [Admin Order Status API] Updating order:', { orderId, status: body.status })
    
    // Get auth token from request headers
    const authHeader = request.headers.get('authorization')
    console.log('📊 [Admin Order Status API] Auth header:', !!authHeader)
    
    const backendUrl = `${BACKEND_URL}/api/orders/admin/${orderId}/status`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Forward auth token if present
    if (authHeader) {
      headers['Authorization'] = authHeader
    }
    
    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    })

    console.log('📊 [Admin Order Status API] Backend response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ [Admin Order Status API] Backend error:', errorData)
      return NextResponse.json(
        { success: false, error: errorData.message || 'Failed to update order status' },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('✅ [Admin Order Status API] Order status updated successfully')

    return NextResponse.json(data)
  } catch (error) {
    console.error('💥 [Admin Order Status API] Exception:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
