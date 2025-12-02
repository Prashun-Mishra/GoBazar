"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    MessageCircle,
    Send,
    Building2,
    Users,
    Headphones,
    Globe
} from "lucide-react"

export default function ContactClient() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "general"
    })

    const contactMethods = [
        {
            icon: Phone,
            title: "Customer Support",
            description: "Call us for immediate assistance",
            contact: "+91 7558658539",
            availability: "24/7 Available",
            action: "tel:+917558658539"
        },
        {
            icon: Mail,
            title: "Email Support",
            description: "Send us your queries via email",
            contact: "gobazar.2025@gmail.com",
            availability: "Response within 24 hours",
            action: "mailto:gobazar.2025@gmail.com"
        },
        {
            icon: MessageCircle,
            title: "Live Chat",
            description: "Chat with our support team",
            contact: "Available on App/Website",
            availability: "9 AM - 11 PM",
            action: "#"
        },
        {
            icon: MapPin,
            title: "Visit Our Office",
            description: "Meet us at our headquarters",
            contact: "Dapodi, Pune",
            availability: "Mon-Sat: 10 AM - 6 PM",
            action: "#"
        }
    ]

    const departments = [
        {
            title: "Customer Service",
            description: "Order issues, delivery queries, general support",
            email: "gobazar.2025@gmail.com",
            icon: Headphones
        },
        {
            title: "Business Partnerships",
            description: "Vendor partnerships, franchise opportunities",
            email: "gobazar.2025@gmail.com",
            icon: Building2
        },
        {
            title: "Careers & HR",
            description: "Job applications, employment queries",
            email: "gobazar.2025@gmail.com",
            icon: Users
        },
        {
            title: "Media & Press",
            description: "Press releases, media inquiries",
            email: "gobazar.2025@gmail.com",
            icon: Globe
        }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("Form submitted:", formData)
        alert("Thank you for your message! We'll get back to you soon.")
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-600 text-white py-16">
                    <div className="container">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Phone className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                            <p className="text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
                                We're here to help! Reach out to us through any of the channels below.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="py-16 bg-white">
                    <div className="container">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                                <p className="text-lg text-gray-600">Choose the most convenient way to reach us</p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {contactMethods.map((method, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                                        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <method.icon className="w-8 h-8 text-teal-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                                        <div className="mb-4">
                                            <p className="font-medium text-gray-900">{method.contact}</p>
                                            <p className="text-xs text-gray-500">{method.availability}</p>
                                        </div>
                                        <a
                                            href={method.action}
                                            className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
                                        >
                                            Contact Now
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Form & Office Info */}
                <section className="py-16 bg-gray-50">
                    <div className="container">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Contact Form */}
                                <div className="bg-white rounded-xl p-8 shadow-sm">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                    placeholder="+91 XXXXX XXXXX"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            >
                                                <option value="general">General Inquiry</option>
                                                <option value="order">Order Support</option>
                                                <option value="delivery">Delivery Issue</option>
                                                <option value="payment">Payment Problem</option>
                                                <option value="partnership">Business Partnership</option>
                                                <option value="feedback">Feedback & Suggestions</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                placeholder="Brief subject of your message"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                placeholder="Please describe your inquiry in detail..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center"
                                        >
                                            <Send className="w-5 h-5 mr-2" />
                                            Send Message
                                        </button>
                                    </form>
                                </div>

                                {/* Office Information */}
                                <div className="space-y-8">
                                    {/* Office Address */}
                                    <div className="bg-white rounded-xl p-8 shadow-sm">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Office</h3>

                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <MapPin className="w-6 h-6 text-teal-600 mr-4 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                                                    <p className="text-gray-600 leading-relaxed">
                                                        80/4, Shop No 4, Old Sangvi Bopodi Road<br />
                                                        Opposite Kinara Hotel, Dapodi<br />
                                                        Pune, Maharashtra - 411012<br />
                                                        India
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <Clock className="w-6 h-6 text-teal-600 mr-4 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
                                                    <div className="text-gray-600 space-y-1">
                                                        <p>Monday - Saturday: 10:00 AM - 6:00 PM</p>
                                                        <p>Sunday: Closed</p>
                                                        <p className="text-sm text-teal-600 font-medium">Customer Support: 24/7</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <Building2 className="w-6 h-6 text-teal-600 mr-4 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-2">Company</h4>
                                                    <p className="text-gray-600">
                                                        Kaonain Pursuit Overseas Exporters<br />
                                                        <span className="text-sm">FSSAI License: 21525082002055</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="bg-teal-600 text-white rounded-xl p-8">
                                        <h3 className="text-xl font-bold mb-6">We're Here for You</h3>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold">24/7</div>
                                                <div className="text-teal-100 text-sm">Customer Support</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold">&lt; 2 hrs</div>
                                                <div className="text-teal-100 text-sm">Response Time</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold">30+</div>
                                                <div className="text-teal-100 text-sm">Areas Served</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold">99%</div>
                                                <div className="text-teal-100 text-sm">Issue Resolution</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Department Contacts */}
                <section className="py-16 bg-white">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Department Contacts</h2>
                                <p className="text-lg text-gray-600">Reach the right team for faster assistance</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {departments.map((dept, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                                <dept.icon className="w-6 h-6 text-teal-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.title}</h3>
                                                <p className="text-gray-600 text-sm mb-3">{dept.description}</p>
                                                <a
                                                    href={`mailto:${dept.email}`}
                                                    className="text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors"
                                                >
                                                    {dept.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
