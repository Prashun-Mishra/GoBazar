"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, X, CheckCircle, AlertCircle } from "lucide-react"

interface MapAddressPickerProps {
  isOpen: boolean
  onClose: () => void
  onLocationSelect: (location: {
    lat: number
    lng: number
    address: string
    pincode: string
    city: string
    state: string
    isServiceable: boolean
  }) => void
}

// Mock serviceability data - in real app, this would come from API
const serviceableAreas = [
  { pincode: "110001", city: "New Delhi", deliveryTime: "8-15 mins" },
  { pincode: "110002", city: "New Delhi", deliveryTime: "10-20 mins" },
  { pincode: "122001", city: "Gurgaon", deliveryTime: "15-25 mins" },
  { pincode: "122002", city: "Gurgaon", deliveryTime: "12-18 mins" },
  { pincode: "201301", city: "Noida", deliveryTime: "10-20 mins" },
  { pincode: "400001", city: "Mumbai", deliveryTime: "8-15 mins" },
  { pincode: "560001", city: "Bangalore", deliveryTime: "10-18 mins" },
]

export function MapAddressPicker({ isOpen, onClose, onLocationSelect }: MapAddressPickerProps) {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [address, setAddress] = useState("")
  const [pincode, setPincode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [isServiceable, setIsServiceable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const mapRef = useRef<HTMLDivElement>(null)

  // Mock geocoding function - in real app, use Google Maps Geocoding API
  const reverseGeocode = async (lat: number, lng: number) => {
    setLoading(true)
    setError("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock address data based on coordinates
    const mockAddresses = [
      {
        lat: 28.6139,
        lng: 77.209,
        address: "Connaught Place, New Delhi",
        pincode: "110001",
        city: "New Delhi",
        state: "Delhi",
      },
      {
        lat: 28.4595,
        lng: 77.0266,
        address: "Cyber City, Gurgaon",
        pincode: "122002",
        city: "Gurgaon",
        state: "Haryana",
      },
      {
        lat: 28.5355,
        lng: 77.391,
        address: "Sector 18, Noida",
        pincode: "201301",
        city: "Noida",
        state: "Uttar Pradesh",
      },
    ]

    // Find closest mock address
    const closest = mockAddresses.reduce((prev, curr) => {
      const prevDist = Math.abs(prev.lat - lat) + Math.abs(prev.lng - lng)
      const currDist = Math.abs(curr.lat - lat) + Math.abs(curr.lng - lng)
      return currDist < prevDist ? curr : prev
    })

    setAddress(closest.address)
    setPincode(closest.pincode)
    setCity(closest.city)
    setState(closest.state)

    // Check serviceability
    const serviceable = serviceableAreas.some((area) => area.pincode === closest.pincode)
    setIsServiceable(serviceable)

    setLoading(false)
  }

  const getCurrentLocation = () => {
    setLoading(true)
    setError("")

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentLocation({ lat: latitude, lng: longitude })
        setSelectedLocation({ lat: latitude, lng: longitude })
        reverseGeocode(latitude, longitude)
      },
      (error) => {
        setError("Unable to get your location. Please try again.")
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Mock map click - in real app, this would be handled by Google Maps
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Convert click position to mock coordinates
    const lat = 28.6139 + (y - rect.height / 2) * 0.01
    const lng = 77.209 + (x - rect.width / 2) * 0.01

    setSelectedLocation({ lat, lng })
    reverseGeocode(lat, lng)
  }

  const handleConfirmLocation = () => {
    if (selectedLocation && address) {
      onLocationSelect({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        address,
        pincode,
        city,
        state,
        isServiceable,
      })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Select Delivery Location</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Location Controls */}
          <div className="flex space-x-3 mb-4">
            <Button
              onClick={getCurrentLocation}
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <Navigation className="w-4 h-4" />
              <span>Use Current Location</span>
            </Button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for area, street name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Mock Map */}
          <div
            ref={mapRef}
            onClick={handleMapClick}
            className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-crosshair relative overflow-hidden"
          >
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Loading location...</p>
              </div>
            ) : selectedLocation ? (
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" />
                </div>
                <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-lg text-xs">
                  <p className="font-medium">📍 Selected Location</p>
                  <p className="text-gray-600">Lat: {selectedLocation.lat.toFixed(4)}</p>
                  <p className="text-gray-600">Lng: {selectedLocation.lng.toFixed(4)}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Click on the map to select location</p>
                <p className="text-sm">or use current location</p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Address Details */}
          {address && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Selected Address</h3>
              <p className="text-gray-800 mb-2">{address}</p>
              <p className="text-gray-600 text-sm">
                {city}, {state} - {pincode}
              </p>

              {/* Serviceability Status */}
              <div className="mt-3 p-3 rounded-lg border">
                {isServiceable ? (
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <div>
                      <p className="font-medium">✅ Delivery Available</p>
                      <p className="text-sm">
                        Expected delivery:{" "}
                        {serviceableAreas.find((area) => area.pincode === pincode)?.deliveryTime || "8-15 mins"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    <div>
                      <p className="font-medium">❌ Delivery Not Available</p>
                      <p className="text-sm">We don't deliver to this area yet. Try a nearby location.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmLocation}
              disabled={!selectedLocation || !address || loading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
