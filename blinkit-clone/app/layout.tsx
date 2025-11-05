import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { LocationProvider } from "@/contexts/location-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { ErrorBoundary } from "@/components/error-boundary"
import { LocationModal } from "@/components/location/location-modal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Go Bazar - Grocery Delivery in Minutes",
  description: "Get groceries delivered in minutes. Fresh fruits, vegetables, dairy, and more.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <LocationProvider>
              <CartProvider>
                {children}
                <CartSidebar />
                <LocationModal />
              </CartProvider>
            </LocationProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
