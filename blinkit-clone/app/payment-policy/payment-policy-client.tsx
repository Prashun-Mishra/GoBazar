"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  CreditCard,
  RefreshCw,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Wallet,
  Smartphone,
  Gift,
  ArrowRight,
  Calendar,
  DollarSign
} from "lucide-react"

export default function PaymentPolicyClient() {
  const sections = [
    { id: "cancellation", title: "Order Cancellation", icon: XCircle },
    { id: "returns", title: "Returns & Refunds", icon: RefreshCw },
    { id: "timelines", title: "Return Timelines", icon: Clock },
    { id: "refund-methods", title: "Refund Methods", icon: CreditCard },
    { id: "cashback", title: "Go Bazaar Cashback", icon: Gift },
    { id: "upi", title: "UPI Payments", icon: Smartphone },
    { id: "sodexo", title: "Sodexo Cards", icon: Wallet }
  ]

  const returnTimelines = [
    { category: "Consumable Perishables", items: "Meats, seafood, frozen food, FnV, dairy, milk, eggs, bread", days: "7 days" },
    { category: "Consumable Non-perishables", items: "Groceries, packaged foods", days: "7 days" },
    { category: "General Merchandise", items: "Electronics, home furnishings, fashion", days: "7 days" },
    { category: "Freebie Missing", items: "Missing promotional items", days: "7 days" },
    { category: "Wrong Order & MDND", items: "Entire wrong order and missing/damaged items", days: "7 days" },
    { category: "Quality Issues", items: "Insect, fungus, foreign material, expired products", days: "No restriction" }
  ]

  const refundTimelines = [
    { method: "Go Bazaar Wallet", time: "24-48 hours" },
    { method: "Payzapp and G-pay", time: "5-7 working days" },
    { method: "IMPS", time: "24-48 hours" },
    { method: "Bank - CC/DC/NB", time: "5-7 working days" },
    { method: "External Wallet", time: "24-48 hours" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Payment Policy</h1>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                Complete information about payments, cancellations, returns, refunds, and cashback policies.
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Policy Sections</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center p-4 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 bg-purple-100 group-hover:bg-purple-200 rounded-full flex items-center justify-center mr-3">
                      <section.icon className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{section.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Order Cancellation */}
        <section id="cancellation" className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Order Cancellation</h2>
              </div>

              <div className="space-y-8">
                {/* User Cancellation */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    User Cancellation Rights
                  </h3>
                  <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      As a user, you may cancel an order placed by you before the order enters the <strong>"billed"</strong> stage.
                      For any permitted cancellations, we will initiate a refund, if any, made by you under the relevant order
                      within approximately <strong>48-72 hours</strong>.
                    </p>
                  </div>
                </div>

                {/* Company Cancellation */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    Company Cancellation Rights
                  </h3>
                  <p className="text-gray-700 mb-4">Orders may be cancelled by the Company in the following cases:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Suspected fraudulent transaction",
                      "Transaction violating Terms of Use",
                      "Product unavailability",
                      "Delivery-related logistical difficulties"
                    ].map((reason, index) => (
                      <div key={index} className="flex items-start p-3 bg-white rounded-lg border border-yellow-200">
                        <AlertCircle className="w-4 h-4 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{reason}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Refund Timeline:</strong> For company cancellations, refunds will be initiated within 72 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Returns & Refunds */}
        <section id="returns" className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Returns & Refunds</h2>
              </div>

              <div className="space-y-8">
                {/* Return Eligibility */}
                <div className="bg-blue-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Return Eligibility</h3>
                  <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Users can return a product or request replacement after delivery <strong>only if there is an issue with the product</strong>.
                      If you no longer need the item, bought it by mistake, or changed your mind, you may only return the product
                      <strong> at the time of delivery</strong>.
                    </p>

                    <div className="bg-white border border-blue-200 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Return Requirements:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Product must be in original packaging</li>
                        <li>• Product must be unused and unwashed</li>
                        <li>• All tags must be intact</li>
                        <li>• Images of issues must be provided</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Special Categories */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Electronics & Cookware
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      7 days return policy for quality issues. Original tags and packaging must be intact.
                    </p>
                    <p className="text-xs text-gray-600">
                      After 7 days, contact Brand/Manufacturer with original invoice.
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <XCircle className="w-5 h-5 text-red-600 mr-2" />
                      Non-Returnable Items
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Perfumes and personal care items are non-returnable and non-refundable.
                    </p>
                    <p className="text-xs text-gray-600">
                      Check items at doorstep during delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Return Timelines */}
        <section id="timelines" className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Return Timelines by Category</h2>
              </div>

              <div className="space-y-4">
                {returnTimelines.map((timeline, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{timeline.category}</h3>
                        <p className="text-sm text-gray-600">{timeline.items}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${timeline.days === "No restriction"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                          }`}>
                          <Calendar className="w-4 h-4 mr-1" />
                          {timeline.days}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Refund Methods */}
        <section id="refund-methods" className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Refund Timelines by Payment Method</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {refundTimelines.map((refund, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{refund.method}</h3>
                    <p className="text-sm text-green-600 font-medium">{refund.time}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Refund Guidelines</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p>• Refunds made to same issuing bank</p>
                    <p>• COD: Go Bazaar wallet or NEFT transfer</p>
                    <p>• Electronic payments: Same payment mode</p>
                  </div>
                  <div>
                    <p>• All refunds in Indian Rupees only</p>
                    <p>• Bank details required for NEFT</p>
                    <p>• Processing time varies by method</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cashback Policy */}
        <section id="cashback" className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <Gift className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Go Bazaar Cashback</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4">New User Offer</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold">20%</div>
                      <div className="text-sm">Cashback</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">₹250</div>
                      <div className="text-sm">Max Cashback</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">₹500</div>
                      <div className="text-sm">Min Order</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4">Cashback Rules</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Available on versions 2.5 and above</li>
                      <li>• No cashback for cancelled orders</li>
                      <li>• Cannot be clubbed with other offers</li>
                      <li>• Non-transferable to other users</li>
                      <li>• Reflects in wallet within 6-12 hours</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4">Exclusions</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Ghee and edible oil</li>
                      <li>• Baby food products</li>
                      <li>• Smoking needs</li>
                      <li>• Orders using wallet cashback</li>
                      <li>• Expired after minimum 60 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Payment Methods</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* UPI */}
                <div id="upi" className="bg-purple-50 border border-purple-200 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Smartphone className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">UPI Payments</h3>
                  </div>

                  <div className="space-y-4 text-gray-700">
                    <p className="text-sm">
                      Unified Payments Interface (UPI) is an instant real-time payment system developed by NPCI
                      for inter-bank transactions, regulated by RBI.
                    </p>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">How it works:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Appears as separate tab on Android app</li>
                        <li>• Scans device for UPI apps</li>
                        <li>• Choose app to complete payment</li>
                        <li>• Refunds in 5-7 working days</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sodexo */}
                <div id="sodexo" className="bg-green-50 border border-green-200 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Wallet className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Sodexo Cards</h3>
                  </div>

                  <div className="space-y-4 text-gray-700">
                    <p className="text-sm">
                      Sodexo meal cards are accepted as online payment method for your convenience.
                    </p>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Refund Policy:</h4>
                      <p className="text-sm">
                        Refunds for Sodexo meal card transactions will be credited within
                        <strong> 5 to 7 working days</strong> post initiation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 bg-purple-600 text-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About Payments or Refunds?</h2>
              <p className="text-purple-100 mb-6">
                Our customer support team is here to help with any payment-related queries.
              </p>
              <a
                href="mailto:info@gobazaar.in"
                className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Contact Support
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
