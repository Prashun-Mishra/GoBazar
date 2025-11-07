import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { BACKEND_URL } from '@/lib/api-config'

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Syncing category images to backend database...')
    
    // Read the updated categories from seed data
    const categoriesPath = path.join(process.cwd(), 'data', 'seed', 'categories.json')
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'))
    
    console.log(`Found ${categories.length} categories to sync`)
    
    // First, get existing categories from backend to match IDs
    let existingCategories = []
    try {
      const getResponse = await fetch(`${BACKEND_URL}/api/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (getResponse.ok) {
        const data = await getResponse.json()
        existingCategories = data.data || data.categories || []
        console.log(`Found ${existingCategories.length} existing categories in backend`)
      }
    } catch (error) {
      console.log('Could not fetch existing categories, will try direct updates')
    }
    
    let successCount = 0
    let failCount = 0
    const results = []
    
    // Try to update each category
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      
      try {
        console.log(`Syncing: ${category.name}`)
        
        // Try multiple approaches to find and update the category
        const updateMethods = [
          // Method 1: Direct SQL update via backend admin endpoint
          {
            url: `${BACKEND_URL}/api/admin/categories/update-image`,
            method: 'POST',
            body: {
              slug: category.slug,
              name: category.name,
              image: category.image,
              order: category.order || (i + 1)
            }
          },
          // Method 2: Update by order/position
          {
            url: `${BACKEND_URL}/api/categories/update-by-order`,
            method: 'PUT',
            body: {
              order: category.order || (i + 1),
              image: category.image
            }
          },
          // Method 3: Bulk update endpoint
          {
            url: `${BACKEND_URL}/api/categories/bulk-update`,
            method: 'POST',
            body: {
              updates: [{
                identifier: category.slug,
                image: category.image
              }]
            }
          }
        ]
        
        let updated = false
        
        for (const method of updateMethods) {
          try {
            const response = await fetch(method.url, {
              method: method.method,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer admin-sync-token'
              },
              body: JSON.stringify(method.body)
            })
            
            if (response.ok) {
              console.log(`✅ Synced ${category.name}`)
              successCount++
              updated = true
              results.push({ 
                category: category.name, 
                status: 'success',
                method: method.url.split('/').pop()
              })
              break
            }
          } catch (methodError) {
            continue
          }
        }
        
        if (!updated) {
          console.log(`❌ Failed to sync ${category.name}`)
          failCount++
          results.push({ 
            category: category.name, 
            status: 'failed',
            reason: 'No working update method found'
          })
        }
        
      } catch (err) {
        console.log(`❌ Error syncing ${category.name}:`, err.message)
        failCount++
        results.push({ 
          category: category.name, 
          status: 'error',
          reason: err.message
        })
      }
    }
    
    const response = {
      success: successCount > 0,
      message: `Sync complete: ${successCount} success, ${failCount} failed`,
      results: {
        total: categories.length,
        success: successCount,
        failed: failCount,
        details: results
      }
    }
    
    // If sync failed, provide SQL fallback
    if (successCount === 0) {
      response.fallback = {
        message: 'Backend sync failed. Use direct database update.',
        sql: categories.map((cat, index) => 
          `UPDATE categories SET image = '${cat.image}' WHERE "order" = ${cat.order || (index + 1)} OR slug = '${cat.slug}';`
        ).join('\n'),
        instructions: [
          '1. Connect to your PostgreSQL database',
          '2. Run the SQL commands above',
          '3. Restart your backend server'
        ]
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('❌ Sync error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to sync categories',
        details: error.message
      },
      { status: 500 }
    )
  }
}
