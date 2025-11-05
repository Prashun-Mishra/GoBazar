"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const txnId = searchParams.get('txnId')
  
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    // Redirect to order details after 10 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (orderId) {
            router.push(`/orders/${orderId}`)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [orderId, router])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-6">
              <CheckCircle className="w-20 h-20 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. Your payment has been processed successfully.
          </p>

          {/* Order Details */}
          {orderId && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-semibold text-gray-900">{orderId.slice(0, 16)}...</span>
                </div>
                {txnId && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-medium text-gray-700">{txnId}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600">PAID</span>
                </div>
              </div>
            </div>
          )}

          {/* Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>You'll receive an order confirmation email shortly</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Our team will start preparing your order</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>You can track your order status in real-time</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Delivery within your selected time slot</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => orderId && router.push(`/orders/${orderId}`)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              <Package className="w-5 h-5 mr-2" />
              View Order Details
            </Button>
            
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="px-8 py-3"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Auto Redirect Message */}
          <p className="text-sm text-gray-500 mt-8">
            Redirecting to order details in {countdown} seconds...
          </p>
        </div>
      </div>
    </div>
  )
}
