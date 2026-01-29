"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Heart,
  Apple,
  Leaf,
  Clock,
  CheckCircle,
  Utensils,
  Droplets,
  Sun,
  Moon,
  Target,
  TrendingUp,
  Shield
} from "lucide-react"
import Image from "next/image"

export default function HealthyEatingTipsClient() {
  const nutritionTips = [
    {
      icon: Apple,
      title: "Eat the Rainbow",
      description: "Include fruits and vegetables of different colors in your diet. Each color provides unique nutrients and antioxidants.",
      tips: [
        "Red: Tomatoes, red peppers, strawberries for lycopene",
        "Orange: Carrots, oranges, sweet potatoes for beta-carotene",
        "Green: Spinach, broccoli, kiwi for folate and iron",
        "Purple: Eggplant, blueberries, grapes for anthocyanins"
      ]
    },
    {
      icon: Clock,
      title: "Meal Timing Matters",
      description: "When you eat is as important as what you eat. Proper meal timing helps maintain energy levels and metabolism.",
      tips: [
        "Eat breakfast within 2 hours of waking up",
        "Have lunch between 12-2 PM for optimal digestion",
        "Keep dinner light and finish 3 hours before bedtime",
        "Include healthy snacks between meals if needed"
      ]
    },
    {
      icon: Droplets,
      title: "Stay Hydrated",
      description: "Proper hydration is essential for all body functions, from digestion to temperature regulation.",
      tips: [
        "Drink 8-10 glasses of water daily",
        "Start your day with a glass of warm water",
        "Include water-rich foods like cucumber, watermelon",
        "Limit sugary drinks and excessive caffeine"
      ]
    },
    {
      icon: Target,
      title: "Portion Control",
      description: "Understanding proper portion sizes helps maintain a healthy weight and prevents overeating.",
      tips: [
        "Use smaller plates to control portion sizes",
        "Fill half your plate with vegetables",
        "Include a palm-sized portion of protein",
        "Add a thumb-sized portion of healthy fats"
      ]
    }
  ]

  const seasonalGuide = [
    {
      season: "Spring",
      icon: Leaf,
      color: "green",
      foods: ["Spinach", "Peas", "Artichokes", "Asparagus", "Strawberries"],
      benefits: "Rich in detoxifying nutrients to cleanse after winter"
    },
    {
      season: "Summer",
      icon: Sun,
      color: "yellow",
      foods: ["Mangoes", "Watermelon", "Cucumber", "Tomatoes", "Corn"],
      benefits: "High water content helps maintain hydration and cooling"
    },
    {
      season: "Monsoon",
      icon: Droplets,
      color: "blue",
      foods: ["Bottle Gourd", "Ridge Gourd", "Okra", "Pomegranate", "Ginger"],
      benefits: "Boosts immunity and aids digestion during humid weather"
    },
    {
      season: "Winter",
      icon: Moon,
      color: "purple",
      foods: ["Carrots", "Beetroot", "Oranges", "Guava", "Sweet Potato"],
      benefits: "Provides warmth and essential vitamins during cold months"
    }
  ]

  const mealPlanningTips = [
    {
      title: "Weekly Meal Prep",
      description: "Plan and prepare meals in advance to ensure healthy eating throughout the week.",
      steps: [
        "Plan your weekly menu on Sunday",
        "Make a detailed grocery list",
        "Prep vegetables and proteins in batches",
        "Store prepared ingredients properly"
      ]
    },
    {
      title: "Balanced Plate Method",
      description: "Create nutritionally balanced meals using the plate method for proper proportions.",
      steps: [
        "Fill 1/2 plate with non-starchy vegetables",
        "Add 1/4 plate of lean protein",
        "Include 1/4 plate of whole grains",
        "Add a small portion of healthy fats"
      ]
    },
    {
      title: "Smart Snacking",
      description: "Choose nutritious snacks that provide energy and keep you satisfied between meals.",
      steps: [
        "Combine protein with complex carbs",
        "Include fruits with nuts or yogurt",
        "Keep portion sizes moderate",
        "Avoid processed and sugary snacks"
      ]
    }
  ]

  const nutritionMyths = [
    {
      myth: "Carbs are bad for you",
      fact: "Complex carbohydrates from whole grains, fruits, and vegetables provide essential energy and nutrients."
    },
    {
      myth: "Eating fat makes you fat",
      fact: "Healthy fats from nuts, avocados, and olive oil are essential for hormone production and nutrient absorption."
    },
    {
      myth: "Skipping meals helps lose weight",
      fact: "Regular meals maintain metabolism and prevent overeating. Skipping meals can slow down metabolism."
    },
    {
      myth: "Fresh is always better than frozen",
      fact: "Frozen fruits and vegetables are often as nutritious as fresh, sometimes even more due to quick freezing."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Healthy Eating Tips</h1>
              <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
                Discover expert nutrition advice and practical tips for a healthier lifestyle with fresh ingredients from GoBazaar.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nutrition Made Simple</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Good nutrition doesn't have to be complicated. With the right knowledge and fresh ingredients,
                you can make healthy choices that nourish your body and support your wellbeing. At GoBazaar,
                we're committed to providing you with the freshest produce and expert guidance for your health journey.
              </p>
            </div>
          </div>
        </section>

        {/* Core Nutrition Tips */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Essential Nutrition Guidelines</h2>
                <p className="text-lg text-gray-600">Build healthy habits with these fundamental nutrition principles</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {nutritionTips.map((tip, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <tip.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{tip.title}</h3>
                    </div>

                    <p className="text-gray-600 mb-6">{tip.description}</p>

                    <div className="space-y-3">
                      {tip.tips.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Eating Guide */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Seasonal Eating Guide</h2>
                <p className="text-lg text-gray-600">Eat with the seasons for optimal nutrition and flavor</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {seasonalGuide.map((season, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                    <div className={`w-16 h-16 bg-${season.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <season.icon className={`w-8 h-8 text-${season.color}-600`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{season.season}</h3>
                    <div className="space-y-2 mb-4">
                      {season.foods.map((food, foodIndex) => (
                        <span key={foodIndex} className="inline-block bg-white px-2 py-1 rounded text-xs text-gray-700 mr-1 mb-1">
                          {food}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">{season.benefits}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meal Planning Section */}
        <section className="py-16 bg-green-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Meal Planning</h2>
                <p className="text-lg text-gray-600">Plan ahead for consistent healthy eating</p>
              </div>

              <div className="space-y-8">
                {mealPlanningTips.map((tip, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{tip.title}</h3>
                    <p className="text-gray-600 mb-6">{tip.description}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      {tip.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-xs font-bold text-green-600">{stepIndex + 1}</span>
                          </div>
                          <span className="text-sm text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nutrition Myths */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Busting Nutrition Myths</h2>
                <p className="text-lg text-gray-600">Separate fact from fiction with evidence-based nutrition</p>
              </div>

              <div className="space-y-6">
                {nutritionMyths.map((item, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-red-800 mb-2">❌ Myth:</h4>
                        <p className="text-red-700">{item.myth}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">✅ Fact:</h4>
                        <p className="text-green-700">{item.fact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Start Your Healthy Journey Today</h2>
              <p className="text-green-100 mb-8">
                Get fresh, nutritious ingredients delivered to your doorstep and put these healthy eating tips into practice.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Shop Fresh Ingredients
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
