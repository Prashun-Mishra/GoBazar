import { Metadata } from "next"
import PrivacyClient from "./privacy-client"

export const metadata: Metadata = {
  title: "Privacy Policy | Go Bazaar - Online Grocery Pune",
  description: "Read GoBazaar's privacy policy. Learn how we collect, use, store, and protect your personal information when using our online grocery delivery service in Pune.",
  keywords: ["gobazaar privacy", "privacy policy", "data protection", "personal information", "pune grocery privacy"],
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | Go Bazaar",
    description: "Learn how GoBazaar collects, uses, and protects your personal information.",
    url: "https://www.gobazaar.in/privacy",
    siteName: "Go Bazaar",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Go Bazaar",
    description: "Learn how GoBazaar collects, uses, and protects your personal information.",
  },
}

export default function PrivacyPage() {
  return <PrivacyClient />
}
