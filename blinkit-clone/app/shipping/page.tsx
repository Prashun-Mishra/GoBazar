"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Truck, 
  Users, 
  Clock, 
  MapPin,
  Shield,
  Star,
  CheckCircle,
  Bike,
  Calendar,
  DollarSign,
  Phone,
  ArrowRight
} from "lucide-react"
import Image from "next/image"

export default function ShippingPage() {
  const partnerBenefits = [
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Choose your own working hours and days. Work when it's convenient for you."
    },
    {
      icon: DollarSign,
      title: "Competitive Earnings",
      description: "Earn attractive delivery fees with bonus incentives for peak hours and performance."
    },
    {
      icon: Bike,
      title: "Use Your Own Vehicle",
      description: "Use your own 2-wheeler for deliveries. No need for company vehicles."
    },
    {
      icon: MapPin,
      title: "Local Area Coverage",
      description: "Deliver within your familiar neighborhood and local areas across Pune."
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      description: "Comprehensive insurance coverage for you and your vehicle during deliveries."
    },
    {
      icon: Star,
      title: "Performance Rewards",
      description: "Earn extra bonuses based on customer ratings and delivery performance."
    }
  ]

  const requirements = [
    "Valid driving license for 2-wheeler",
    "Own 2-wheeler in good condition",
    "Smartphone with internet connection",
    "Age between 18-55 years",
    "Basic knowledge of Pune areas",
    "Good communication skills"
  ]

  const deliveryProcess = [
    {
      step: "1",
      title: "Order Assignment",
      description: "Receive order notifications through our partner app based on your location and availability."
    },
    {
      step: "2", 
      title: "Pickup from Store",
      description: "Visit the designated store/warehouse to collect the grocery items for delivery."
    },
    {
      step: "3",
      title: "Customer Delivery", 
      description: "Navigate to customer location and deliver items safely to their doorstep."
    },
    {
      step: "4",
      title: "Payment Collection",
      description: "Collect payment for COD orders or confirm digital payment completion."
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
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping & Delivery Partners</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Join our network of independent delivery partners and earn while serving your community.
              </p>
            </div>
          </div>
        </section>

        {/* Partner Overview */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Are Our Delivery Partners?</h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
                <div className="flex items-start">
                  <Users className="w-8 h-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Independent Contractors</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      They are independent contractors who partner with Go Bazaar.in to pick up grocery items 
                      ordered by consumers on the Go Bazaar.in website and deliver those items to the convenience 
                      of the consumer's doorstep. They use their own 2-wheelers to make these deliveries and pick 
                      their own schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner With Us?</h2>
                <p className="text-lg text-gray-600">Enjoy flexibility, competitive earnings, and comprehensive support</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {partnerBenefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <benefit.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Partner Requirements</h2>
                  <p className="text-gray-600 mb-8">
                    To ensure quality service and safety, we have specific requirements for our delivery partners.
                  </p>
                  
                  <div className="space-y-4">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
                  <div className="text-center">
                    <Bike className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Join?</h3>
                    <p className="text-gray-600 mb-6">
                      Start your journey as a GoBazaar delivery partner today and enjoy the freedom of flexible work.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Process */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How Delivery Works</h2>
                <p className="text-lg text-gray-600">Simple 4-step process for every delivery</p>
              </div>
              
              <div className="space-y-8">
                {deliveryProcess.map((process, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-6 flex-shrink-0 font-bold">
                      {process.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{process.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{process.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Delivery Network</h2>
                <p className="text-blue-100">Serving Pune with a growing network of dedicated partners</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-blue-200">Active Partners</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">30+</div>
                  <div className="text-blue-200">Areas Covered</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">20 min</div>
                  <div className="text-blue-200">Average Delivery</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">4.8★</div>
                  <div className="text-blue-200">Partner Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Earning?</h2>
              <p className="text-gray-600 mb-8">
                Join hundreds of delivery partners already earning with GoBazaar. Flexible hours, competitive pay, and comprehensive support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Call +91 7558658539
                </button>
                <button className="bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
                  Apply Online
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
