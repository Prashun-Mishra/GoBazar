import { NextRequest, NextResponse } from 'next/server'
import { serviceAreas, getServiceAreasForDisplay } from '@/lib/location-service'

export async function GET() {
  try {
    const popularAreas = getServiceAreasForDisplay()
    
    // Return popular/frequently used areas first
    const priorityAreas = [
      'Aundh',
      'Baner', 
      'Hinjewadi',
      'Wakad',
      'Shivajinagar',
      'Koregaon Park',
      'Viman Nagar',
      'Hadapsar',
      'Dapodi',
      'Pimpri'
    ]
    
    const otherAreas = serviceAreas.filter(area => !priorityAreas.includes(area))
    
    return NextResponse.json({
      success: true,
      data: {
        popular: priorityAreas,
        all: [...priorityAreas, ...otherAreas],
        count: serviceAreas.length,
        city: 'Pune',
        state: 'Maharashtra'
      }
    })
  } catch (error) {
    console.error('Error fetching popular locations:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch popular locations' 
      },
      { status: 500 }
    )
  }
}
