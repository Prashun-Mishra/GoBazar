import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user is accessing admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login?redirect=/admin", request.url))
    }

    // In a real app, you'd verify the token and check admin role
    // For demo purposes, we'll assume valid token means admin access
  }

  // Protect user-specific routes
  if (pathname.startsWith("/profile") || pathname.startsWith("/orders") || pathname.startsWith("/wishlist")) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login?redirect=" + pathname, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/orders/:path*", "/wishlist/:path*"],
}
