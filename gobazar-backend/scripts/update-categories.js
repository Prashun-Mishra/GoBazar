const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function updateCategories() {
  try {
    console.log('🗑️  Clearing existing data safely...');
    
    // Clear existing data in proper order to handle foreign key constraints
    await prisma.product.deleteMany(); // Delete products first
    await prisma.subCategory.deleteMany(); // Then subcategories
    await prisma.category.deleteMany(); // Finally categories
    
    console.log('✅ Existing data cleared');
    
    // Read and execute SQL files
    const sqlFiles = [
      'comprehensive-categories.sql',
      'comprehensive-subcategories.sql',
      'remaining-subcategories.sql',
      'final-subcategories.sql'
    ];
    
    for (const sqlFile of sqlFiles) {
      const sqlPath = path.join(__dirname, '..', 'prisma', sqlFile);
      if (fs.existsSync(sqlPath)) {
        console.log(`📄 Executing ${sqlFile}...`);
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        
        // Split by semicolon and execute each statement
        const statements = sqlContent.split(';').filter(stmt => stmt.trim());
        
        for (const statement of statements) {
          if (statement.trim()) {
            await prisma.$executeRawUnsafe(statement.trim());
          }
        }
        
        console.log(`✅ ${sqlFile} executed successfully`);
      }
    }
    
    console.log('🎉 Categories and subcategories updated successfully!');
    
    // Verify the data
    const categoryCount = await prisma.category.count();
    const subcategoryCount = await prisma.subCategory.count();
    
    console.log(`📊 Total categories: ${categoryCount}`);
    console.log(`📊 Total subcategories: ${subcategoryCount}`);
    
  } catch (error) {
    console.error('❌ Error updating categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updateCategories();
