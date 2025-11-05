"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, Truck, X } from "lucide-react"
import { getDeliveryTimeEstimate, calculateDeliveryCharges } from "@/lib/serviceability"

interface DeliveryInfoBannerProps {
  pincode?: string
  orderValue?: number
  className?: string
}

export function DeliveryInfoBanner({ pincode, orderValue = 0, className = "" }: DeliveryInfoBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [deliveryInfo, setDeliveryInfo] = useState<{
    deliveryTime: string
    deliveryFee: number
    isFreeDelivery: boolean
    minimumForFree: number
  } | null>(null)

  useEffect(() => {
    if (pincode) {
      const deliveryTime = getDeliveryTimeEstimate(pincode)
      const charges = calculateDeliveryCharges(pincode, orderValue)

      setDeliveryInfo({
        deliveryTime,
        ...charges,
      })
    }
  }, [pincode, orderValue])

  if (!isVisible || !deliveryInfo || !pincode) return null

  return (
    <div className={`bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-green-700">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Delivering to {pincode}</span>
          </div>

          <div className="flex items-center space-x-2 text-blue-700">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{deliveryInfo.deliveryTime}</span>
          </div>

          <div className="flex items-center space-x-2 text-green-700">
            <Truck className="w-4 h-4" />
            <span className="text-sm font-medium">
              {deliveryInfo.isFreeDelivery ? (
                "FREE Delivery"
              ) : (
                <>
                  ₹{deliveryInfo.deliveryFee} delivery fee
                  {orderValue < deliveryInfo.minimumForFree && (
                    <span className="text-orange-600 ml-1">
                      (Add ₹{deliveryInfo.minimumForFree - orderValue} for FREE delivery)
                    </span>
                  )}
                </>
              )}
            </span>
          </div>
        </div>

        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600 p-1">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
