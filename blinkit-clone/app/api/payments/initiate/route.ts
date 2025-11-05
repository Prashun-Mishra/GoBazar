import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('💳 [Payment API] Initiating payment for order:', body.orderId)
    
    // Get auth token from request headers
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    const backendUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payments/initiate`
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify(body),
    })

    console.log('💳 [Payment API] Backend response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ [Payment API] Backend error:', errorData)
      return NextResponse.json(
        { success: false, error: errorData.error || 'Failed to initiate payment' },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('✅ [Payment API] Payment initiated successfully')

    return NextResponse.json(data)
  } catch (error) {
    console.error('💥 [Payment API] Exception:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
