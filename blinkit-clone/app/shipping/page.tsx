import { Metadata } from "next"
import ShippingClient from "./shipping-client"

export const metadata: Metadata = {
  title: "Become a Delivery Partner | Go Bazaar - Delivery Jobs in Pune",
  description: "Join GoBazaar as a delivery partner. Enjoy flexible hours, competitive earnings, and instant payouts. Become a delivery partner for Pune's fastest grocery delivery service.",
  keywords: ["gobazaar delivery partner", "delivery jobs pune", "grocery delivery jobs", "delivery partner pune", "join gobazaar"],
  alternates: {
    canonical: "/shipping",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Become a Delivery Partner | Go Bazaar",
    description: "Join GoBazaar as a delivery partner. Enjoy flexible hours and competitive earnings.",
    url: "https://www.gobazaar.in/shipping",
    siteName: "Go Bazaar",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Become a Delivery Partner | Go Bazaar",
    description: "Join GoBazaar as a delivery partner. Enjoy flexible hours and competitive earnings.",
  },
}

export default function ShippingPage() {
  return <ShippingClient />
}
