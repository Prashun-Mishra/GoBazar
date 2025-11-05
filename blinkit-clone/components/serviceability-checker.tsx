"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, CheckCircle, AlertCircle, Clock, Truck, ArrowRight } from "lucide-react"
import { checkServiceability, isValidPincode, type ServiceabilityResult } from "@/lib/serviceability"

interface ServiceabilityCheckerProps {
  onServiceabilityCheck?: (result: ServiceabilityResult) => void
  className?: string
  showTitle?: boolean
}

export function ServiceabilityChecker({
  onServiceabilityCheck,
  className = "",
  showTitle = true,
}: ServiceabilityCheckerProps) {
  const [pincode, setPincode] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ServiceabilityResult | null>(null)
  const [error, setError] = useState("")

  const handleCheck = async () => {
    if (!pincode.trim()) {
      setError("Please enter a pincode")
      return
    }

    if (!isValidPincode(pincode)) {
      setError("Please enter a valid 6-digit pincode")
      return
    }

    setLoading(true)
    setError("")

    try {
      const serviceabilityResult = await checkServiceability(pincode)
      setResult(serviceabilityResult)
      onServiceabilityCheck?.(serviceabilityResult)
    } catch (err) {
      setError("Failed to check serviceability. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handlePincodeChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 6)
    setPincode(numericValue)
    setError("")
    if (result) setResult(null)
  }

  return (
    <div className={`bg-white rounded-lg border p-6 ${className}`}>
      {showTitle && (
        <div className="flex items-center mb-4">
          <MapPin className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold">Check Delivery Availability</h3>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={pincode}
              onChange={(e) => handlePincodeChange(e.target.value)}
              placeholder="Enter your pincode"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              maxLength={6}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <Button
            onClick={handleCheck}
            disabled={loading || !pincode.trim()}
            className="bg-green-600 hover:bg-green-700 px-6"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Checking...
              </div>
            ) : (
              "Check"
            )}
          </Button>
        </div>

        {result && (
          <div className="mt-4">
            {result.isServiceable ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800 mb-2">🎉 Great! We deliver to your area</h4>
                    <p className="text-green-700 mb-3">{result.message}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center space-x-2 text-green-700">
                        <Clock className="w-4 h-4" />
                        <span>
                          <strong>Delivery:</strong> {result.deliveryTime}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-700">
                        <Truck className="w-4 h-4" />
                        <span>
                          <strong>Fee:</strong> {result.deliveryFee === 0 ? "FREE" : `₹${result.deliveryFee}`}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-700">
                        <MapPin className="w-4 h-4" />
                        <span>
                          <strong>Min Order:</strong> ₹{result.minimumOrder}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800 mb-2">Sorry, we don't deliver here yet</h4>
                    <p className="text-red-700 mb-3">{result.message}</p>

                    {result.suggestedAreas && result.suggestedAreas.length > 0 && (
                      <div>
                        <p className="text-red-700 font-medium mb-2">But we deliver to these nearby areas:</p>
                        <div className="space-y-2">
                          {result.suggestedAreas.map((area) => (
                            <div
                              key={area.pincode}
                              className="flex items-center justify-between bg-white p-3 rounded border"
                            >
                              <div>
                                <span className="font-medium">{area.city}</span>
                                <span className="text-gray-600 ml-2">({area.pincode})</span>
                                <div className="text-sm text-gray-600">Delivery in {area.deliveryTime}</div>
                              </div>
                              <button
                                onClick={() => handlePincodeChange(area.pincode)}
                                className="text-green-600 hover:text-green-700 flex items-center text-sm font-medium"
                              >
                                Select <ArrowRight className="w-3 h-3 ml-1" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
