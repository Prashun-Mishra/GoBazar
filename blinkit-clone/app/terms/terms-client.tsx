"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
    FileText,
    Shield,
    User,
    Globe,
    Eye,
    Lock,
    AlertTriangle,
    Scale,
    Mail,
    Building2,
    Copyright,
    UserCheck
} from "lucide-react"

export default function TermsClient() {
    const sections = [
        { id: "personal-info", title: "Personal Information", icon: User },
        { id: "acceptance", title: "Acceptance of Terms", icon: FileText },
        { id: "services", title: "Services Overview", icon: Globe },
        { id: "eligibility", title: "Eligibility", icon: UserCheck },
        { id: "license", title: "License & Access", icon: Lock },
        { id: "account", title: "Account & Registration", icon: User },
        { id: "pricing", title: "Pricing", icon: Scale },
        { id: "disclaimers", title: "Disclaimers", icon: AlertTriangle },
        { id: "reviews", title: "Reviews & Feedback", icon: Eye },
        { id: "copyright", title: "Copyright & Trademark", icon: Copyright },
        { id: "liability", title: "Liability & Indemnity", icon: Shield },
        { id: "termination", title: "Termination", icon: AlertTriangle },
        { id: "governing", title: "Governing Law", icon: Scale },
        { id: "grievance", title: "Grievance Policy", icon: Mail }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white py-16">
                    <div className="container">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
                            <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
                                Please read these terms carefully before using GoBazaar services.
                            </p>
                            <p className="text-sm text-indigo-200 mt-4">
                                Last updated: October 2025
                            </p>
                        </div>
                    </div>
                </section>

                {/* Table of Contents */}
                <section className="py-12 bg-white">
                    <div className="container">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Table of Contents</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {sections.map((section, index) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="flex items-center p-4 bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors group"
                                    >
                                        <div className="w-8 h-8 bg-indigo-100 group-hover:bg-indigo-200 rounded-full flex items-center justify-center mr-3">
                                            <section.icon className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{section.title}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Personal Information */}
                <section id="personal-info" className="py-16 bg-gray-50">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <User className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Personal Information</h2>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-sm">
                                <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
                                    <p>
                                        <strong>"Go Bazaar.in"</strong> is a trademark of <strong>"Kaonain Pursuit"</strong> (formerly known as
                                        Kaonain Pursuit Overseas Exporter Pvt. Ltd.), a company incorporated under the Companies Act, 2013 with its registered
                                        office at Shop No 4, Old Sangvi Bopodi Road, Near Budh Vihar Opposite Kinara Hotel, Dapodi, Pune,
                                        Maharashtra, India - 411020 (Company).
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6 my-8">
                                        <div className="bg-blue-50 rounded-lg p-6">
                                            <h4 className="font-semibold text-gray-900 mb-3">Company Details</h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li>• Domain: www.gobazaar.in</li>
                                                <li>• FSSAI License: 21525082002055</li>
                                                <li>• Customer Care: +91 7558658539</li>
                                                <li>• Rebranded: April 01, 2022</li>
                                            </ul>
                                        </div>

                                        <div className="bg-yellow-50 rounded-lg p-6">
                                            <h4 className="font-semibold text-gray-900 mb-3">Important Notice</h4>
                                            <p className="text-sm text-gray-700">
                                                We have undergone re-branding exercise. Our brand name is now 'Go Bazaar'.
                                                We are modifying our terms & conditions and policies accordingly.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <p className="text-red-800 text-sm">
                                            <strong>Disclaimer:</strong> "Go Bazaar.in" owned by "Kaonain Pursuit" is not related to any
                                            real estate services business operated by "Kaonain Pursuit Overseas Exporter".
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Acceptance of Terms */}
                <section id="acceptance" className="py-16 bg-white">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                    <FileText className="w-6 h-6 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Acceptance of Terms</h2>
                            </div>

                            <div className="bg-white border rounded-xl p-8">
                                <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
                                    <p>
                                        Thank you for using Go Bazaar.in. These Terms of Use (the "Terms") are intended to make you aware
                                        of your legal rights and responsibilities with respect to your access to and use of the Go Bazaar.in
                                        website www.gobazaar.in (the "Site") and any related mobile or software applications ("Go Bazaar Platform").
                                    </p>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                            <Shield className="w-5 h-5 text-green-600 mr-2" />
                                            Key Points
                                        </h4>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• Terms are effective for all existing and future customers</li>
                                            <li>• By accessing this site, you agree to be bound by these terms</li>
                                            <li>• Use of the platform is at your own risk</li>
                                            <li>• Terms may be updated without notice</li>
                                        </ul>
                                    </div>

                                    <p>
                                        This document is published in accordance with Rule 3 of the Information Technology
                                        (Intermediaries Guidelines) Rules, 2011. The terms 'visitor(s)', 'user(s)', 'you' refer to
                                        any person visiting, accessing, browsing through and/or using the Marketplace.
                                    </p>

                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                                        <p className="text-blue-800 font-medium">
                                            For clarifications regarding Terms of Use, please write to us at{" "}
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

                {/* Services Overview */}
                <section id="services" className="py-16 bg-gray-50">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                    <Globe className="w-6 h-6 text-purple-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Services Overview</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white rounded-xl p-8 shadow-sm">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Nature</h3>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        The Marketplace is a platform for domestic consumers to transact with third party sellers,
                                        who have been granted access to display and offer products for sale through the Marketplace.
                                    </p>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <p className="text-yellow-800 text-sm">
                                            <strong>Important:</strong> The Company does not provide services other than providing
                                            the Marketplace as a platform to transact at users' own cost and risk.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <h4 className="font-semibold text-gray-900 mb-3">Service Limitations</h4>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• Available to select geographies in India</li>
                                            <li>• Subject to business hours restrictions</li>
                                            <li>• Delivery charges for minimum order values</li>
                                            <li>• Convenience & safety fees may apply</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <h4 className="font-semibold text-gray-900 mb-3">Company Disclaimers</h4>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• Not party to user-seller transactions</li>
                                            <li>• No control over products or prices</li>
                                            <li>• Disclaims warranties on products</li>
                                            <li>• No liability for seller actions</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Eligibility */}
                <section id="eligibility" className="py-16 bg-white">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                                    <UserCheck className="w-6 h-6 text-orange-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Eligibility</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                                        Ineligible Users
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Persons who are "incompetent to contract" within the meaning of the Indian Contract Act, 1872
                                        including minors, undischarged insolvents etc. are not eligible to use the Marketplace.
                                    </p>

                                    <div className="bg-white rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-2">Special Provisions for Minors:</h4>
                                        <ul className="text-sm text-gray-700 space-y-1">
                                            <li>• May use under adult supervision</li>
                                            <li>• Parent/guardian must agree to terms</li>
                                            <li>• Prohibited from purchasing adult-only products</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Target Users</h3>
                                    <p className="text-gray-700 mb-4">
                                        The Marketplace is intended for end-consumers purchasing products for domestic self-consumption.
                                    </p>

                                    <div className="bg-white rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-2">Not Eligible:</h4>
                                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                                            <div>
                                                <p>• Retailers</p>
                                                <p>• Institutions</p>
                                            </div>
                                            <div>
                                                <p>• Wholesalers</p>
                                                <p>• Business users</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* License & Access */}
                <section id="license" className="py-16 bg-gray-50">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                    <Lock className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">License & Access</h2>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-sm">
                                <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
                                    <p>
                                        The Company grants you a limited sub-license to access and make personal use of the Marketplace,
                                        but not to download (other than page caching) or modify it, except with express written consent.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 rounded-lg p-6">
                                            <h4 className="font-semibold text-gray-900 mb-3 text-green-800">Permitted Uses</h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li>• Personal access and use</li>
                                                <li>• Page caching</li>
                                                <li>• Browsing products</li>
                                                <li>• Making purchases</li>
                                            </ul>
                                        </div>

                                        <div className="bg-red-50 rounded-lg p-6">
                                            <h4 className="font-semibold text-gray-900 mb-3 text-red-800">Prohibited Activities</h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li>• Commercial use or resale</li>
                                                <li>• Data mining or extraction</li>
                                                <li>• Unauthorized downloading</li>
                                                <li>• Framing or reproducing content</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">Content Restrictions</h4>
                                        <p className="text-sm text-gray-700 mb-3">
                                            You agree not to host, display, upload, modify, publish, transmit, update or share information that:
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-600">
                                            <div>
                                                <p>• Belongs to another person</p>
                                                <p>• Is harmful, harassing, or defamatory</p>
                                                <p>• Harms minors in any way</p>
                                                <p>• Infringes intellectual property rights</p>
                                            </div>
                                            <div>
                                                <p>• Violates applicable laws</p>
                                                <p>• Contains malicious software</p>
                                                <p>• Threatens national security</p>
                                                <p>• Is misleading or false</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional Sections - Condensed for brevity */}
                <section className="py-16 bg-white">
                    <div className="container">
                        <div className="max-w-4xl mx-auto space-y-12">

                            {/* Account & Registration */}
                            <div id="account" className="bg-gray-50 rounded-xl p-8">
                                <div className="flex items-center mb-6">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <User className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Account & Registration Obligations</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    All users must register and log in for placing orders. You must keep account details current and correct.
                                    Registration may collect personally identifiable information including name, email, address, mobile number,
                                    and demographic profile. Information is subject to our privacy policy.
                                </p>
                            </div>

                            {/* Pricing */}
                            <div id="pricing" className="bg-gray-50 rounded-xl p-8">
                                <div className="flex items-center mb-6">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <Scale className="w-5 h-5 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Pricing</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    We aim to ensure accurate pricing, but prices may be incorrect due to technical issues or errors.
                                    We reserve the right to cancel orders with incorrect pricing. Price at ordering time will be charged
                                    at delivery, provided no product is sold above MRP.
                                </p>
                            </div>

                            {/* Disclaimers */}
                            <div id="disclaimers" className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
                                <div className="flex items-center mb-6">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Disclaimers</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    You acknowledge accessing services at your own risk. We make best efforts to display products accurately,
                                    but variations may occur. We make no warranties about products and accept no liability for errors,
                                    inaccuracies, or third-party information.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Grievance Policy */}
                <section id="grievance" className="py-16 bg-gray-50">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                    <Mail className="w-6 h-6 text-red-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Grievance Policy</h2>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-sm">
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    In accordance with Information Technology Act, 2000 and Consumer Protection Act, 2019,
                                    contact details of the Grievance Officer for complaints or concerns:
                                </p>

                                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                    <div className="flex items-start">
                                        <Building2 className="w-6 h-6 text-red-600 mr-4 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-3">Grievance Redressal Officer</h4>
                                            <div className="space-y-2 text-gray-700">
                                                <p><strong>Name:</strong> Farha Shaikh</p>
                                                <p><strong>Company:</strong> Go Bazaar.in (formerly Kaonain Pursuit Overseas Exporter)</p>
                                                <p><strong>Address:</strong> Shop No 4, Old Sangvi Bopodi Road, Opposite Kinara Hotel Dapodi, Pune, Maharashtra India - 411012</p>
                                                <p><strong>Email:</strong> <a href="mailto:info@gobazaar.in" className="text-red-600 hover:underline">info@gobazaar.in</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-12 bg-indigo-600 text-white">
                    <div className="container">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
                            <p className="text-indigo-100 mb-6">
                                Contact us for any clarifications regarding these Terms and Conditions.
                            </p>
                            <a
                                href="mailto:info@gobazaar.in"
                                className="inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
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
