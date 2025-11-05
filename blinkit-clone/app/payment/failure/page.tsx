"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { XCircle, Home, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

function PaymentFailureContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const message = searchParams.get('message') || 'Payment failed. Please try again.'

  const handleRetryPayment = () => {
    if (orderId) {
      // Redirect to checkout with the same order
      router.push(`/checkout?retryOrder=${orderId}`)
    } else {
      router.push('/checkout')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          {/* Failure Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 rounded-full p-6">
              <XCircle className="w-20 h-20 text-red-600" />
            </div>
          </div>

          {/* Failure Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Failed
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            We couldn't process your payment.
          </p>
          
          <p className="text-md text-red-600 mb-8">
            {decodeURIComponent(message)}
          </p>

          {/* Common Reasons */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Common reasons for payment failure:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Insufficient funds in your account</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Incorrect card details or OTP</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Payment gateway timeout</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Bank's security restrictions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Network connectivity issues</span>
              </li>
            </ul>
          </div>

          {/* Support Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-sm text-blue-800">
              If you continue to face issues, please contact our support team at{" "}
              <a href="mailto:support@gobazar.com" className="underline font-semibold">
                support@gobazar.com
              </a>{" "}
              or call us at{" "}
              <a href="tel:+911234567890" className="underline font-semibold">
                +91 123-456-7890
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleRetryPayment}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Retry Payment
            </Button>
            
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="px-8 py-3"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Home
            </Button>
          </div>

          {/* Order ID if available */}
          {orderId && (
            <p className="text-sm text-gray-500 mt-8">
              Order ID: {orderId.slice(0, 16)}...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentFailureContent />
    </Suspense>
  )
}
