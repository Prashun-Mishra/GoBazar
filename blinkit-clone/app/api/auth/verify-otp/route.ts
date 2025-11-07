import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/lib/api-config"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    // If successful and we have a token, set it as a cookie
    if (data.data?.token) {
      const cookieStore = cookies()
      cookieStore.set('token', data.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
  }
}
