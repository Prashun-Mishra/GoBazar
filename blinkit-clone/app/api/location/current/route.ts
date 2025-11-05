import { NextRequest, NextResponse } from 'next/server'
import { isAreaServiceable } from '@/lib/location-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')
    
    if (!latitude || !longitude) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Latitude and longitude are required' 
        },
        { status: 400 }
      )
    }
    
    const lat = parseFloat(latitude)
    const lng = parseFloat(longitude)
    
    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid latitude or longitude' 
        },
        { status: 400 }
      )
    }
    
    // Reverse geocoding using OpenStreetMap Nominatim
    try {
      const geocodeResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      )
      
      if (!geocodeResponse.ok) {
        throw new Error('Geocoding failed')
      }
      
      const geocodeData = await geocodeResponse.json()
      const address = geocodeData.display_name || ''
      const addressComponents = geocodeData.address || {}
      
      // Extract area information
      const area = addressComponents.suburb || 
                   addressComponents.neighbourhood || 
                   addressComponents.locality ||
                   addressComponents.sublocality ||
                   addressComponents.city_district || ''
      
      const city = addressComponents.city || 
                   addressComponents.town || 
                   addressComponents.village || ''
      
      const state = addressComponents.state || ''
      const country = addressComponents.country || ''
      
      // Check if the detected area is serviceable
      const isServiceable = isAreaServiceable(area) || isAreaServiceable(address)
      
      return NextResponse.json({
        success: true,
        data: {
          latitude: lat,
          longitude: lng,
          address,
          area,
          city,
          state,
          country,
          isServiceable,
          components: addressComponents
        }
      })
      
    } catch (geocodeError) {
      console.error('Geocoding error:', geocodeError)
      
      // Return location without geocoding if reverse geocoding fails
      return NextResponse.json({
        success: true,
        data: {
          latitude: lat,
          longitude: lng,
          address: '',
          area: '',
          city: '',
          state: '',
          country: '',
          isServiceable: false,
          error: 'Unable to determine address from coordinates'
        }
      })
    }
    
  } catch (error) {
    console.error('Error processing location request:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process location request' 
      },
      { status: 500 }
    )
  }
}
