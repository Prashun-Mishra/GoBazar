import { Metadata } from "next"
import FAQClient from "./faq-client"

export const metadata: Metadata = {
  title: "FAQ | Go Bazaar - Frequently Asked Questions",
  description: "Find answers to common questions about GoBazaar's online grocery delivery service in Pune. Get help with ordering, delivery, payments, returns, and account issues.",
  keywords: ["gobazaar faq", "frequently asked questions", "grocery help", "order help pune", "delivery questions"],
  alternates: {
    canonical: "/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FAQ | Go Bazaar - Frequently Asked Questions",
    description: "Find answers to common questions about GoBazaar's online grocery delivery in Pune.",
    url: "https://www.gobazaar.in/faq",
    siteName: "Go Bazaar",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "FAQ | Go Bazaar",
    description: "Find answers to common questions about GoBazaar's online grocery delivery in Pune.",
  },
}

export default function FAQPage() {
  return <FAQClient />
}
