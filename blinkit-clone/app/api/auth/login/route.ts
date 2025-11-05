import { type NextRequest, NextResponse } from "next/server"

// This route now redirects to backend - frontend should call backend directly
// This is kept for compatibility but should not be used
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Proxy to backend server
    const response = await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 },
    )
  }
}
