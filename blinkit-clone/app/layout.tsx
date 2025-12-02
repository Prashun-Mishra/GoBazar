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
  title: {
    default: "Go Bazaar - Grocery Delivery in Pune | Fresh & Fast",
    template: "%s | Go Bazaar Pune"
  },
  metadataBase: new URL('https://www.gobazaar.in'),
  alternates: {
    canonical: '/',
  },
  description: "Order fresh groceries online in Pune. Get fruits, vegetables, dairy, and daily essentials delivered to your doorstep in minutes. Best grocery delivery service in Pune.",
  keywords: ["grocery delivery pune", "online grocery pune", "fresh vegetables pune", "fruits delivery pune", "dairy products pune", "instant grocery delivery", "go bazaar pune", "online supermarket pune"],
  authors: [{ name: "Go Bazaar Team" }],
  creator: "Go Bazaar",
  publisher: "Go Bazaar",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.gobazaar.in",
    siteName: "Go Bazaar",
    title: "Go Bazaar - Grocery Delivery in Pune | Fresh & Fast",
    description: "Order fresh groceries online in Pune. Get fruits, vegetables, dairy, and daily essentials delivered to your doorstep in minutes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Go Bazaar - Pune's Favorite Online Grocery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Go Bazaar - Grocery Delivery in Pune | Fresh & Fast",
    description: "Order fresh groceries online in Pune. Get fruits, vegetables, dairy, and daily essentials delivered to your doorstep in minutes.",
    images: ["/og-image.jpg"],
    creator: "@gobazaar",
  },
  generator: 'v0.app',
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Pune",
    "geo.position": "18.5204;73.8567",
    "ICBM": "18.5204, 73.8567"
  },
  verification: {
    google: "WyaUGB6oXqF714ahxSAXDgrdUbaiVnDccsjZ1HRNLQo",
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  "name": "Go Bazar",
  "image": "https://www.gobazaar.in/og-image.jpg",
  "@id": "https://www.gobazaar.in",
  "url": "https://www.gobazaar.in",
  "telephone": "+91-1234567890",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Main Street, Pune",
    "addressLocality": "Pune",
    "addressRegion": "MH",
    "postalCode": "411001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.5204,
    "longitude": 73.8567
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.facebook.com/gobazaar",
    "https://www.instagram.com/gobazaar",
    "https://twitter.com/gobazaar"
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
