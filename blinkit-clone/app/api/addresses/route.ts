import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/lib/api-config"

export async function GET(request: Request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value || cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Please login to view addresses' }, { status: 401 })
    }

    const response = await fetch(`${BACKEND_URL}/api/addresses`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch addresses from backend')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching addresses:', error)
    return NextResponse.json({ error: 'Failed to fetch addresses' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value || cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Please login to add address' }, { status: 401 })
    }

    const body = await request.json()

    const response = await fetch(`${BACKEND_URL}/api/addresses`, {
      method: 'POST',
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
    console.error('Error creating address:', error)
    return NextResponse.json({ error: 'Failed to create address' }, { status: 500 })
  }
}
