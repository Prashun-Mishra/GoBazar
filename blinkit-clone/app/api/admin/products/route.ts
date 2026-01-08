import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/lib/api-config"

export async function GET(request: Request) {
  try {
    // Try to get token from Authorization header or cookies
    const authHeader = request.headers.get('Authorization')
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get('token')?.value

    const token = authHeader?.replace('Bearer ', '') || cookieToken

    // Try admin endpoint first
    let response = await fetch(`${BACKEND_URL}/api/admin/products`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
        'Content-Type': 'application/json',
      },
    })

    // If admin endpoint fails or returns empty, fallback to public products API
    if (!response.ok) {
      console.log('Admin endpoint failed, falling back to public products API')
      response = await fetch(`${BACKEND_URL}/api/products?limit=2000`)
    }

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(errorData, { status: response.status })
    }

    const data = await response.json()

    // Normalize response format - handle both admin and public API formats
    const products = data.products || data.data || []
    return NextResponse.json({ data: products })
  } catch (error) {
    console.error('Error fetching admin products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    console.log('📝 Admin Products POST - Creating new product')

    // Try to get token from Authorization header or cookies
    const authHeader = request.headers.get('Authorization')
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get('token')?.value

    const token = authHeader?.replace('Bearer ', '') || cookieToken
    console.log('🔑 Token present:', token ? 'Yes' : 'No')

    const body = await request.json()
    console.log('📦 Product data received:', {
      name: body.name,
      categoryId: body.categoryId,
      subcategoryId: body.subcategoryId,
      price: body.price,
      stock: body.stock
    })

    // Validate required fields
    if (!body.name || !body.categoryId || !body.price || !body.mrp) {
      console.error('❌ Missing required fields')
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: name, categoryId, price, mrp'
      }, { status: 400 })
    }

    const backendUrl = `${BACKEND_URL}/api/admin/products`
    console.log('🌐 Sending to backend:', backendUrl)

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    console.log('📡 Backend response status:', response.status)

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        errorData = { message: await response.text() }
      }
      console.error('❌ Backend error:', errorData)
      return NextResponse.json(errorData, { status: response.status })
    }

    const data = await response.json()
    console.log('✅ Product created successfully:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('❌ Error creating product:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create product',
      message: (error as Error).message
    }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    // Try to get token from Authorization header or cookies
    const authHeader = request.headers.get('Authorization')
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get('token')?.value

    const token = authHeader?.replace('Bearer ', '') || cookieToken

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const response = await fetch(`${BACKEND_URL}/api/admin/products`, {
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
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    // Try to get token from Authorization header or cookies
    const authHeader = request.headers.get('Authorization')
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get('token')?.value

    const token = authHeader?.replace('Bearer ', '') || cookieToken

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('id')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    const response = await fetch(`${BACKEND_URL}/api/admin/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(errorData, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
