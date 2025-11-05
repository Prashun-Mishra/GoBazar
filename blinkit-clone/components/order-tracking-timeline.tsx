"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, Package, Truck, MapPin, Phone, User, RefreshCw } from "lucide-react"
import type { Order } from "@/types"

interface OrderTrackingTimelineProps {
  order: Order
  onRefresh?: () => void
  isLoading?: boolean
}

const trackingSteps = [
  {
    key: "RECEIVED",
    title: "Order Received",
    description: "Your order has been confirmed",
    icon: CheckCircle,
  },
  {
    key: "PACKING",
    title: "Packing",
    description: "Your items are being packed",
    icon: Package,
  },
  {
    key: "ON_THE_WAY",
    title: "On the Way",
    description: "Your order is out for delivery",
    icon: Truck,
  },
  {
    key: "DELIVERED",
    title: "Delivered",
    description: "Order delivered successfully",
    icon: CheckCircle,
  },
]

export function OrderTrackingTimeline({ order, onRefresh, isLoading = false }: OrderTrackingTimelineProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState("8-15 minutes")

  useEffect(() => {
    const stepIndex = trackingSteps.findIndex((step) => step.key === order.status)
    setCurrentStep(stepIndex >= 0 ? stepIndex : 0)

    // Update estimated time based on status
    switch (order.status) {
      case "RECEIVED":
        setEstimatedTime("8-15 minutes")
        break
      case "PACKING":
        setEstimatedTime("5-12 minutes")
        break
      case "ON_THE_WAY":
        setEstimatedTime("2-8 minutes")
        break
      case "DELIVERED":
        setEstimatedTime("Delivered")
        break
      case "CANCELED":
        setEstimatedTime("Canceled")
        break
      default:
        setEstimatedTime("8-15 minutes")
    }
  }, [order.status])

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed"
    if (index === currentStep) return "current"
    return "pending"
  }

  return (
    <div className="bg-white rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Order Tracking</h3>
        <div className="flex items-center space-x-4">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="text-sm">Refresh</span>
            </button>
          )}
          <div className="text-right">
            <div className="text-sm text-gray-600">Estimated Delivery</div>
            <div className={`font-medium ${
              order.status === 'DELIVERED' ? 'text-green-600' : 
              order.status === 'CANCELED' ? 'text-red-600' : 'text-blue-600'
            }`}>{estimatedTime}</div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {trackingSteps.map((step, index) => {
          const status = getStepStatus(index)
          const StepIcon = step.icon
          const isLast = index === trackingSteps.length - 1

          return (
            <div key={step.key} className="relative flex items-start">
              {/* Connector Line */}
              {!isLast && (
                <div
                  className={`absolute left-6 top-12 w-0.5 h-16 ${
                    status === "completed" ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}

              {/* Step Icon */}
              <div
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  status === "completed"
                    ? "bg-green-500 border-green-500 text-white"
                    : status === "current"
                      ? "bg-blue-500 border-blue-500 text-white animate-pulse"
                      : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                <StepIcon className="w-5 h-5" />
              </div>

              {/* Step Content */}
              <div className="ml-4 pb-8">
                <div
                  className={`font-medium ${
                    status === "completed" ? "text-green-600" : status === "current" ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-sm text-gray-600 mt-1">{step.description}</div>
                {status === "current" && (
                  <div className="text-xs text-blue-600 mt-2 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    In progress...
                  </div>
                )}
                {status === "completed" && (
                  <div className="text-xs text-green-600 mt-2">Completed at {new Date().toLocaleTimeString()}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Delivery Details */}
      <div className="border-t pt-6 mt-2">
        <h4 className="font-medium mb-4">Delivery Details</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium">Delivery Address</div>
              <div className="text-gray-600">
                {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
              </div>
              {order.address.landmark && (
                <div className="text-gray-500 text-xs">Landmark: {order.address.landmark}</div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <div className="text-sm">
              <span className="font-medium">Delivery Slot:</span> {order.deliverySlot}
            </div>
          </div>

          {order.status === "ON_THE_WAY" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Truck className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <div className="font-medium">Your delivery partner is on the way!</div>
                  <div className="mt-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>Rajesh Kumar</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>+91 98765 43210</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {order.status === "CANCELED" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="text-sm text-red-800">
                <div className="font-medium">Order Canceled</div>
                <div className="mt-1">Your order has been canceled. If you have any questions, please contact support.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
