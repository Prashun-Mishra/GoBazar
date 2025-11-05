// Service areas in Pune where GoBazaar delivers
export const serviceAreas = [
  'Dapodi',
  'Bopodi', 
  'Khadki Bazaar',
  'Khadki Station',
  'Shivajinagar',
  'Pune Station',
  'Pimpri',
  'Chinchwad',
  'Akurdi',
  'Nigdi',
  'Dehuroad',
  'Old Sangvi',
  'New Sangvi',
  'Aundh',
  'Hinjewadi',
  'Wakad',
  'Pimple Nilakh',
  'Pimple Saudagar',
  'Kalyani Nagar',
  'Viman Nagar',
  'Koregaon Park',
  'Hadapsar',
  'Kondwa',
  'Market Yard',
  'Swargate',
  'Deccan',
  'FC Road',
  'Karve Nagar',
  'Bavdhan',
  'Pashan',
  'Baner',
  'Balewadi'
]

export interface LocationData {
  latitude: number
  longitude: number
  address?: string
  area?: string
  city?: string
  isServiceable: boolean
}

export interface GeolocationResult {
  success: boolean
  location?: LocationData
  error?: string
}

// Check if an area name matches our service areas
export const isAreaServiceable = (areaName: string): boolean => {
  const normalizedArea = areaName.toLowerCase().trim()
  return serviceAreas.some(area => 
    area.toLowerCase().includes(normalizedArea) || 
    normalizedArea.includes(area.toLowerCase())
  )
}

// Get user's current location using browser geolocation
export const getCurrentLocation = (): Promise<GeolocationResult> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        success: false,
        error: 'Geolocation is not supported by this browser'
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // Use API endpoint for reverse geocoding
          const response = await fetch(`/api/location/current?latitude=${latitude}&longitude=${longitude}`)
          
          if (!response.ok) {
            throw new Error('Failed to get location details')
          }
          
          const data = await response.json()
          
          if (data.success) {
            resolve({
              success: true,
              location: {
                latitude: data.data.latitude,
                longitude: data.data.longitude,
                address: data.data.address,
                area: data.data.area,
                city: data.data.city,
                isServiceable: data.data.isServiceable
              }
            })
          } else {
            throw new Error(data.error || 'Failed to process location')
          }
        } catch (error) {
          console.error('Location API error:', error)
          resolve({
            success: true,
            location: {
              latitude,
              longitude,
              address: '',
              area: '',
              city: '',
              isServiceable: false
            }
          })
        }
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location'
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out'
            break
        }
        
        resolve({
          success: false,
          error: errorMessage
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  })
}

// Reverse geocoding using a free service (you can replace with Google Maps API)
const reverseGeocode = async (lat: number, lng: number): Promise<Omit<LocationData, 'latitude' | 'longitude'>> => {
  try {
    // Using OpenStreetMap Nominatim (free service)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    )
    
    if (!response.ok) {
      throw new Error('Geocoding failed')
    }
    
    const data = await response.json()
    
    // Extract area/locality information
    const address = data.display_name || ''
    const addressComponents = data.address || {}
    
    // Try to find area from various address components
    const area = addressComponents.suburb || 
                 addressComponents.neighbourhood || 
                 addressComponents.locality ||
                 addressComponents.sublocality ||
                 addressComponents.city_district || ''
    
    const city = addressComponents.city || 
                 addressComponents.town || 
                 addressComponents.village || ''
    
    // Check if the detected area is serviceable
    const isServiceable = isAreaServiceable(area) || isAreaServiceable(address)
    
    return {
      address: address || '',
      area: area || '',
      city: city || '',
      isServiceable: isServiceable || false
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return {
      address: '',
      area: '',
      city: '',
      isServiceable: false
    }
  }
}

// Manual area check (for when user types area name)
export const checkAreaServiceability = (areaName: string): {
  isServiceable: boolean
  matchedArea?: string
} => {
  const normalizedInput = areaName.toLowerCase().trim()
  
  const matchedArea = serviceAreas.find(area => 
    area.toLowerCase().includes(normalizedInput) || 
    normalizedInput.includes(area.toLowerCase())
  )
  
  return {
    isServiceable: !!matchedArea,
    matchedArea
  }
}

// Get formatted list of service areas for display
export const getServiceAreasForDisplay = () => {
  return {
    areas: serviceAreas,
    count: serviceAreas.length,
    city: 'Pune',
    state: 'Maharashtra'
  }
}

// Get popular areas from API
export const getPopularAreas = async () => {
  try {
    const response = await fetch('/api/location/popular')
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular areas')
    }
    
    const data = await response.json()
    
    if (data.success) {
      return {
        success: true,
        data: data.data
      }
    } else {
      throw new Error(data.error || 'Failed to get popular areas')
    }
  } catch (error) {
    console.error('Popular areas API error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch popular areas',
      fallback: getServiceAreasForDisplay()
    }
  }
}

// Check area serviceability via API
export const checkAreaServiceabilityAPI = async (areaName: string) => {
  try {
    const response = await fetch(`/api/location/check?area=${encodeURIComponent(areaName)}`)
    
    if (!response.ok) {
      throw new Error('Failed to check area serviceability')
    }
    
    const data = await response.json()
    
    if (data.success) {
      return {
        success: true,
        data: data.data
      }
    } else {
      throw new Error(data.error || 'Failed to check area')
    }
  } catch (error) {
    console.error('Area check API error:', error)
    // Fallback to local check
    const localResult = checkAreaServiceability(areaName)
    return {
      success: true,
      data: {
        area: areaName,
        isServiceable: localResult.isServiceable,
        matchedArea: localResult.matchedArea,
        message: localResult.isServiceable 
          ? `Great! We deliver to ${localResult.matchedArea || areaName}`
          : `Sorry, we don't deliver to ${areaName} yet. We're expanding rapidly!`
      }
    }
  }
}
