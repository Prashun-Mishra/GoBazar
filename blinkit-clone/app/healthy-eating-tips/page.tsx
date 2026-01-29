import { Metadata } from "next"
import HealthyEatingTipsClient from "./healthy-eating-tips-client"

export const metadata: Metadata = {
  title: "Healthy Eating Tips | Go Bazaar - Nutrition Guide Pune",
  description: "Discover expert nutrition tips and healthy eating advice from GoBazaar. Learn about balanced meals, seasonal eating, meal planning, and nutrition myths for a healthier lifestyle.",
  keywords: ["healthy eating", "nutrition tips", "healthy diet pune", "meal planning", "seasonal eating", "nutrition guide"],
  alternates: {
    canonical: "/healthy-eating-tips",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Healthy Eating Tips | Go Bazaar",
    description: "Expert nutrition tips and healthy eating advice for a balanced lifestyle.",
    url: "https://www.gobazaar.in/healthy-eating-tips",
    siteName: "Go Bazaar",
    type: "article",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Healthy Eating Tips | Go Bazaar",
    description: "Expert nutrition tips and healthy eating advice for a balanced lifestyle.",
  },
}

export default function HealthyEatingTipsPage() {
  return <HealthyEatingTipsClient />
}
