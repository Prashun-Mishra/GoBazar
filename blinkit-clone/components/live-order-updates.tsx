"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Bell, CheckCircle, Package, Truck, Clock, X, RefreshCw } from "lucide-react"
import type { Order } from "@/types"

interface LiveOrderUpdatesProps {
  orderId?: string
  order?: Order
  onRefresh?: () => void
  isRefreshing?: boolean
}

interface OrderUpdate {
  id: string
  message: string
  timestamp: string
  type: "info" | "success" | "warning" | "error"
  icon: React.ReactNode
  orderId?: string
  status?: string
}

export function LiveOrderUpdates({ orderId, order, onRefresh, isRefreshing = false }: LiveOrderUpdatesProps) {
  const [updates, setUpdates] = useState<OrderUpdate[]>([])
  const [isLive, setIsLive] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)

  const addUpdate = useCallback((update: OrderUpdate) => {
    setUpdates(prev => [update, ...prev.slice(0, 9)]) // Keep only 10 latest updates
  }, [])

  const generateStatusUpdate = useCallback((status: string, orderId: string) => {
    const statusMessages = {
      'RECEIVED': 'Order confirmed and payment received',
      'PACKING': 'Your items are being packed with care',
      'ON_THE_WAY': 'Order is out for delivery',
      'DELIVERED': 'Order delivered successfully',
      'CANCELED': 'Order has been canceled'
    }

    const statusIcons = {
      'RECEIVED': <CheckCircle className="w-4 h-4" />,
      'PACKING': <Package className="w-4 h-4" />,
      'ON_THE_WAY': <Truck className="w-4 h-4" />,
      'DELIVERED': <CheckCircle className="w-4 h-4" />,
      'CANCELED': <X className="w-4 h-4" />
    }

    const statusTypes = {
      'RECEIVED': 'success' as const,
      'PACKING': 'info' as const,
      'ON_THE_WAY': 'warning' as const,
      'DELIVERED': 'success' as const,
      'CANCELED': 'error' as const
    }

    return {
      id: `update-${Date.now()}-${Math.random()}`,
      message: statusMessages[status as keyof typeof statusMessages] || 'Order status updated',
      timestamp: new Date().toISOString(),
      type: statusTypes[status as keyof typeof statusTypes] || 'info',
      icon: statusIcons[status as keyof typeof statusIcons] || <Clock className="w-4 h-4" />,
      orderId,
      status
    }
  }, [])

  useEffect(() => {
    // Initialize with order status if provided
    if (order) {
      const statusUpdate = generateStatusUpdate(order.status, order.id)
      setUpdates([statusUpdate])
    } else {
      // Simulate live updates for demo
      const initialUpdates: OrderUpdate[] = [
        {
          id: "1",
          message: "Order confirmed and payment received",
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          type: "success",
          icon: <CheckCircle className="w-4 h-4" />,
          orderId: orderId || 'demo-order'
        },
        {
          id: "2",
          message: "Your order is being prepared",
          timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
          type: "info",
          icon: <Package className="w-4 h-4" />,
          orderId: orderId || 'demo-order'
        },
      ]
      setUpdates(initialUpdates)
    }

    // Simulate periodic updates for demo (only if no real order)
    if (!order) {
      const intervals: NodeJS.Timeout[] = []

      // Add "packing" update after 2 minutes
      intervals.push(
        setTimeout(
          () => {
            addUpdate({
              id: "3",
              message: "Items packed and ready for pickup",
              timestamp: new Date().toISOString(),
              type: "info",
              icon: <Package className="w-4 h-4" />,
              orderId: orderId || 'demo-order'
            })
          },
          2 * 60 * 1000,
        ),
      )

      // Add "out for delivery" update after 4 minutes
      intervals.push(
        setTimeout(
          () => {
            addUpdate({
              id: "4",
              message: "Order picked up by delivery partner",
              timestamp: new Date().toISOString(),
              type: "info",
              icon: <Truck className="w-4 h-4" />,
              orderId: orderId || 'demo-order'
            })
          },
          4 * 60 * 1000,
        ),
      )

      return () => {
        intervals.forEach(clearTimeout)
      }
    }
  }, [orderId, order, generateStatusUpdate, addUpdate])

  // Update when order status changes
  useEffect(() => {
    if (order && updates.length > 0) {
      const lastUpdate = updates[0]
      if (lastUpdate.status !== order.status) {
        const statusUpdate = generateStatusUpdate(order.status, order.id)
        addUpdate(statusUpdate)
      }
    }
  }, [order?.status, updates, generateStatusUpdate, addUpdate, order?.id])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getUpdateColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200"
      case "warning":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "error":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-blue-600 bg-blue-50 border-blue-200"
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Bell className="w-5 h-5 mr-2 text-blue-600" />
          Live Updates
        </h3>
        <div className="flex items-center space-x-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-xs">Refresh</span>
            </button>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-gray-600"
          >
            {isMinimized ? '▼' : '▲'}
          </button>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
            <span className="text-xs text-gray-600">{isLive ? "Live" : "Offline"}</span>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <div className="space-y-4">
        {updates
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .map((update) => (
            <div key={update.id} className={`border rounded-lg p-4 ${getUpdateColor(update.type)}`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">{update.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{update.message}</div>
                  <div className="text-xs opacity-75 mt-1">{formatTime(update.timestamp)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isMinimized && updates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No updates yet</p>
        </div>
      )}
    </div>
  )
}
