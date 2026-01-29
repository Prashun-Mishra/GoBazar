"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Mail,
  Phone,
  MapPin,
  Camera,
  Wifi,
  Smartphone,
  Database,
  Users,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

export default function PrivacyClient() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: Shield
    },
    {
      id: "collection",
      title: "Information Collection",
      icon: Database
    },
    {
      id: "permissions",
      title: "App Permissions",
      icon: Smartphone
    },
    {
      id: "cookies",
      title: "Cookies Policy",
      icon: FileText
    },
    {
      id: "choices",
      title: "Your Choices",
      icon: Eye
    },
    {
      id: "changes",
      title: "Policy Changes",
      icon: AlertTriangle
    },
    {
      id: "contact",
      title: "Contact & Grievance",
      icon: Mail
    }
  ]

  const permissions = [
    {
      icon: Users,
      title: "Contacts",
      description: "Access your contact list to provide social features like sharing orders and sending referral links to friends."
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Deliver products to your address and provide location-specific deals with personalized experience."
    },
    {
      icon: Phone,
      title: "SMS & Phone",
      description: "Auto-fill OTP during transactions and enable direct calls to customer service through the app."
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send deals, offers, and important notifications directly to your email address."
    },
    {
      icon: Camera,
      title: "Camera & Media",
      description: "Take pictures of invoices or defective products for customer support and cache images for better performance."
    },
    {
      icon: Wifi,
      title: "Wi-Fi Information",
      description: "Optimize your experience with better map details and faster image loading when connected to Wi-Fi."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Your privacy is important to us. Learn how we collect, use, and protect your personal information.
              </p>
              <p className="text-sm text-blue-200 mt-4">
                Last updated: October 2025
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Table of Contents</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mr-3">
                      <section.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{section.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section id="introduction" className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                  <p>
                    We i.e. <strong>"Go Bazaar.in"</strong> (formerly known as Kaonain Pursuit Oversees Exporter) ("Company"),
                    are committed to protecting the privacy and security of your personal information. Your privacy is important
                    to us and maintaining your trust is paramount.
                  </p>

                  <p>
                    This privacy policy explains how we collect, use, process and disclose information about you. By using our
                    website/app/platform and affiliated services, you consent to the terms of our privacy policy ("Privacy Policy")
                    in addition to our 'Terms of Use.' We encourage you to read this privacy policy to understand the collection,
                    use, and disclosure of your information from time to time, to keep yourself updated with the changes and
                    updates that we make to this policy.
                  </p>

                  <p>
                    This privacy policy describes our privacy practices for all websites, products and services that are linked
                    to it. However this policy does not apply to those affiliates and partners that have their own privacy policy.
                    In such situations, we recommend that you read the privacy policy on the applicable site.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-blue-800 font-medium">
                      Should you have any clarifications regarding this privacy policy, please write to us at{" "}
                      <a href="mailto:info@gobazaar.in" className="text-blue-600 hover:underline">
                        info@gobazaar.in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Information Collection */}
        <section id="collection" className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">The Collection, Storage and Use of Information</h2>
              </div>

              <div className="space-y-8">
                {/* Automatic Information */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Automatic Information Collection</h3>
                  <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      We may automatically store certain information including but not limited to information about your web browser,
                      IP address, cookies stored on your device and other information about you based upon your behaviour on the website.
                      We use this information to do internal research on our users' demographics, interests and behaviour to better
                      understand, protect and serve our users.
                    </p>

                    <p>
                      This information may include the URL that you just came from, which URL you next go to, your computer browser
                      information, your IP address, and other information associated with your interaction with the website.
                    </p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white border rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information We Collect</h3>
                  <p className="text-gray-700 mb-6">
                    We collect and use information from you that we consider necessary for achieving a seamless,
                    efficient and safe experience, customized to your needs including:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Enable provision of services opted by you",
                      "Communicate account and product/service information",
                      "Provide quality customer care services",
                      "Undertake fraud and money laundering prevention",
                      "Comply with applicable laws and regulations",
                      "Provide information on products, services, and offers"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Information */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
                  <div className="flex items-start">
                    <Lock className="w-6 h-6 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Information Security</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We are committed to keeping all payment-related financial information (credit card, debit card,
                        bank account details, etc.) safe at all times. Such data is only transacted over secure websites
                        of approved payment gateways which are digitally encrypted and provide the highest possible degree
                        of care available under current technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App Permissions */}
        <section id="permissions" className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Smartphone className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">App Permissions</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {permissions.map((permission, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <permission.icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{permission.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{permission.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Your Control</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To the extent possible, we provide you the option of not divulging any specific information that you
                      wish for us not to collect, store or use. You may also choose not to use a particular service or feature
                      on the website/application and opt out of any non-essential communications from the Company.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cookies Policy */}
        <section id="cookies" className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Cookies Policy</h2>
              </div>

              <div className="bg-white border rounded-xl p-8">
                <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
                  <p>
                    The Company uses data collection devices such as "cookies" on certain pages of the website to help
                    analyses our web page flow, measure promotional effectiveness, and promote trust and safety. "Cookies"
                    are small data files placed on your hard drive or device that assist us in providing our services and
                    may include an anonymous unique identifier.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">What Cookies Do</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Help you enter passwords less frequently</li>
                        <li>• Provide information targeted to your interests</li>
                        <li>• Analyze web page flow and effectiveness</li>
                        <li>• Enhance security and trust</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Your Cookie Control</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• You can decline cookies if your browser permits</li>
                        <li>• Most cookies are "session cookies" that auto-delete</li>
                        <li>• Some features may not work without cookies</li>
                        <li>• You may need to re-enter passwords more frequently</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <p className="text-yellow-800">
                      <strong>Third-Party Cookies:</strong> You may encounter cookies placed by third parties on certain
                      pages. The Company does not control the use of cookies by third parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Choices Available */}
        <section id="choices" className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Your Choices & Data Protection</h2>
              </div>

              <div className="space-y-8">
                {/* Security Measures */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Lock className="w-5 h-5 text-green-600 mr-2" />
                    Security Measures
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To protect against the loss, misuse and alteration of information under its control, the Company has
                    in place appropriate physical, electronic and managerial procedures. Company servers are accessible
                    only to authorized personnel and your information is shared with employees on a need-to-know basis.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-800 mb-1">Important Security Notice</h4>
                        <p className="text-sm text-red-700">
                          The Company will never ask you to share sensitive data via email or telephone. If you receive
                          such requests, do not respond and forward the information to info@gobazaar.in for necessary action.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Information Sharing */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">When We May Share Information</h3>
                  <p className="text-gray-700 mb-4">
                    We may share certain information with governmental agencies or other third parties when we are:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Obligated under applicable laws or court orders",
                      "Detecting and preventing fraud, identity theft, or illegal acts",
                      "Responding to intellectual property rights claims",
                      "Enforcing our Terms of Use and protecting rights and safety"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <Shield className="w-4 h-4 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Changes */}
        <section id="changes" className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Changes to Privacy Policy</h2>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  <p>
                    Go Bazaar reserves the right to change this policy from time to time. Any changes shall be effective
                    immediately upon the posting of the revised Privacy Policy. We encourage you to periodically review
                    this page for the latest information on our privacy practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Grievance */}
        <section id="contact" className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Contact & Grievance Redressal</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Privacy Questions */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy Questions & Access</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      If you have questions, concerns, or suggestions regarding our privacy policy, or wish to access
                      or correct your personal information, please contact us.
                    </p>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Response Time:</strong> We will contact you within 30 days of your request after
                        verifying your identity.
                      </p>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Email Us</p>
                        <a href="mailto:info@gobazaar.in" className="text-blue-600 hover:underline text-sm">
                          info@gobazaar.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grievance Officer */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Grievance Redressal Officer</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      If you have a grievance regarding our privacy policy or data usage practices, you may reach out
                      to our Grievance Redressal Officer.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 text-red-600 mr-2" />
                        <h4 className="font-semibold text-red-800">Grievance Redressal Officer</h4>
                      </div>
                      <p className="text-red-700 font-medium">Farha Shaikh</p>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-red-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Contact for Grievances</p>
                        <a href="mailto:info@gobazaar.in" className="text-red-600 hover:underline text-sm">
                          info@gobazaar.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About Our Privacy Policy?</h2>
              <p className="text-blue-100 mb-6">
                We're here to help. Contact us anytime for clarifications or concerns about how we handle your data.
              </p>
              <a
                href="mailto:info@gobazaar.in"
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
