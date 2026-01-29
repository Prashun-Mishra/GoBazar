"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Shield,
  Thermometer,
  CheckCircle,
  Award,
  Truck,
  Clock,
  Users,
  Building2,
  Microscope,
  FileCheck,
  AlertTriangle,
  Leaf
} from "lucide-react"

export default function FoodSafetyClient() {
  const safetyStandards = [
    {
      icon: Award,
      title: "FSSAI Certification",
      description: "Our facilities are certified by the Food Safety and Standards Authority of India (FSSAI) with license number 21525082002055.",
      features: [
        "Regular compliance audits and inspections",
        "Adherence to national food safety regulations",
        "Certified food handling processes",
        "Documented quality management systems"
      ]
    },
    {
      icon: Thermometer,
      title: "Temperature Control",
      description: "Maintaining proper temperature throughout the supply chain to preserve freshness and prevent spoilage.",
      features: [
        "Cold chain management for dairy and meat",
        "Temperature monitoring at all stages",
        "Refrigerated storage facilities",
        "Insulated delivery vehicles"
      ]
    },
    {
      icon: Microscope,
      title: "Quality Testing",
      description: "Rigorous testing protocols ensure all products meet our high-quality standards before reaching customers.",
      features: [
        "Microbiological testing for contaminants",
        "Chemical residue analysis",
        "Nutritional content verification",
        "Shelf-life validation studies"
      ]
    },
    {
      icon: Users,
      title: "Staff Training",
      description: "Our team is trained in food safety protocols and hygiene practices to maintain the highest standards.",
      features: [
        "Regular food safety training programs",
        "Personal hygiene protocols",
        "Proper handling techniques",
        "Emergency response procedures"
      ]
    }
  ]

  const supplyChainSteps = [
    {
      step: "1",
      title: "Source Selection",
      description: "We partner with certified farmers and suppliers who follow sustainable and safe farming practices.",
      icon: Leaf
    },
    {
      step: "2",
      title: "Quality Inspection",
      description: "Every batch undergoes thorough quality checks before entering our inventory system.",
      icon: FileCheck
    },
    {
      step: "3",
      title: "Proper Storage",
      description: "Products are stored in controlled environments with optimal temperature and humidity levels.",
      icon: Building2
    },
    {
      step: "4",
      title: "Safe Delivery",
      description: "Temperature-controlled vehicles ensure products maintain freshness during transportation.",
      icon: Truck
    }
  ]

  const certifications = [
    {
      name: "FSSAI License",
      number: "21525082002055",
      description: "Food Safety and Standards Authority of India certification",
      icon: Award
    },
    {
      name: "ISO 22000",
      number: "Food Safety Management",
      description: "International standard for food safety management systems",
      icon: Shield
    },
    {
      name: "HACCP",
      number: "Hazard Analysis",
      description: "Critical Control Points system for food safety",
      icon: CheckCircle
    },
    {
      name: "Cold Chain",
      number: "Temperature Certified",
      description: "Certified cold chain management for perishables",
      icon: Thermometer
    }
  ]

  const productCategories = [
    {
      category: "Fresh Produce",
      standards: [
        "Pesticide residue testing within safe limits",
        "Visual inspection for quality and freshness",
        "Proper washing and sanitization",
        "Optimal storage conditions maintained"
      ],
      color: "green"
    },
    {
      category: "Dairy Products",
      standards: [
        "Pasteurization process verification",
        "Cold chain maintenance below 4°C",
        "Bacterial count testing",
        "Expiry date monitoring system"
      ],
      color: "blue"
    },
    {
      category: "Meat & Poultry",
      standards: [
        "Halal certification for applicable products",
        "Temperature control during processing",
        "Hygiene protocols in handling",
        "Vacuum packaging for freshness"
      ],
      color: "red"
    },
    {
      category: "Packaged Foods",
      standards: [
        "Seal integrity verification",
        "Label accuracy and compliance",
        "Storage condition adherence",
        "Batch tracking and traceability"
      ],
      color: "purple"
    }
  ]

  const hygieneProtocols = [
    {
      area: "Facility Hygiene",
      protocols: [
        "Daily sanitization of all surfaces",
        "Pest control management",
        "Air quality monitoring",
        "Waste management systems"
      ]
    },
    {
      area: "Personal Hygiene",
      protocols: [
        "Hand washing stations at entry points",
        "Protective clothing requirements",
        "Health screening for staff",
        "Training on hygiene practices"
      ]
    },
    {
      area: "Equipment Safety",
      protocols: [
        "Regular cleaning and maintenance",
        "Calibration of measuring instruments",
        "Sanitization between product batches",
        "Equipment validation procedures"
      ]
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Food Safety Standards</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Discover our comprehensive food safety protocols and quality assurance measures that ensure every product reaches you fresh and safe.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to Food Safety</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At GoBazaar, food safety is our top priority. We implement stringent quality control measures,
                maintain proper hygiene standards, and follow all regulatory requirements to ensure that every
                product delivered to your doorstep meets the highest safety and quality standards.
              </p>
            </div>
          </div>
        </section>

        {/* Safety Standards */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Safety Framework</h2>
                <p className="text-lg text-gray-600">Comprehensive measures to ensure food safety at every step</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {safetyStandards.map((standard, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <standard.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{standard.title}</h3>
                    </div>

                    <p className="text-gray-600 mb-6">{standard.description}</p>

                    <div className="space-y-3">
                      {standard.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Supply Chain Process */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Safe Supply Chain Process</h2>
                <p className="text-lg text-gray-600">From farm to your doorstep - ensuring safety at every step</p>
              </div>

              <div className="space-y-8">
                {supplyChainSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-6 flex-shrink-0 font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <step.icon className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-blue-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Certifications</h2>
                <p className="text-lg text-gray-600">Recognized standards and certifications we maintain</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <cert.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{cert.name}</h3>
                    <p className="text-sm font-medium text-blue-600 mb-2">{cert.number}</p>
                    <p className="text-xs text-gray-600">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Category Standards */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Category-Specific Standards</h2>
                <p className="text-lg text-gray-600">Tailored safety measures for different product categories</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {productCategories.map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">{category.category}</h3>
                    <div className="space-y-4">
                      {category.standards.map((standard, standardIndex) => (
                        <div key={standardIndex} className="flex items-start">
                          <div className={`w-3 h-3 bg-${category.color}-500 rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                          <span className="text-sm text-gray-700">{standard}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hygiene Protocols */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Hygiene Protocols</h2>
                <p className="text-lg text-gray-600">Comprehensive hygiene measures across all operations</p>
              </div>

              <div className="space-y-8">
                {hygieneProtocols.map((protocol, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">{protocol.area}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {protocol.protocols.map((item, itemIndex) => (
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

        {/* Emergency Protocols */}
        <section className="py-16 bg-yellow-50 border-y border-yellow-200">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mr-6 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Response</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    In case of any food safety concerns or quality issues, we have established emergency protocols
                    to address problems quickly and effectively. Our team is trained to handle recalls,
                    contamination issues, and customer complaints with immediate action.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 border border-yellow-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Immediate Response</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Product isolation and investigation</li>
                        <li>• Customer notification system</li>
                        <li>• Supplier communication protocol</li>
                        <li>• Regulatory authority reporting</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-yellow-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Customer Support</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• 24/7 emergency hotline</li>
                        <li>• Immediate refund processing</li>
                        <li>• Health concern assistance</li>
                        <li>• Follow-up and resolution</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Shop with Confidence</h2>
              <p className="text-blue-100 mb-8">
                Our rigorous food safety standards ensure that every product you receive meets the highest quality and safety requirements.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Shopping Safely
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
