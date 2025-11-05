"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, MapPin } from "lucide-react"

export default function OrderSuccessPage() {
  const orderId = "BK" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container py-16">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>

          <p className="text-gray-600 mb-6">Thank you for your order. Your groceries will be delivered soon.</p>

          <div className="bg-white rounded-lg p-6 mb-8 text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Order ID</span>
              <span className="font-mono font-medium">{orderId}</span>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium">Estimated Delivery</div>
                <div className="text-sm text-gray-600">8-15 minutes</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium">Delivery Address</div>
                <div className="text-sm text-gray-600">123 Main Street, New Delhi</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/orders">
              <Button className="w-full bg-green-600 hover:bg-green-700">Track Your Order</Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
