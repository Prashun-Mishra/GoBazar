import { NextRequest, NextResponse } from 'next/server'
import { isAreaServiceable } from '@/lib/location-service'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication token required' 
        },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { location } = body
    
    if (!location) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Location data is required' 
        },
        { status: 400 }
      )
    }
    
    // Validate location data
    const requiredFields = ['displayName', 'address', 'coordinates']
    const missingFields = requiredFields.filter(field => !location[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      )
    }
    
    // Check if location is serviceable
    const area = location.address?.suburb || location.address?.city || location.displayName
    const serviceable = isAreaServiceable(area)
    
    // Here you would typically save to your backend database
    // For now, we'll just validate and return success
    
    // Example backend call (uncomment when backend is ready):
    /*
    const backendResponse = await fetch(`${process.env.BACKEND_URL}/api/user/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...location,
        isServiceable: serviceable
      }),
    })
    
    if (!backendResponse.ok) {
      throw new Error('Failed to save location to backend')
    }
    */
    
    return NextResponse.json({
      success: true,
      data: {
        message: 'Location saved successfully',
        location: {
          ...location,
          isServiceable: serviceable
        }
      }
    })
    
  } catch (error) {
    console.error('Error saving location:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save location' 
      },
      { status: 500 }
    )
  }
}
