const fs = require('fs');
const path = require('path');

// Database connection using pg (PostgreSQL client)
// You might need to install: npm install pg
let Client;
try {
  const { Client: PgClient } = require('pg');
  Client = PgClient;
} catch (error) {
  console.log('❌ PostgreSQL client (pg) not installed');
  console.log('Please run: npm install pg');
  console.log('Or use the SQL script approach instead');
  process.exit(1);
}

// Read the updated categories from seed data
const categoriesPath = path.join(__dirname, 'data', 'seed', 'categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

console.log('🔄 Updating category images directly in database...');
console.log(`Found ${categories.length} categories to update`);

// Database configuration
const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'gobazar', // Change this to your database name
  user: 'postgres',    // Change this to your database user
  password: 'password' // Change this to your database password
};

async function updateCategoryImagesDirectly() {
  const client = new Client(dbConfig);
  
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const category of categories) {
      try {
        console.log(`Updating: ${category.name}`);
        
        // Try different possible column names and table structures
        const queries = [
          `UPDATE categories SET image = $1 WHERE id = $2`,
          `UPDATE categories SET image = $1 WHERE "order" = $2`,
          `UPDATE categories SET image = $1 WHERE order_index = $2`,
          `UPDATE categories SET image = $1 WHERE slug = $3`
        ];
        
        let updated = false;
        
        for (const query of queries) {
          try {
            let params;
            if (query.includes('slug')) {
              params = [category.image, category.id, category.slug];
            } else {
              params = [category.image, category.order || category.id];
            }
            
            const result = await client.query(query, params);
            
            if (result.rowCount > 0) {
              console.log(`✅ Updated ${category.name}`);
              successCount++;
              updated = true;
              break;
            }
          } catch (queryError) {
            // Try next query format
            continue;
          }
        }
        
        if (!updated) {
          console.log(`❌ Failed to update ${category.name}: No matching record found`);
          failCount++;
        }
        
      } catch (err) {
        console.log(`❌ Error updating ${category.name}:`, err.message);
        failCount++;
      }
    }
    
    console.log(`\n🎉 Update complete!`);
    console.log(`✅ Success: ${successCount} categories`);
    console.log(`❌ Failed: ${failCount} categories`);
    
    if (successCount > 0) {
      console.log('\n🚀 Category images are now live for all users!');
    }
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('\n🔧 Please check your database configuration in this script:');
    console.log('   - host:', dbConfig.host);
    console.log('   - port:', dbConfig.port);
    console.log('   - database:', dbConfig.database);
    console.log('   - user:', dbConfig.user);
    console.log('\n📝 Alternative: Use the SQL script approach');
    console.log('   Run: run-sql-update.bat');
  } finally {
    await client.end();
  }
}

// Run the update
updateCategoryImagesDirectly().catch(console.error);
