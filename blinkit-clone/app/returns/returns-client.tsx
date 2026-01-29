"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  RotateCcw,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Package,
  Home,
  Apple,
  Coffee,
  ShoppingBag,
  Utensils,
  Droplets,
  Heart,
  Sparkles,
  Baby
} from "lucide-react"

export default function ReturnsClient() {
  const returnCategories = [
    {
      id: "home-kitchen",
      title: "Home & Kitchen",
      icon: Home,
      returnable: true,
      days: "7 days",
      items: "Pooja Needs, Electrical, Mops, Brushes & Scrubs, Furnishing, Stationery, Auto Care, Toys, Games & Fitness, Kitchenware Dining, Bags & Travel Luggage",
      conditions: "You may return the Product if it is damaged, defective or is not in working condition, or if parts of the Product or accessory is missing, or if the Product delivered is different from what was ordered basis the Product description provided on go bazaar. In addition to the aforementioned conditions, we will accept the return if you keep the Products in its original condition, along with brand outer box, MRP tags attached, user manual, warranty cards, and original accessories in manufacturer packaging for a successful return pick-up."
    },
    {
      id: "fruits-vegetables",
      title: "Fruit & Vegetables",
      icon: Apple,
      returnable: false,
      days: "24 hours",
      items: "Fresh Fruits, Fresh Vegetables, Herbs & Seasonings, Exotic Fruits & Vegetables",
      conditions: "Products under this category are non-returnable due to consumable nature of the Products. However, in an unlikely event of you having concerns with the wrong product delivered, quality, freshness or physical condition of the Product delivered, you may return the Product on door-step delivery for the aforesaid reasons. Raising a request for refund beyond 24 hours of order delivery will result in your refund request being rejected."
    },
    {
      id: "dairy-bakery",
      title: "Dairy & Bakery",
      icon: Coffee,
      returnable: false,
      days: "24 hours",
      items: "Dairy, Toast & Khari, Breads and Buns, Bakery Snacks, Batter & Chutney, Cheese, Ghee Paneer & Tofu",
      conditions: "Products under this category are non-returnable due to consumable nature of the Products. However, in an unlikely event of you having concerns with the quality, freshness or physical condition of the Product delivered, you may return the Product on door-step delivery for the aforesaid reasons. Raising a request for refund beyond 24 hours of order delivery will result in your refund request being rejected."
    },
    {
      id: "staples",
      title: "Staples",
      icon: Package,
      returnable: false,
      days: "24 hours",
      items: "Atta, Flours & Sooji, Dals & Pulses, Rice & Rice Products, Edible Oils, Masalas & Spices, Salt, Sugar & Jaggery, Soya Products, Wheat & Other Grains, Dry Fruits & Nuts",
      conditions: "Products under this category are non-returnable due to consumable nature of the Products. However, in an unlikely event of you having concerns with the quality, freshness or physical condition of the Product delivered, you may return the Product on door-step delivery for the aforesaid reasons. Raising a request for refund beyond 24 hours of order delivery will result in your refund request being rejected."
    },
    {
      id: "disposable",
      title: "Disposable",
      icon: Utensils,
      returnable: false,
      days: "24 hours",
      items: "Plates & Glasses, Kitchen & Toilet Rolls, Paper Tissues & Napkins",
      conditions: "Products under this category are non-returnable due to consumable nature of the Products. However, in an unlikely event of you having concerns with the quality, freshness or physical condition of the Product delivered, you may return the Product on door-step delivery for the aforesaid reasons. Raising a request for refund beyond 24 hours of order delivery will result in your refund request being rejected."
    },
    {
      id: "snacks-branded",
      title: "Snacks & Branded Foods",
      icon: ShoppingBag,
      returnable: false,
      days: "24 hours",
      items: "Biscuits & Cookies, Noodle, Pasta, Vermicelli, Breakfast Cereals, Snacks & Namkeen, Chocolates & Candies, Ready To Cook & Eat, Frozen Veggies & Snacks, Spreads, Sauces, Ketchup, Indian Sweets Pickles & Chutney, Extracts & Flavoring",
      conditions: "Products under this category are non-returnable due to consumable nature of the Products. However, in an unlikely event of you having concerns with the quality, freshness or physical condition of the Product delivered, you may return the Product on door-step delivery for the aforesaid reasons. Raising a request for refund beyond 24 hours of order delivery will result in your refund request being rejected."
    },
    {
      id: "beverages",
      title: "Beverages",
      icon: Droplets,
      returnable: false,
      days: "24 hours",
      items: "Tea, Coffee, Fruit juices, Energy & Soft Drinks, Health Drink & Supplement, Soda & Flavored Water",
      conditions: "Products under this category are non-returnable due to consumable nature of the Products. However, in an unlikely event of you having concerns with the quality, freshness or physical condition of the Product delivered, you may return the Product on door-step delivery for the aforesaid reasons. Raising a request for refund beyond 24 hours of order delivery will result in your refund request being rejected."
    },
    {
      id: "personal-care",
      title: "Personal Care",
      icon: Heart,
      returnable: false,
      days: "24 hours",
      items: "Hair Care, Oral Care, Skin Care, Bath & Hand Wash, Body Wash & Bathing Accessories, Feminine Hygiene, Men's Grooming, Deo & Fragrances, Health & Wellness, Makeup",
      conditions: "Products under this category are non-returnable due to hygiene/personal care/wellness, and consumable nature of the Product. However, in an unlikely event of you having concerns with the quality, freshness or physical condition of the Product delivered, you may return the Product on door-step delivery for the aforesaid reasons. Raising a request for refund beyond 24 hours of order delivery will result in your refund request being rejected."
    },
    {
      id: "home-care",
      title: "Home Care",
      icon: Sparkles,
      returnable: false,
      days: "24 hours",
      items: "Detergents, Dish wash, All Purpose Cleaners, Fresheners & Repellents",
      conditions: "Products under this category are non-returnable due to hygiene/personal care/wellness, and consumable nature of the Product. However, in an unlikely event of you having concerns with the quality, freshness or physical condition of the Product delivered, you may return the Product on door-step delivery for the aforesaid reasons. Raising a request for refund beyond 24 hours of order delivery will result in your refund request being rejected."
    },
    {
      id: "baby-care-consumable",
      title: "Mom & Baby Care (Consumables)",
      icon: Baby,
      returnable: false,
      days: "24 hours",
      items: "Baby Grooming, Baby Bath & Hygiene, Baby Food & Formula, Diapers & Wipes, Feeding, Baby Health & Wellness",
      conditions: "Products under this category are non-returnable due to hygiene/personal care/wellness, and consumable nature of the Product. However, in an unlikely event of you having concerns with the quality, freshness or physical condition of the Product delivered, you may return the Product on door-step delivery for the aforesaid reasons. Raising a request for refund beyond 24 hours of order delivery will result in your refund request being rejected."
    },
    {
      id: "baby-care-durable",
      title: "Mom & Baby Care (Durables)",
      icon: Baby,
      returnable: true,
      days: "7 days",
      items: "Baby Gear, Baby Bedding Sets & Pillows, Baby Furnishing, Baby Furniture, Child Proof & Safety, Baby Toys, Mom & Maternity",
      conditions: "You may return the Product if it is damaged, defective or is not in working condition, or if parts of the Product or accessory is missing, or if the Product delivered is different from what was ordered basis the Product description provided on go bazaar. In addition to the aforementioned conditions, we will accept the return if you keep the Products in its original condition, along with brand outer box, MRP tags attached, user manual, warranty cards, and original accessories in manufacturer packaging for a successful return pick-up."
    }
  ]

  const returnableCategories = returnCategories.filter(cat => cat.returnable)
  const nonReturnableCategories = returnCategories.filter(cat => !cat.returnable)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 text-white py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <RotateCcw className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Return Policy</h1>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed">
                Detailed return timeline and conditions for all product categories on GoBazaar.
              </p>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Returnable Items</h3>
                  <p className="text-sm text-gray-600">Home & Kitchen, Baby Durables</p>
                  <p className="text-lg font-bold text-green-600 mt-2">7 Days</p>
                </div>

                <div className="text-center p-6 bg-red-50 rounded-xl">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Non-Returnable</h3>
                  <p className="text-sm text-gray-600">Consumable & Personal Care</p>
                  <p className="text-lg font-bold text-red-600 mt-2">Quality Issues Only</p>
                </div>

                <div className="text-center p-6 bg-yellow-50 rounded-xl">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quality Complaints</h3>
                  <p className="text-sm text-gray-600">All Categories</p>
                  <p className="text-lg font-bold text-yellow-600 mt-2">24 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Returnable Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">7 Days Returnable Categories</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {returnableCategories.map((category) => (
                  <div key={category.id} className="bg-white rounded-xl p-8 shadow-sm border-l-4 border-green-500">
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <category.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                        <div className="flex items-center mb-3">
                          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                            {category.days} Returnable
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Includes:</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{category.items}</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Return Conditions:</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{category.conditions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Non-Returnable Categories */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Non-Returnable Categories</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nonReturnableCategories.map((category) => (
                  <div key={category.id} className="bg-gray-50 rounded-xl p-6 border-l-4 border-red-500">
                    <div className="flex items-start mb-4">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <category.icon className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                          Non-Returnable
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-gray-600 leading-relaxed">{category.items}</p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                        <span className="text-xs font-medium text-yellow-800">Quality Issues Only</span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Return only for quality, freshness, or physical condition issues at doorstep delivery.
                        Complaints must be raised within 24 hours.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Return Process */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Return Process</h2>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: "1", title: "Check Category", desc: "Verify if your product category is returnable" },
                  { step: "2", title: "Timeline", desc: "Ensure you're within the return timeline" },
                  { step: "3", title: "Condition", desc: "Keep product in original condition with packaging" },
                  { step: "4", title: "Request", desc: "Contact support to initiate return process" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 bg-orange-600 text-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Need Help with Returns?</h2>
              <p className="text-orange-100 mb-6">
                Our customer support team is ready to assist you with any return-related queries.
              </p>
              <a
                href="mailto:info@gobazaar.in"
                className="inline-flex items-center bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
