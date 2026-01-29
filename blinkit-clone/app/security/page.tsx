import { Metadata } from "next"
import SecurityClient from "./security-client"

export const metadata: Metadata = {
  title: "Security & Safety | Go Bazaar - Data Protection",
  description: "Learn about GoBazaar's security measures, data encryption, secure payments, privacy protection, and safety practices for secure online grocery shopping in Pune.",
  keywords: ["security", "data protection", "secure payments", "privacy", "safe shopping pune", "encrypted transactions"],
  alternates: {
    canonical: "/security",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Security & Safety | Go Bazaar",
    description: "Your security is our priority. Learn about our data protection practices.",
    url: "https://www.gobazaar.in/security",
    siteName: "Go Bazaar",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Security & Safety | Go Bazaar",
    description: "Your security is our priority. Learn about our data protection practices.",
  },
}

export default function SecurityPage() {
  return <SecurityClient />
}
