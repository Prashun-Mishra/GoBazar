import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { BACKEND_URL } from '@/lib/api-config'

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Admin: Updating category images...')
    
    // Read categories from seed data
    const categoriesPath = path.join(process.cwd(), 'data', 'seed', 'categories.json')
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'))
    
    console.log(`Found ${categories.length} categories to update`)
    
    let successCount = 0
    let failCount = 0
    const results = []
    
    // Try to update via backend API first
    for (const category of categories) {
      try {
        console.log(`Updating: ${category.name}`)
        
        // Try different API endpoints that might work
        const endpoints = [
          `/api/admin/categories/${category.id}`,
          `/api/categories/${category.id}`,
          `/api/categories/update/${category.id}`
        ]
        
        let updated = false
        
        for (const endpoint of endpoints) {
          try {
            const response = await fetch(`${BACKEND_URL}${endpoint}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                // Try with admin token if available
                'Authorization': 'Bearer admin-token'
              },
              body: JSON.stringify({
                image: category.image
              })
            })
            
            if (response.ok) {
              console.log(`✅ Updated ${category.name}`)
              successCount++
              updated = true
              results.push({ category: category.name, status: 'success' })
              break
            }
          } catch (apiError) {
            continue
          }
        }
        
        if (!updated) {
          console.log(`❌ Failed to update ${category.name}`)
          failCount++
          results.push({ category: category.name, status: 'failed', reason: 'API not accessible' })
        }
        
      } catch (err) {
        console.log(`❌ Error updating ${category.name}:`, err)
        failCount++
        results.push({ category: category.name, status: 'error', reason: err.message })
      }
    }
    
    const response = {
      success: successCount > 0,
      message: `Update complete: ${successCount} success, ${failCount} failed`,
      results: {
        total: categories.length,
        success: successCount,
        failed: failCount,
        details: results
      }
    }
    
    if (successCount === 0) {
      response.fallback = {
        message: 'All API updates failed. Use SQL script instead.',
        sqlScript: 'update-category-images.sql',
        instructions: [
          '1. Connect to your PostgreSQL database',
          '2. Run the SQL script: psql -f update-category-images.sql',
          '3. Or use the batch file: run-sql-update.bat'
        ]
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('❌ Admin update error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update categories',
        details: error.message,
        fallback: {
          message: 'Use direct database update instead',
          options: [
            'Run: node direct-db-update.js',
            'Or: run-sql-update.bat',
            'Or: Manual SQL execution'
          ]
        }
      },
      { status: 500 }
    )
  }
}
