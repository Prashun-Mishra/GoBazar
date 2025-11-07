import { NextResponse } from "next/server"
import { BACKEND_URL } from "@/lib/api-config"

// Disable caching for this API route
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    console.log('🔍 Frontend API: Attempting to fetch categories from backend...')
    console.log('🔍 Backend URL:', BACKEND_URL)
    
    // Try direct backend API call with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const response = await fetch(`${BACKEND_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    console.log('🔍 Backend response status:', response.status, response.statusText)

    if (!response.ok) {
      console.error('❌ Backend error:', response.status, response.statusText)
      throw new Error(`Backend responded with ${response.status}`)
    }

    const data = await response.json()
    
    // Log the response for debugging
    console.log('✅ Backend response:', {
      success: data.success,
      message: data.message,
      dataLength: data.data?.length,
      totalCategories: data.data?.length || 0,
      firstCategory: data.data?.[0]?.name,
      lastCategory: data.data?.[data.data?.length - 1]?.name
    })
    
    // Extract only the categories without subcategories for better performance
    if (data.success && data.data && Array.isArray(data.data)) {
      const categoriesOnly = data.data.map((category: any) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        order: category.order,
        isActive: category.isActive,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      }))
      
      console.log('Processed categories:', categoriesOnly.length)
      
      return NextResponse.json({
        success: true,
        message: `${categoriesOnly.length} categories retrieved successfully`,
        data: categoriesOnly
      }, { 
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
    }
    
    // Fallback: return original data if structure is unexpected
    console.log('Fallback: returning original data', data)
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('❌ Frontend API Error:', error)
    
    // ALWAYS use seed data with updated images
    console.log('🔄 Using seed data with updated Grofers images...')
    const fs = require('fs')
    const path = require('path')
    const seedPath = path.join(process.cwd(), 'data', 'seed', 'categories.json')
    const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'))
    
    console.log('✅ Loaded seed data with Grofers images:', seedData.length, 'categories')
    
    return NextResponse.json({
      success: true,
      message: `${seedData.length} categories with updated Grofers images`,
      data: seedData
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  }
}
