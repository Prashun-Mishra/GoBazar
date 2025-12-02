import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Clock,
  Zap,
  TrendingUp,
  Users,
  ShoppingCart,
  MapPin,
  Mail,
  Phone,
  Building2,
  Truck,
  Star,
  Globe,
  Heart
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Go Bazar - Pune's Fastest Grocery Delivery",
  description: "Learn about Go Bazar's mission to revolutionize grocery delivery in Pune. We deliver fresh produce and essentials in 20 minutes.",
  openGraph: {
    title: "About Us | Go Bazar",
    description: "Learn about Go Bazar's mission to revolutionize grocery delivery in Pune.",
  }
}

export default function AboutPage() {
  const cities = [
    "Dapodi", "Bopodi", "Khadki Bazaar", "Khadki Station", "Shivajinagar", "Pune Station",
    "Pimpri", "Chinchwad", "Akurdi", "Nigdi", "Dehuroad", "Old Sangvi", "New Sangvi",
    "Aundh", "Hinjewadi", "Wakad", "Pimple Nilakh", "Pimple Saudagar", "Kalyani Nagar",
    "Viman Nagar", "Koregaon Park", "Hadapsar", "Kondwa", "Market Yard", "Swargate",
    "Deccan", "FC Road", "Karve Nagar", "Bavdhan", "Pashan", "Baner", "Balewadi"
  ]

  const features = [
    {
      icon: Clock,
      title: "20 Minute Delivery",
      description: "Get fresh groceries delivered to your doorstep in just 20 minutes"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Technology-driven network for ultra-fast deliveries"
    },
    {
      icon: ShoppingCart,
      title: "Everything You Need",
      description: "From groceries to electronics, all in one app"
    },
    {
      icon: Heart,
      title: "Fresh & Quality",
      description: "Premium quality products sourced from trusted partners"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Go<span className="text-green-200">Bazaar</span>
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-green-100">
                Fresh Groceries Delivered in 20 Minutes Across Pune
              </p>
              <p className="text-lg text-green-50 max-w-3xl mx-auto leading-relaxed">
                We are revolutionizing grocery delivery in Pune by making fresh vegetables, fruits,
                and daily essentials available at your doorstep in just 20 minutes.
              </p>
              <div className="mt-8">
                <Link href="/">
                  <Button
                    size="lg"
                    className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-4 text-lg"
                  >
                    Start Shopping Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
                <div className="w-24 h-1 bg-green-500 mx-auto"></div>
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                  <p className="text-xl text-gray-800 font-medium">
                    Imagine needing something when you are at home and getting it before you have tied your shoelaces to step out.
                  </p>

                  <p>
                    We are revolutionizing e-commerce by making the stuff most important to you, available to you in 20 minutes of your eye.
                  </p>

                  <p>
                    We want our customers to focus on the more important things for themselves and not need to plan for the little things that life needs on an everyday basis. We are here to get your chores out of your way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Lightning Fast Delivery */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast Delivery</h3>
                <p className="text-gray-700 leading-relaxed">
                  Using a backbone of technology, data sciences, and rich customer insights, we've built a dense and fast network of partner stores enabling lightning fast deliveries in 20 minutes.
                </p>
              </div>

              {/* Market Leadership */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Market Leadership</h3>
                <p className="text-gray-700 leading-relaxed">
                  We are already one of the largest e-grocery companies in India. Our ambition however, is to be 100x this size in the next five years.
                </p>
              </div>

              {/* Join Our Journey */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Join Our Journey</h3>
                <p className="text-gray-700 leading-relaxed">
                  Opportunities to create $100 billion businesses in India are rare. We are on the way and looking for the hungry. If you are ambitious, smart, and don't have an ego about it, we'd love to hear from you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
                <div className="w-24 h-1 bg-green-500 mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Shop on the go</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Get anything delivered in minutes. Buy everything from groceries to fresh fruits & vegetables,
                        cakes and bakery items, to meats & seafood, cosmetics, mobiles & accessories, electronics,
                        baby care products and much more.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Single app for all your daily needs</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Order thousands of products at just a tap - milk, eggs, bread, cooking oil, ghee, atta, rice,
                        fresh fruits & vegetables, spices, chocolates, chips, biscuits, Maggi, cold drinks, shampoos,
                        soaps, body wash, pet food, diapers, electronics, other organic and gourmet products from your
                        neighborhood stores and a lot more.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">20+ Categories</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">5000+ Products</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">20 Min Delivery</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">30+ Areas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cities We Currently Serve</h2>
              <p className="text-lg text-gray-600">Delivering across Pune with expanding coverage</p>
              <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {cities.map((city, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 hover:bg-green-50 border hover:border-green-200 rounded-lg p-4 text-center transition-all duration-200 hover:shadow-md"
                  >
                    <MapPin className="w-5 h-5 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{city}</p>
                  </div>
                ))}
                <div className="bg-gradient-to-br from-green-100 to-green-200 border border-green-300 rounded-lg p-4 text-center">
                  <p className="text-sm font-semibold text-green-800">And many more areas across Pune</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
              <p className="text-lg text-gray-300">Have questions or want to know more about our services? Reach out to us!</p>
              <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Address */}
                <div className="text-center p-6 bg-gray-800 rounded-xl">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-3">Address</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    80/4, Shop No 4, Old Sangvi Bopodi Road<br />
                    Opposite Kinara Hotel, Dapodi<br />
                    Pune, Maharashtra - 411012
                  </p>
                </div>

                {/* Email */}
                <div className="text-center p-6 bg-gray-800 rounded-xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-3">Email</h3>
                  <p className="text-sm text-gray-300">
                    <a href="mailto:info@gobazaar.in" className="hover:text-blue-400 transition-colors">
                      info@gobazaar.in
                    </a>
                  </p>
                </div>

                {/* Phone */}
                <div className="text-center p-6 bg-gray-800 rounded-xl">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-3">Phone</h3>
                  <p className="text-sm text-gray-300">
                    <a href="tel:+917558658539" className="hover:text-purple-400 transition-colors">
                      +91 7558658539
                    </a>
                  </p>
                </div>

                {/* Company */}
                <div className="text-center p-6 bg-gray-800 rounded-xl">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-3">Company</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Kaonain Pursuit Overseas Exporters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <section className="py-8 bg-gray-800 text-gray-300">
          <div className="container">
            <div className="text-center space-y-2">
              <p className="text-sm">
                © 2025 GoBazaar. All Rights Reserved.
              </p>
              <p className="text-xs">
                "GoBazaar" is owned & managed by "Kaonain Pursuit" (formerly known as Kaonain Pursuit Overseas Exporter)
              </p>
              <p className="text-xs">
                Website: <a href="https://gobazaar.in" className="text-green-400 hover:text-green-300 transition-colors">gobazaar.in</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
