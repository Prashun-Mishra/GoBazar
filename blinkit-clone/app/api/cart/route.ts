import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

export async function GET(request: Request) {
  try {
    console.log('🛒 [Cart API] GET request received')
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value || cookieStore.get('token')?.value

    console.log('🔑 [Cart API] Token found:', !!token)

    if (!token) {
      console.log('👤 [Cart API] Guest user, returning empty cart')
      // Return empty cart for guest users
      return NextResponse.json({ success: true, data: [] })
    }

    const backendUrl = `${BACKEND_URL}/api/cart`
    console.log('🌐 [Cart API] Calling backend:', backendUrl)

    const response = await fetch(backendUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    console.log('📊 [Cart API] Backend response status:', response.status)

    if (!response.ok) {
      throw new Error('Failed to fetch cart from backend')
    }

    const data = await response.json()
    console.log('✅ [Cart API] Cart fetched, items:', data?.data?.length || 0)
    return NextResponse.json(data)
  } catch (error) {
    console.error('💥 [Cart API] Exception:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    console.log('🛒 [Cart API] POST request received')
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value || cookieStore.get('token')?.value

    console.log('🔑 [Cart API] Token found:', !!token)

    if (!token) {
      console.log('❌ [Cart API] No token, user not logged in')
      return NextResponse.json({ error: 'Please login to add items to cart' }, { status: 401 })
    }

    const body = await request.json()
    console.log('📦 [Cart API] Request body:', JSON.stringify(body, null, 2))
    console.log('📦 [Cart API] Body types:', {
      productId: typeof body.productId,
      variantId: typeof body.variantId,
      quantity: typeof body.quantity,
      quantityValue: body.quantity
    })

    // Backend expects /api/cart/add for POST
    const backendUrl = `${BACKEND_URL}/api/cart/add`
    console.log('🌐 [Cart API] Calling backend:', backendUrl)

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    console.log('📊 [Cart API] Backend response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ [Cart API] Backend error:', JSON.stringify(errorData, null, 2))
      console.error('❌ [Cart API] Full response:', errorData)
      return NextResponse.json(errorData, { status: response.status })
    }

    const data = await response.json()
    console.log('✅ [Cart API] Success:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('💥 [Cart API] Exception:', error)
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value || cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Please login to update cart' }, { status: 401 })
    }

    const body = await request.json()

    const response = await fetch(`${BACKEND_URL}/api/cart`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(errorData, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value || cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Please login to remove items' }, { status: 401 })
    }

    const body = await request.json()

    const response = await fetch(`${BACKEND_URL}/api/cart`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(errorData, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error removing from cart:', error)
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 })
  }
}
