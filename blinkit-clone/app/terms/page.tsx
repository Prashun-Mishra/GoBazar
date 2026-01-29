import { Metadata } from "next"
import TermsClient from "./terms-client"

export const metadata: Metadata = {
  title: "Terms and Conditions | Go Bazaar - Online Grocery Pune",
  description: "Read GoBazaar's terms and conditions for using our online grocery delivery service in Pune. Understand your rights, responsibilities, eligibility, and our policies.",
  keywords: ["gobazaar terms", "terms and conditions", "grocery terms of use", "pune grocery terms", "online grocery policies"],
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms and Conditions | Go Bazaar",
    description: "Read GoBazaar's terms and conditions for using our online grocery delivery service in Pune.",
    url: "https://www.gobazaar.in/terms",
    siteName: "Go Bazaar",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Terms and Conditions | Go Bazaar",
    description: "Read GoBazaar's terms and conditions for using our online grocery delivery service in Pune.",
  },
}

export default function TermsPage() {
  return <TermsClient />
}
