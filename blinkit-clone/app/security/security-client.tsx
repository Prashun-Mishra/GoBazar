"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Shield,
  Lock,
  Eye,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  CreditCard,
  Database,
  Users,
  Globe,
  FileText,
  Phone
} from "lucide-react"

export default function SecurityClient() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Data Encryption",
      description: "All your personal and payment data is encrypted using industry-standard SSL/TLS protocols during transmission and storage."
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "We use PCI DSS compliant payment gateways and never store your card details on our servers for maximum security."
    },
    {
      icon: Smartphone,
      title: "OTP Verification",
      description: "Multi-factor authentication with OTP ensures only you can access your account and place orders."
    },
    {
      icon: Database,
      title: "Secure Infrastructure",
      description: "Our servers are hosted on secure cloud infrastructure with regular security audits and monitoring."
    },
    {
      icon: Eye,
      title: "Privacy Protection",
      description: "We follow strict privacy policies and never share your personal information with unauthorized third parties."
    },
    {
      icon: Users,
      title: "Access Control",
      description: "Role-based access controls ensure only authorized personnel can access sensitive customer data."
    }
  ]

  const securityTips = [
    {
      title: "Keep Your Account Secure",
      tips: [
        "Never share your OTP with anyone, including GoBazaar staff",
        "Log out from shared devices after use",
        "Use the official GoBazaar app or website only",
        "Keep your registered mobile number updated"
      ]
    },
    {
      title: "Safe Payment Practices",
      tips: [
        "Always verify the payment amount before confirming",
        "Use secure payment methods like UPI or cards",
        "Never enter card details on suspicious websites",
        "Check your bank statements regularly"
      ]
    },
    {
      title: "Delivery Safety",
      tips: [
        "Verify delivery partner identity before accepting orders",
        "Check order contents before making COD payments",
        "Report suspicious delivery behavior immediately",
        "Keep your delivery address accurate and updated"
      ]
    }
  ]

  const certifications = [
    {
      title: "ISO 27001",
      description: "Information Security Management System certification"
    },
    {
      title: "PCI DSS",
      description: "Payment Card Industry Data Security Standard compliance"
    },
    {
      title: "SSL Certificate",
      description: "256-bit SSL encryption for all data transmission"
    },
    {
      title: "GDPR Compliant",
      description: "General Data Protection Regulation compliance"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 via-red-500 to-pink-600 text-white py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Security & Safety</h1>
              <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
                Your security is our top priority. Learn how we protect your data and ensure safe transactions.
              </p>
            </div>
          </div>
        </section>

        {/* Security Overview */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Security Commitment</h2>
              <p className="text-lg text-gray-600">
                We implement multiple layers of security to protect your personal information, payment details,
                and ensure safe delivery of your orders.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Certifications */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Certifications</h2>
                <p className="text-lg text-gray-600">
                  We maintain industry-standard certifications to ensure the highest level of security.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{cert.title}</h3>
                    <p className="text-sm text-gray-600">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security Tips */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Tips for You</h2>
                <p className="text-lg text-gray-600">
                  Follow these best practices to keep your account and transactions secure.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {securityTips.map((category, index) => (
                  <div key={index} className="bg-blue-50 rounded-xl p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">{category.title}</h3>
                    <div className="space-y-4">
                      {category.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Data Protection */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Protection & Privacy</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Database className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Secure Data Storage</h4>
                        <p className="text-gray-600 text-sm">All customer data is encrypted and stored in secure, compliant data centers with regular backups.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Globe className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">No Data Sharing</h4>
                        <p className="text-gray-600 text-sm">We never sell or share your personal information with third parties without your explicit consent.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FileText className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Transparent Policies</h4>
                        <p className="text-gray-600 text-sm">Our privacy policy clearly outlines how we collect, use, and protect your information.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-8">
                  <div className="text-center">
                    <Lock className="w-16 h-16 text-red-600 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Your Data, Your Control</h3>
                    <p className="text-gray-600 mb-6">
                      You have full control over your personal data. Request access, modification, or deletion anytime.
                    </p>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                      Manage Privacy Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Incident Reporting */}
        <section className="py-16 bg-yellow-50 border-y border-yellow-200">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mr-6 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Security Issues</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    If you notice any suspicious activity on your account, unauthorized transactions, or potential
                    security vulnerabilities, please report them immediately to our security team.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 border border-yellow-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Emergency Security Hotline</h4>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-red-600 mr-2" />
                        <span className="font-mono text-lg">+91 7558658539</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Available 24/7 for security emergencies</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-yellow-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Security Email</h4>
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-red-600 mr-2" />
                        <span className="font-mono">security@gobazaar.in</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">For non-urgent security reports</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Security Questions?</h2>
              <p className="text-red-100 mb-8">
                Our security team is available to address any concerns about your account safety and data protection.
              </p>
              <a
                href="mailto:security@gobazaar.in"
                className="inline-flex items-center bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                Contact Security Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
