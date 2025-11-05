"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Wallet, Smartphone, Building2, Check, ChevronRight, Shield, Zap, Gift, Lock } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "payu" | "upi" | "card" | "netbanking" | "wallet" | "cod"
  name: string
  description: string
  icon: React.ReactNode
  popular?: boolean
  discount?: number
  processingTime?: string
  available?: boolean
  comingSoon?: boolean
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "payu",
    type: "payu",
    name: "PayU Online Payment",
    description: "UPI, Cards, Net Banking & More",
    icon: <CreditCard className="w-5 h-5" />,
    popular: true,
    processingTime: "Instant",
    available: true,
  },
  {
    id: "cod",
    type: "cod",
    name: "Cash on Delivery",
    description: "Pay when you receive",
    icon: <Wallet className="w-5 h-5" />,
    processingTime: "On delivery",
    available: true,
  },
  {
    id: "upi",
    type: "upi",
    name: "UPI (Direct)",
    description: "Pay using any UPI app",
    icon: <Smartphone className="w-5 h-5" />,
    processingTime: "Coming Soon",
    available: false,
    comingSoon: true,
  },
  {
    id: "card",
    type: "card",
    name: "Credit/Debit Card (Direct)",
    description: "Visa, Mastercard, RuPay",
    icon: <CreditCard className="w-5 h-5" />,
    processingTime: "Coming Soon",
    available: false,
    comingSoon: true,
  },
  {
    id: "wallet",
    type: "wallet",
    name: "Digital Wallets",
    description: "Paytm, PhonePe, Amazon Pay",
    icon: <Wallet className="w-5 h-5" />,
    processingTime: "Coming Soon",
    available: false,
    comingSoon: true,
  },
]

interface PaymentMethodSelectorProps {
  selectedMethod: string
  onMethodSelect: (methodId: string) => void
  onProceedToPayment: () => void
  total: number
  isProcessing?: boolean
}

export function PaymentMethodSelector({
  selectedMethod,
  onMethodSelect,
  onProceedToPayment,
  total,
  isProcessing = false,
}: PaymentMethodSelectorProps) {
  const [showUPIOptions, setShowUPIOptions] = useState(false)
  const [showCardForm, setShowCardForm] = useState(false)
  const [showWalletOptions, setShowWalletOptions] = useState(false)

  const selectedMethodData = paymentMethods.find((method) => method.id === selectedMethod)

  const handleMethodSelect = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId)
    
    // Don't allow selection of unavailable methods
    if (!method?.available) {
      return
    }
    
    onMethodSelect(methodId)
    // Reset sub-option states
    setShowUPIOptions(false)
    setShowCardForm(false)
    setShowWalletOptions(false)

    // Show sub-options for certain methods (disabled for now)
    // if (methodId === "upi") setShowUPIOptions(true)
    // if (methodId === "card") setShowCardForm(true)
    // if (methodId === "wallet") setShowWalletOptions(true)
  }

  const formatPrice = (price: number) => `₹${price.toFixed(2)}`

  return (
    <div className="bg-white rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-600" />
          Payment Method
        </h2>
        <div className="flex items-center text-sm text-gray-600">
          <Shield className="w-4 h-4 mr-1" />
          <span>100% Secure</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <div key={method.id}>
            <div
              className={`border rounded-lg p-4 transition-all ${
                !method.available
                  ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                  : selectedMethod === method.id
                  ? "border-green-500 bg-green-50 ring-2 ring-green-200 cursor-pointer"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer"
              }`}
              onClick={() => handleMethodSelect(method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-gray-600">{method.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${!method.available ? 'text-gray-400' : ''}`}>{method.name}</span>
                      {method.popular && method.available && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                          Recommended
                        </span>
                      )}
                      {method.comingSoon && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                          <Lock className="w-3 h-3 mr-1" />
                          Coming Soon
                        </span>
                      )}
                      {method.discount && method.available && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                          <Gift className="w-3 h-3 mr-1" />
                          {method.discount}% off
                        </span>
                      )}
                    </div>
                    <div className={`text-sm ${!method.available ? 'text-gray-400' : 'text-gray-600'}`}>{method.description}</div>
                    <div className={`flex items-center text-xs mt-1 ${!method.available ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Zap className="w-3 h-3 mr-1" />
                      {method.processingTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedMethod === method.id && method.available && <Check className="w-5 h-5 text-green-600" />}
                  {!method.available && <Lock className="w-4 h-4 text-gray-400" />}
                  {method.available && <ChevronRight className="w-4 h-4 text-gray-400" />}
                </div>
              </div>
            </div>

            {/* UPI Options */}
            {selectedMethod === "upi" && showUPIOptions && (
              <div className="mt-3 ml-4 p-4 bg-gray-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-medium mb-3">Choose UPI Option</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-white rounded border hover:border-green-500 transition-colors">
                    <div className="flex items-center justify-between">
                      <span>Pay with any UPI app</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                  <button className="w-full text-left p-3 bg-white rounded border hover:border-green-500 transition-colors">
                    <div className="flex items-center justify-between">
                      <span>Enter UPI ID manually</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Card Form */}
            {selectedMethod === "card" && showCardForm && (
              <div className="mt-3 ml-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-medium mb-3">Card Details</h4>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={5}
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={4}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Wallet Options */}
            {selectedMethod === "wallet" && showWalletOptions && (
              <div className="mt-3 ml-4 p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-medium mb-3">Select Wallet</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["Paytm", "PhonePe", "Amazon Pay", "Google Pay"].map((wallet) => (
                    <button
                      key={wallet}
                      className="p-3 bg-white rounded border hover:border-purple-500 transition-colors text-sm"
                    >
                      {wallet}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Payment Summary */}
      {selectedMethodData && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Payment Method:</span>
            <span className="font-medium">{selectedMethodData.name}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Amount to Pay:</span>
            <span className="font-bold text-lg text-green-600">
              {selectedMethodData.discount
                ? formatPrice(total * (1 - selectedMethodData.discount / 100))
                : formatPrice(total)}
            </span>
          </div>
          {selectedMethodData.discount && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">You Save:</span>
              <span className="text-green-600 font-medium">
                {formatPrice(total * (selectedMethodData.discount / 100))}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Proceed Button */}
      <Button
        onClick={onProceedToPayment}
        disabled={!selectedMethod || isProcessing}
        className="w-full bg-green-600 hover:bg-green-700 py-3 text-base font-semibold"
        size="lg"
      >
        {isProcessing ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </div>
        ) : selectedMethod === "cod" ? (
          "Place Order (Cash on Delivery)"
        ) : selectedMethod === "payu" ? (
          `Proceed to Payment - ${formatPrice(total)}`
        ) : (
          `Pay ${
            selectedMethodData?.discount
              ? formatPrice(total * (1 - selectedMethodData.discount / 100))
              : formatPrice(total)
          }`
        )}
      </Button>

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-2">
          <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-blue-800">
            <p className="font-medium mb-1">Your payment is secured with 256-bit SSL encryption</p>
            <p>We never store your card details. All transactions are processed securely.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
