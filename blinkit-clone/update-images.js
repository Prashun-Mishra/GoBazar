const fs = require('fs');
const path = require('path');

// For Node.js versions that don't have fetch built-in
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Read the updated categories from seed data
const categoriesPath = path.join(__dirname, 'data', 'seed', 'categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

console.log('🔄 Updating category images in backend...');
console.log(`Found ${categories.length} categories to update`);

// Function to update backend via API
async function updateCategoryImages() {
  const BACKEND_URL = 'http://localhost:5000';
  
  try {
    // First, test if backend is running
    console.log('Testing backend connection...');
    const testResponse = await fetch(`${BACKEND_URL}/api/categories`);
    
    if (!testResponse.ok) {
      throw new Error(`Backend not responding: ${testResponse.status}`);
    }
    
    console.log('✅ Backend is running, proceeding with updates...\n');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const category of categories) {
      try {
        console.log(`Updating: ${category.name}`);
        
        const response = await fetch(`${BACKEND_URL}/api/categories/${category.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: category.image
          })
        });
        
        if (response.ok) {
          console.log(`✅ Updated ${category.name}`);
          successCount++;
        } else {
          console.log(`❌ Failed to update ${category.name}: ${response.status}`);
          failCount++;
        }
      } catch (err) {
        console.log(`❌ Error updating ${category.name}:`, err.message);
        failCount++;
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n🎉 Update complete!`);
    console.log(`✅ Success: ${successCount} categories`);
    console.log(`❌ Failed: ${failCount} categories`);
    
    if (failCount > 0) {
      console.log('\n📝 For failed updates, you can run the SQL script manually:');
      console.log('   1. Open your PostgreSQL database');
      console.log('   2. Run: psql -f update-category-images.sql');
    }
    
  } catch (error) {
    console.error('❌ Error connecting to backend:', error.message);
    console.log('\n🔄 Backend might not be running. Please:');
    console.log('   1. Start your backend server (npm run dev in gobazar-backend)');
    console.log('   2. Or run the SQL script manually in your database');
    console.log('\n📝 SQL Script location: update-category-images.sql');
  }
}

// Run the update
updateCategoryImages().catch(console.error);
