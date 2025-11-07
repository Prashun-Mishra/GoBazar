import { NextResponse } from "next/server"
import { BACKEND_URL } from "@/lib/api-config"

export async function GET() {
  try {
    console.log('Testing backend connection to:', BACKEND_URL)
    
    const response = await fetch(`${BACKEND_URL}/api/categories`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('Backend response status:', response.status)
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: `Backend not accessible: ${response.status} ${response.statusText}`,
        backendUrl: BACKEND_URL
      }, { status: 500 })
    }

    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      message: 'Backend is accessible',
      backendUrl: BACKEND_URL,
      categoriesCount: data.data?.length || 0,
      backendResponse: data
    })
  } catch (error) {
    console.error('Backend connection error:', error)
    return NextResponse.json({
      success: false,
      message: `Backend connection failed: ${error}`,
      backendUrl: BACKEND_URL
    }, { status: 500 })
  }
}
