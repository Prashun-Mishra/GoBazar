import { NextRequest, NextResponse } from 'next/server'
import { checkAreaServiceability } from '@/lib/location-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { area } = body
    
    if (!area || typeof area !== 'string') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Area name is required' 
        },
        { status: 400 }
      )
    }
    
    const result = checkAreaServiceability(area.trim())
    
    return NextResponse.json({
      success: true,
      data: {
        area: area.trim(),
        isServiceable: result.isServiceable,
        matchedArea: result.matchedArea,
        message: result.isServiceable 
          ? `Great! We deliver to ${result.matchedArea || area}`
          : `Sorry, we don't deliver to ${area} yet. We're expanding rapidly!`
      }
    })
    
  } catch (error) {
    console.error('Error checking area serviceability:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check area serviceability' 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const area = searchParams.get('area')
    
    if (!area) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Area parameter is required' 
        },
        { status: 400 }
      )
    }
    
    const result = checkAreaServiceability(area.trim())
    
    return NextResponse.json({
      success: true,
      data: {
        area: area.trim(),
        isServiceable: result.isServiceable,
        matchedArea: result.matchedArea,
        message: result.isServiceable 
          ? `Great! We deliver to ${result.matchedArea || area}`
          : `Sorry, we don't deliver to ${area} yet. We're expanding rapidly!`
      }
    })
    
  } catch (error) {
    console.error('Error checking area serviceability:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check area serviceability' 
      },
      { status: 500 }
    )
  }
}
