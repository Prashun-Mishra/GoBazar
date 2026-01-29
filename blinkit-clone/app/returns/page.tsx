import { Metadata } from "next"
import ReturnsClient from "./returns-client"

export const metadata: Metadata = {
  title: "Return Policy | Go Bazaar - Easy Returns & Refunds",
  description: "GoBazaar's return policy explained. Learn about returnable and non-returnable items, return conditions, timelines, and how to initiate returns for your grocery orders in Pune.",
  keywords: ["gobazaar returns", "return policy", "refund policy", "grocery returns", "pune grocery refund"],
  alternates: {
    canonical: "/returns",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Return Policy | Go Bazaar",
    description: "Learn about GoBazaar's return policy, returnable items, and refund process.",
    url: "https://www.gobazaar.in/returns",
    siteName: "Go Bazaar",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Return Policy | Go Bazaar",
    description: "Learn about GoBazaar's return policy, returnable items, and refund process.",
  },
}

export default function ReturnsPage() {
  return <ReturnsClient />
}
