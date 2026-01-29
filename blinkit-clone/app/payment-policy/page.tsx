import { Metadata } from "next"
import PaymentPolicyClient from "./payment-policy-client"

export const metadata: Metadata = {
  title: "Payment & Refund Policy | Go Bazaar - Payment Methods Pune",
  description: "GoBazaar's payment policy covering accepted payment methods, order cancellation, returns, refunds, cashback offers, and UPI/Sodexo card payments for grocery delivery in Pune.",
  keywords: ["payment policy", "refund policy", "grocery payment pune", "cashback offers", "UPI payment", "cod grocery"],
  alternates: {
    canonical: "/payment-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Payment & Refund Policy | Go Bazaar",
    description: "Learn about payment methods, cancellation, and refund policies at GoBazaar.",
    url: "https://www.gobazaar.in/payment-policy",
    siteName: "Go Bazaar",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Payment & Refund Policy | Go Bazaar",
    description: "Learn about payment methods, cancellation, and refund policies at GoBazaar.",
  },
}

export default function PaymentPolicyPage() {
  return <PaymentPolicyClient />
}
