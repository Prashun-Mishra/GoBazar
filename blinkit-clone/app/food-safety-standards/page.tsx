import { Metadata } from "next"
import FoodSafetyClient from "./food-safety-client"

export const metadata: Metadata = {
  title: "Food Safety Standards | Go Bazaar - Quality & Hygiene",
  description: "Learn about GoBazaar's comprehensive food safety standards, FSSAI certification, quality testing protocols, and hygiene practices ensuring fresh and safe grocery delivery in Pune.",
  keywords: ["food safety", "FSSAI certified", "quality standards", "hygiene practices", "safe grocery delivery pune"],
  alternates: {
    canonical: "/food-safety-standards",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Food Safety Standards | Go Bazaar",
    description: "Our comprehensive food safety standards ensure fresh and safe grocery delivery.",
    url: "https://www.gobazaar.in/food-safety-standards",
    siteName: "Go Bazaar",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Food Safety Standards | Go Bazaar",
    description: "Our comprehensive food safety standards ensure fresh and safe grocery delivery.",
  },
}

export default function FoodSafetyStandardsPage() {
  return <FoodSafetyClient />
}
