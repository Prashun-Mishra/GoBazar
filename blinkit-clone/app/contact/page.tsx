import { Metadata } from "next"
import ContactClient from "./contact-client"

export const metadata: Metadata = {
  title: "Contact Us | Go Bazar - Customer Support & Help",
  description: "Get in touch with Go Bazar customer support. We are available 24/7 to help you with your grocery orders, delivery, and feedback.",
  openGraph: {
    title: "Contact Us | Go Bazar",
    description: "Get in touch with Go Bazar customer support. We are available 24/7.",
  }
}

export default function ContactPage() {
  return <ContactClient />
}
