"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  ShoppingCart,
  Truck,
  CreditCard,
  RotateCcw,
  User,
  Phone,
  Search
} from "lucide-react"

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const faqCategories = [
    {
      id: "ordering",
      title: "Ordering & Shopping",
      icon: ShoppingCart,
      faqs: [
        {
          id: "how-to-order",
          question: "How do I place an order on GoBazaar?",
          answer: "Simply browse our products, add items to cart, select delivery address, choose payment method, and confirm your order. You'll receive confirmation via SMS and email."
        },
        {
          id: "minimum-order",
          question: "Is there a minimum order value?",
          answer: "Yes, we have a minimum order value of ₹99 for free delivery. Orders below this amount may have delivery charges applied."
        },
        {
          id: "modify-order",
          question: "Can I modify my order after placing it?",
          answer: "You can modify your order within 2 minutes of placing it, provided it hasn't entered the 'billed' stage. Contact customer support immediately for assistance."
        },
        {
          id: "product-availability",
          question: "What if a product is out of stock?",
          answer: "If a product becomes unavailable after ordering, we'll notify you immediately and offer suitable alternatives or remove it from your order with appropriate refund."
        }
      ]
    },
    {
      id: "delivery",
      title: "Delivery & Shipping",
      icon: Truck,
      faqs: [
        {
          id: "delivery-time",
          question: "How fast is the delivery?",
          answer: "We deliver groceries in just 20 minutes across Pune! Our network of local stores and delivery partners ensures ultra-fast delivery to your doorstep."
        },
        {
          id: "delivery-areas",
          question: "Which areas do you deliver to?",
          answer: "We currently deliver to 30+ areas across Pune including Dapodi, Bopodi, Khadki, Shivajinagar, Aundh, Hinjewadi, Wakad, Kalyani Nagar, and many more."
        },
        {
          id: "delivery-charges",
          question: "Are there any delivery charges?",
          answer: "Delivery is free for orders above ₹99. For orders below this amount, a small delivery fee of ₹25 applies. Convenience & safety fees may also apply."
        },
        {
          id: "track-order",
          question: "How can I track my order?",
          answer: "You can track your order in real-time through our app or website. You'll receive live updates via SMS and can see your delivery partner's location."
        }
      ]
    },
    {
      id: "payment",
      title: "Payment & Billing",
      icon: CreditCard,
      faqs: [
        {
          id: "payment-methods",
          question: "What payment methods do you accept?",
          answer: "We accept UPI, credit/debit cards, net banking, digital wallets (Paytm, PhonePe, etc.), Sodexo meal cards, and Cash on Delivery (COD)."
        },
        {
          id: "payment-security",
          question: "Is my payment information secure?",
          answer: "Yes, all payments are processed through secure, encrypted gateways. We don't store your card details and comply with PCI DSS security standards."
        },
        {
          id: "failed-payment",
          question: "What if my payment fails?",
          answer: "If payment fails, you can retry with the same or different payment method. For failed transactions, refunds are processed within 5-7 working days."
        },
        {
          id: "invoice",
          question: "Will I receive an invoice?",
          answer: "Yes, you'll receive a digital invoice via email after order completion. You can also download invoices from your account's order history section."
        }
      ]
    },
    {
      id: "returns",
      title: "Returns & Refunds",
      icon: RotateCcw,
      faqs: [
        {
          id: "return-policy",
          question: "What is your return policy?",
          answer: "Most consumable items are non-returnable due to hygiene reasons, but can be returned at doorstep for quality issues within 24 hours. Durable items like electronics have 7-day return policy."
        },
        {
          id: "refund-time",
          question: "How long do refunds take?",
          answer: "Refund timelines vary by payment method: GoBazaar wallet (24-48 hours), UPI/IMPS (24-48 hours), Cards/Net banking (5-7 working days)."
        },
        {
          id: "damaged-items",
          question: "What if I receive damaged items?",
          answer: "Please report damaged items immediately at delivery or within 24 hours. We'll arrange immediate replacement or full refund as per your preference."
        },
        {
          id: "wrong-items",
          question: "What if I receive wrong items?",
          answer: "Contact us immediately if you receive wrong items. We'll arrange to collect the wrong items and deliver the correct ones at no extra charge."
        }
      ]
    },
    {
      id: "account",
      title: "Account & Profile",
      icon: User,
      faqs: [
        {
          id: "create-account",
          question: "Do I need to create an account to order?",
          answer: "Yes, you need to register with your mobile number to place orders. This helps us provide personalized service and order tracking."
        },
        {
          id: "forgot-password",
          question: "I forgot my password, what should I do?",
          answer: "We use OTP-based login system. Simply enter your mobile number and you'll receive an OTP to access your account securely."
        },
        {
          id: "update-profile",
          question: "How do I update my profile information?",
          answer: "Go to 'My Account' section in the app/website to update your name, email, addresses, and other profile information anytime."
        },
        {
          id: "delete-account",
          question: "Can I delete my account?",
          answer: "Yes, you can request account deletion by contacting customer support. Note that this will permanently remove all your data and order history."
        }
      ]
    }
  ]

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
                Find quick answers to common questions about GoBazaar services.
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try searching with different keywords or browse our categories below.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  {filteredFAQs.map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center mb-8">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <category.icon className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                      </div>
                      
                      <div className="space-y-4">
                        {category.faqs.map((faq) => (
                          <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
                            <button
                              onClick={() => toggleFAQ(faq.id)}
                              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                              {openFAQ === faq.id ? (
                                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              )}
                            </button>
                            
                            {openFAQ === faq.id && (
                              <div className="px-6 pb-4">
                                <div className="border-t pt-4">
                                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-green-100 mb-8">
                Can't find what you're looking for? Our customer support team is here to help you 24/7.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+917558658539"
                  className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call +91 7558658539
                </a>
                <a
                  href="mailto:info@gobazaar.in"
                  className="inline-flex items-center bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
