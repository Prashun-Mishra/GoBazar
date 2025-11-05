"use client"

import { useState, useEffect } from "react"
import { MapPin, CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  getCurrentLocation, 
  checkAreaServiceability, 
  serviceAreas,
  type GeolocationResult 
} from "@/lib/location-service"

interface LocationDetectorProps {
  onLocationDetected?: (location: any) => void
  showServiceAreas?: boolean
  compact?: boolean
}

export function LocationDetector({ 
  onLocationDetected, 
  showServiceAreas = true, 
  compact = false 
}: LocationDetectorProps) {
  const [isDetecting, setIsDetecting] = useState(false)
  const [locationResult, setLocationResult] = useState<GeolocationResult | null>(null)
  const [manualArea, setManualArea] = useState("")
  const [showManualInput, setShowManualInput] = useState(false)

  const handleDetectLocation = async () => {
    setIsDetecting(true)
    setLocationResult(null)
    
    try {
      const result = await getCurrentLocation()
      setLocationResult(result)
      
      if (result.success && result.location && onLocationDetected) {
        onLocationDetected(result.location)
      }
    } catch (error) {
      setLocationResult({
        success: false,
        error: 'Failed to detect location'
      })
    } finally {
      setIsDetecting(false)
    }
  }

  const handleManualAreaCheck = () => {
    if (!manualArea.trim()) return
    
    const result = checkAreaServiceability(manualArea)
    
    setLocationResult({
      success: true,
      location: {
        latitude: 0,
        longitude: 0,
        area: result.matchedArea || manualArea,
        isServiceable: result.isServiceable
      }
    })

    if (onLocationDetected) {
      onLocationDetected({
        area: result.matchedArea || manualArea,
        isServiceable: result.isServiceable,
        manual: true
      })
    }
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          onClick={handleDetectLocation}
          disabled={isDetecting}
          size="sm"
          variant="outline"
          className="flex items-center"
        >
          {isDetecting ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <MapPin className="w-4 h-4 mr-2" />
          )}
          {isDetecting ? 'Detecting...' : 'Detect Location'}
        </Button>
        
        {locationResult && (
          <div className="flex items-center">
            {locationResult.success && locationResult.location?.isServiceable ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600" />
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center mb-4">
        <MapPin className="w-6 h-6 text-blue-600 mr-3" />
        <h3 className="text-lg font-semibold text-gray-900">Check Delivery Availability</h3>
      </div>
      
      <p className="text-gray-600 mb-6">
        We deliver across Pune with expanding coverage. Check if we deliver to your area.
      </p>

      {/* Location Detection Button */}
      <div className="space-y-4">
        <Button
          onClick={handleDetectLocation}
          disabled={isDetecting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isDetecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Detecting Your Location...
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4 mr-2" />
              Detect My Location
            </>
          )}
        </Button>

        {/* Manual Area Input */}
        <div className="text-center">
          <button
            onClick={() => setShowManualInput(!showManualInput)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Or enter your area manually
          </button>
        </div>

        {showManualInput && (
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter your area (e.g., Aundh, Baner)"
              value={manualArea}
              onChange={(e) => setManualArea(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleManualAreaCheck()}
            />
            <Button
              onClick={handleManualAreaCheck}
              disabled={!manualArea.trim()}
              size="sm"
            >
              Check
            </Button>
          </div>
        )}
      </div>

      {/* Location Result */}
      {locationResult && (
        <div className="mt-6 p-4 rounded-lg border">
          {locationResult.success ? (
            <div>
              {locationResult.location?.isServiceable ? (
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800">Great! We deliver to your area</h4>
                    {locationResult.location.area && (
                      <p className="text-sm text-gray-600 mt-1">
                        Detected area: {locationResult.location.area}
                      </p>
                    )}
                    <p className="text-sm text-green-700 mt-2">
                      You can now enjoy fresh groceries delivered in 20 minutes!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Sorry, we don't deliver to this area yet</h4>
                    {locationResult.location?.area && (
                      <p className="text-sm text-gray-600 mt-1">
                        Detected area: {locationResult.location.area}
                      </p>
                    )}
                    <p className="text-sm text-red-700 mt-2">
                      We're expanding rapidly. Check back soon!
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Location Detection Failed</h4>
                <p className="text-sm text-gray-600 mt-1">{locationResult.error}</p>
                <p className="text-sm text-yellow-700 mt-2">
                  Try entering your area manually or check our service areas below.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Service Areas List */}
      {showServiceAreas && (
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-semibold text-gray-900 mb-3">Cities We Currently Serve</h4>
          <p className="text-sm text-gray-600 mb-4">Delivering across Pune with expanding coverage</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
            {serviceAreas.map((area, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                onClick={() => {
                  setManualArea(area)
                  setShowManualInput(true)
                }}
              >
                {area}
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            And many more areas across Pune
          </p>
        </div>
      )}
    </div>
  )
}
