"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Truck,
  Leaf,
  ShoppingCart,
  Heart,
  Star,
  TrendingUp
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const featuredPost = {
    id: "quick-grocery-delivery-pune",
    title: "How GoBazaar is Revolutionizing Grocery Delivery in Pune",
    excerpt: "Discover how we're making fresh groceries available at your doorstep in just 20 minutes across Pune with our innovative delivery network.",
    image: "/placeholder.svg?height=400&width=800",
    author: "GoBazaar Team",
    date: "October 25, 2025",
    readTime: "5 min read",
    category: "Company News"
  }

  const blogPosts = [
    {
      id: "fresh-produce-tips",
      title: "5 Tips to Keep Your Fresh Produce Longer",
      excerpt: "Learn expert tips on how to store fruits and vegetables to maintain freshness and reduce food waste.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Nutrition Team",
      date: "October 20, 2025",
      readTime: "4 min read",
      category: "Health & Nutrition",
      icon: Leaf
    },
    {
      id: "quick-meal-prep",
      title: "Quick Meal Prep Ideas for Busy Professionals",
      excerpt: "Discover time-saving meal prep strategies using ingredients available on GoBazaar for healthy eating on-the-go.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Chef Priya",
      date: "October 18, 2025",
      readTime: "6 min read",
      category: "Recipes & Cooking",
      icon: Heart
    },
    {
      id: "sustainable-shopping",
      title: "Sustainable Shopping: Eco-Friendly Choices",
      excerpt: "Make environmentally conscious choices while grocery shopping. Learn about our organic and eco-friendly product range.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Sustainability Team",
      date: "October 15, 2025",
      readTime: "5 min read",
      category: "Sustainability",
      icon: Leaf
    },
    {
      id: "festival-shopping-guide",
      title: "Complete Festival Shopping Guide 2025",
      excerpt: "Everything you need for upcoming festivals - from traditional ingredients to modern conveniences, all delivered in 20 minutes.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Cultural Team",
      date: "October 12, 2025",
      readTime: "7 min read",
      category: "Festivals & Culture",
      icon: Star
    },
    {
      id: "grocery-budgeting",
      title: "Smart Grocery Budgeting in 2025",
      excerpt: "Practical tips to manage your grocery budget effectively while maintaining quality and nutrition for your family.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Finance Team",
      date: "October 10, 2025",
      readTime: "4 min read",
      category: "Money Saving",
      icon: TrendingUp
    },
    {
      id: "delivery-technology",
      title: "The Technology Behind 20-Minute Delivery",
      excerpt: "Explore the innovative technology and logistics that make our ultra-fast grocery delivery possible across Pune.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Tech Team",
      date: "October 8, 2025",
      readTime: "6 min read",
      category: "Technology",
      icon: Truck
    }
  ]

  const categories = [
    "All Posts",
    "Company News", 
    "Health & Nutrition",
    "Recipes & Cooking",
    "Sustainability",
    "Technology",
    "Money Saving",
    "Festivals & Culture"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">GoBazaar Blog</h1>
              <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
                Fresh insights, tips, and stories about grocery shopping, healthy living, and quick delivery in Pune.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Featured Post
                </span>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden mb-6 lg:mb-0">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{featuredPost.author}</span>
                    </div>
                    
                    <Link
                      href={`/blog/${featuredPost.id}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-gray-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      index === 0
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-600 hover:bg-green-50 hover:text-green-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 rounded-t-xl overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium flex items-center">
                          <post.icon className="w-3 h-3 mr-1" />
                          {post.category}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="w-3 h-3 mr-1" />
                          {post.author}
                        </div>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <Link
                          href={`/blog/${post.id}`}
                          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
                        >
                          Read Article
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-green-100 mb-8">
                Subscribe to our newsletter for the latest tips, recipes, and updates from GoBazaar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Subscribe
                </button>
              </div>
              
              <p className="text-green-200 text-sm mt-4">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Popular Topics</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Quick Recipes", count: "25 articles", icon: Heart },
                  { title: "Health Tips", count: "18 articles", icon: Leaf },
                  { title: "Delivery Updates", count: "12 articles", icon: Truck },
                  { title: "Shopping Guides", count: "30 articles", icon: ShoppingCart }
                ].map((topic, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <topic.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{topic.title}</h3>
                    <p className="text-sm text-gray-600">{topic.count}</p>
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
