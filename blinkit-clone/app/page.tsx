import { Header } from "@/components/header"
import { CategoryGrid } from "@/components/category-grid"
import { CustomCarousel } from "@/components/custom-carousel"
import { SmartRecommendations } from "@/components/smart-recommendations"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { BACKEND_URL } from "@/lib/api-config"
import type { Product } from "@/types"

// First 3 categories with carousel
const categoryConfig = [
  { slug: 'vegetables-fruits', name: 'Vegetables & Fruits', limit: 12 },
  { slug: 'dairy-breakfast', name: 'Dairy & Breakfast', limit: 12 },
  { slug: 'munchies', name: 'Snacks & Munchies', limit: 12 },
  { slug: 'cold-drinks-juices', name: 'Cold Drinks & Juices', limit: 12 },
  { slug: 'bakery-biscuits', name: 'Bakery & Biscuits', limit: 12 },
  { slug: 'chicken-meat-fish', name: 'Chicken, Meat & Fish', limit: 12 },
]

async function getHomePageProducts() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products/home`, {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    })

    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching homepage products:', error)
    return {}
  }
}

export default async function HomePage() {
  const categoryProducts = await getHomePageProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="container py-4">
          <div className="rounded-2xl overflow-hidden relative">
            <Image
              src="/banner-BVyzd9oP.webp"
              alt="Hero Banner"
              width={1400}
              height={400}
              className="w-full h-56 md:h-72 lg:h-80 xl:h-96 object-cover"
              priority
            />
          </div>
        </section>

        {/* Three Promotional Image Cards */}
        <section className="container py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pharmacy Card */}
            <Link
              href="/category/pharma-wellness"
              className="relative rounded-xl overflow-hidden group cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            >
              <Image
                src="/pharmacy-Bfm2sXvr.jpg"
                alt="Pharmacy at your doorstep"
                width={400}
                height={200}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                {/* <h3 className="text-lg font-bold mb-1">Pharmacy at your doorstep</h3> */}
                {/* <p className="text-sm text-gray-200">Cough syrups, pain relief and more</p> */}
              </div>
              <div className="absolute top-4 right-4">
                <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>

            {/* Pet Care Card */}
            <Link
              href="/category/pet-care"
              className="relative rounded-xl overflow-hidden group cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            >
              <Image
                src="/Pet-BySWoZKo.jpg"
                alt="Pet Care supplies in 8 minutes"
                width={400}
                height={200}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                {/* <h3 className="text-lg font-bold mb-1">Pet Care supplies in 8 minutes</h3> */}
                {/* <p className="text-sm text-gray-200">Food, treats, toys and more</p> */}
              </div>
              <div className="absolute top-4 right-4">
                <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>

            {/* Baby Care Card */}
            <Link
              href="/category/baby-care"
              className="relative rounded-xl overflow-hidden group cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            >
              <Image
                src="/babycare-a72xxgiX.jpg"
                alt="Baby care essentials"
                width={400}
                height={200}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                {/* <h3 className="text-lg font-bold mb-1">No time for a diaper run?</h3> */}
                {/* <p className="text-sm text-gray-200">Get baby care essentials in minutes</p> */}
              </div>
              <div className="absolute top-4 right-4">
                <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="container py-6">
          <CategoryGrid />
        </section>

        <SmartRecommendations context="homepage" />

        {/* Category Carousels */}
        {categoryConfig.map((config) => {
          const products = categoryProducts[config.slug] || []
          return (
            <CustomCarousel
              key={config.slug}
              products={products}
              title={config.name}
            />
          )
        })}

        {/* Welcome to GoBazaar Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              {/* Welcome Header */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Welcome to GoBazaar – Your Trusted Online Grocery Store
                </h1>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  At GoBazaar, we know how important it is to get fresh groceries for a healthy life. What you eat affects your health,
                  how much energy you have, and how happy you feel each day. We are here to help, so you do not have to give up on
                  freshness or quality. Our goal is to bring you vegetables straight from the farm, fruits in season, top-quality chicken,
                  and all your everyday needs. We deliver all these straight to your door.
                </p>
              </div>

              {/* Why Choose GoBazaar */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose GoBazaar?</h2>
                <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed mb-12">
                  We offer a wide range of products including organic vegetables, seasonal fruits, and high-quality chicken.
                  Our delivery process is designed to be quick and efficient, ensuring that your groceries arrive fresh and on time.
                  With GoBazaar, you can shop with confidence knowing that you are getting the best prices and quality.
                </p>

                {/* Delivery Process */}
                <div className="bg-green-50 rounded-2xl p-8 mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Delivery Process in India</h3>
                  <p className="text-gray-600 text-center mb-8">Ordering with GoBazaar is quick and easy for everyone.</p>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Browse Categories</h4>
                      <p className="text-sm text-gray-600">Look at all the categories and see what you like</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Add to Cart</h4>
                      <p className="text-sm text-gray-600">Put any of your top picks in the cart</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Relax & Receive</h4>
                      <p className="text-sm text-gray-600">Make your order with us and take it easy. We take care of everything else</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-center mt-8">
                    We deliver to all parts of India, and we go to big cities and many towns. Our delivery time depends on where you are
                    and how big your order is. We try to be fast and reliable every time. If you live in a metro city, you can pick
                    express delivery, so you get the things you need quicker.
                  </p>
                </div>
              </div>

              {/* Product Categories */}
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {/* Farm-Fresh Vegetables & Fruits */}
                <div className="bg-green-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Farm-Fresh Vegetables & Fruits</h3>
                  <h4 className="text-lg font-semibold text-green-700 mb-4">Pure Goodness, Every Time</h4>
                  <p className="text-gray-600 leading-relaxed">
                    There is nothing like eating fresh vegetables and juicy fruits. At GoBazaar, we make sure you have only the best
                    that you can get. The produce at our shop comes straight from local farmers. This means you get natural freshness
                    and better nutrition. You also get the original flavors. If you are looking for leafy greens, seasonal fruits,
                    or different kinds of veggies, we have it all for you.
                  </p>
                </div>

                {/* Quality Chicken & Meat */}
                <div className="bg-red-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Chicken & Meat Products</h3>
                  <h4 className="text-lg font-semibold text-red-700 mb-4">Hygienic & Fresh</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Protein helps build and keep your body strong. We want people to be healthy, so we do not take this lightly.
                    All our premium chicken and meat products are:
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2">✔</span>
                      <span>Cleaned well and handled with great care to stay safe and clean</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2">✔</span>
                      <span>Packed so it stays fresh, not kept frozen</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2">✔</span>
                      <span>Sent to you in special wrapping that keeps the right temperature</span>
                    </div>
                  </div>
                </div>

                {/* Daily Essentials */}
                <div className="bg-blue-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Daily Essentials & More</h3>
                  <h4 className="text-lg font-semibold text-blue-700 mb-4">All in One Place</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Why go to many stores when you can shop for everything in one spot? GoBazaar has what you need right here.
                  </p>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold">Dairy Products:</span> Fresh milk, paneer, cheese, curd, and butter
                    </div>
                    <div>
                      <span className="font-semibold">Bakery Items:</span> Bread, buns, cakes, and biscuits
                    </div>
                    <div>
                      <span className="font-semibold">Grains & Staples:</span> Rice, wheat flour, pulses, and spices
                    </div>
                    <div>
                      <span className="font-semibold">Personal Care:</span> Soaps, shampoos, and skincare products
                    </div>
                    <div>
                      <span className="font-semibold">Cleaning Products:</span> Detergents, floor cleaners, and dishwashing solutions
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Shop at GoBazaar */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white">
                <h2 className="text-3xl font-bold text-center mb-8">Why Shop at GoBazaar?</h2>
                <p className="text-green-100 text-center mb-12 text-lg">
                  Shopping with GoBazaar is easy and makes sense. It is also safe and costs less money. A lot of people trust us, and here is why:
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <span className="text-green-300 mr-3 text-xl">✔</span>
                      <div>
                        <h4 className="font-semibold mb-2">Fresh & Organic Produce</h4>
                        <p className="text-green-100 text-sm">
                          We pick our vegetables and fruits by hand. They come straight from farmers to you, packed with care by our team.
                          This makes sure you get the freshest food every time. There are no middlemen and no old stock.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-green-300 mr-3 text-xl">✔</span>
                      <div>
                        <h4 className="font-semibold mb-2">Premium Meat & Chicken</h4>
                        <p className="text-green-100 text-sm">
                          Get fresh chicken and meat that is packed with care. The meat and chicken are prepared in a clean environment.
                          They are handled with strong safety rules. Every piece meets our high-quality levels.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <span className="text-green-300 mr-3 text-xl">✔</span>
                      <div>
                        <h4 className="font-semibold mb-2">Fast & Reliable Delivery</h4>
                        <p className="text-green-100 text-sm">
                          We know that your time is important. We use an efficient delivery network so your groceries get to you quickly
                          and on time. If you are in select metro cities, we also have express delivery options for you.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-green-300 mr-3 text-xl">✔</span>
                      <div>
                        <h4 className="font-semibold mb-2">Best Prices Guaranteed</h4>
                        <p className="text-green-100 text-sm">
                          Get exclusive deals, discounts, and combo offers here. Shop more to save more and make the most of your grocery budget.
                          You do not have to give up good quality to pay these low prices.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Link
                    href="/categories"
                    className="inline-flex items-center bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-4 rounded-lg transition-colors"
                  >
                    Start Shopping Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Healthy Eating Tips & Food Safety Standards */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Health & Safety Matter</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover expert tips for healthy eating and learn about our stringent food safety standards
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Healthy Eating Tips */}
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Healthy Eating Tips</h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    Learn how to make nutritious choices, plan balanced meals, and maintain a healthy lifestyle
                    with fresh ingredients from GoBazaar. Our experts share practical tips for better nutrition.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">Choose seasonal fruits and vegetables for maximum nutrition</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">Include variety in your diet with different colored produce</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">Plan balanced meals with proper portions of all food groups</span>
                    </div>
                  </div>

                  <Link
                    href="/healthy-eating-tips"
                    className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Read More Tips
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>

                {/* Food Safety Standards */}
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Food Safety Standards</h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    Discover our comprehensive food safety protocols, quality assurance measures, and hygiene
                    standards that ensure every product reaches you fresh, safe, and of the highest quality.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">FSSAI certified facilities with regular quality audits</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">Temperature-controlled storage and delivery systems</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">Strict hygiene protocols for meat and dairy products</span>
                    </div>
                  </div>

                  <Link
                    href="/food-safety-standards"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Learn About Safety
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
