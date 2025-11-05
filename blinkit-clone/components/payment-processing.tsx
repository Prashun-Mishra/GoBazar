"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, CreditCard, Smartphone, AlertCircle } from "lucide-react"

interface PaymentProcessingProps {
  paymentMethod: string
  amount: number
  onSuccess: () => void
  onFailure: (error: string) => void
  onRetry: () => void
}

type PaymentStatus = "processing" | "success" | "failed" | "timeout"

export function PaymentProcessing({ paymentMethod, amount, onSuccess, onFailure, onRetry }: PaymentProcessingProps) {
  const [status, setStatus] = useState<PaymentStatus>("processing")
  const [countdown, setCountdown] = useState(120) // 2 minutes timeout
  const [transactionId, setTransactionId] = useState<string>("")

  useEffect(() => {
    // Generate transaction ID
    setTransactionId(`TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`)

    // Simulate payment processing
    const timer = setTimeout(
      () => {
        // 80% success rate for demo
        const success = Math.random() > 0.2
        if (success) {
          setStatus("success")
          setTimeout(() => onSuccess(), 1500)
        } else {
          setStatus("failed")
          onFailure("Payment failed due to insufficient funds or network error")
        }
      },
      3000 + Math.random() * 2000,
    ) // 3-5 seconds

    // Countdown timer
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setStatus("timeout")
          onFailure("Payment timeout. Please try again.")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(countdownTimer)
    }
  }, [onSuccess, onFailure])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatPrice = (price: number) => `₹${price.toFixed(2)}`

  const getPaymentMethodIcon = () => {
    switch (paymentMethod) {
      case "upi":
        return <Smartphone className="w-8 h-8" />
      case "card":
        return <CreditCard className="w-8 h-8" />
      default:
        return <CreditCard className="w-8 h-8" />
    }
  }

  const getStatusContent = () => {
    switch (status) {
      case "processing":
        return {
          icon: <Clock className="w-16 h-16 text-blue-600 animate-pulse" />,
          title: "Processing Payment",
          message:
            paymentMethod === "upi"
              ? "Please complete the payment in your UPI app"
              : "Please wait while we process your payment",
          color: "blue",
        }
      case "success":
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-600" />,
          title: "Payment Successful!",
          message: "Your order has been placed successfully",
          color: "green",
        }
      case "failed":
        return {
          icon: <XCircle className="w-16 h-16 text-red-600" />,
          title: "Payment Failed",
          message: "There was an issue processing your payment",
          color: "red",
        }
      case "timeout":
        return {
          icon: <AlertCircle className="w-16 h-16 text-orange-600" />,
          title: "Payment Timeout",
          message: "The payment session has expired",
          color: "orange",
        }
    }
  }

  const statusContent = getStatusContent()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-8 text-center">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">{statusContent.icon}</div>

        {/* Status Title */}
        <h2 className={`text-2xl font-bold mb-4 text-${statusContent.color}-600`}>{statusContent.title}</h2>

        {/* Status Message */}
        <p className="text-gray-600 mb-6">{statusContent.message}</p>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            {getPaymentMethodIcon()}
            <span className="font-medium capitalize">{paymentMethod}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{formatPrice(amount)}</div>
          {transactionId && (
            <div className="text-xs text-gray-500">
              Transaction ID: <span className="font-mono">{transactionId}</span>
            </div>
          )}
        </div>

        {/* Processing State */}
        {status === "processing" && (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Time remaining: {formatTime(countdown)}</span>
            </div>

            {paymentMethod === "upi" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Smartphone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Complete payment in your UPI app</p>
                    <p>Check your phone for a payment request notification</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Payment completed successfully</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Redirecting to order confirmation...</p>
          </div>
        )}

        {/* Failed State */}
        {(status === "failed" || status === "timeout") && (
          <div className="space-y-4">
            <div className={`bg-${statusContent.color}-50 border border-${statusContent.color}-200 rounded-lg p-4`}>
              <div className={`text-${statusContent.color}-800 text-sm`}>
                {status === "failed"
                  ? "Payment could not be processed. Please check your payment method and try again."
                  : "The payment session has timed out. Please try again with a fresh session."}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={onRetry} className="flex-1 bg-transparent">
                Try Again
              </Button>
              <Button onClick={() => window.history.back()} className="flex-1 bg-gray-600 hover:bg-gray-700">
                Go Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
