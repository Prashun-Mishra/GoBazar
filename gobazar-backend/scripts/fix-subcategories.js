const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function runSQLFile(filePath) {
  console.log(`📄 Reading ${path.basename(filePath)}...`);
  const sql = fs.readFileSync(filePath, 'utf8');
  
  // Extract INSERT statements
  const insertMatch = sql.match(/INSERT INTO "subcategories"[^;]+;/gs);
  
  if (insertMatch) {
    for (const statement of insertMatch) {
      try {
        await prisma.$executeRawUnsafe(statement);
        console.log(`✅ Executed INSERT statement`);
      } catch (error) {
        // Ignore duplicate key errors
        if (!error.message.includes('duplicate key')) {
          console.error(`❌ Error executing statement:`, error.message);
        }
      }
    }
  }
}

async function fixSubcategories() {
  try {
    console.log('🔄 Starting subcategory import fix...\n');
    
    // Import remaining subcategories (categories 5-11)
    console.log('📦 Importing subcategories for categories 5-11...');
    await runSQLFile(path.join(__dirname, '../prisma/remaining-subcategories.sql'));
    
    // Import final subcategories (categories 12-20)
    console.log('\n📦 Importing subcategories for categories 12-20...');
    await runSQLFile(path.join(__dirname, '../prisma/final-subcategories.sql'));
    
    console.log('\n✅ Import complete!\n');
    
    // Verify
    console.log('🔍 Verifying subcategories per category:\n');
    const categories = await prisma.category.findMany({
      include: {
        subcategories: {
          where: { isActive: true }
        }
      },
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    
    categories.forEach((cat, index) => {
      const count = cat.subcategories.length;
      const status = count > 0 ? '✅' : '❌';
      console.log(`${status} ${index + 1}. ${cat.name.padEnd(35)} ${count} subcategories`);
    });
    
    const totalSubcats = await prisma.subCategory.count({ where: { isActive: true } });
    console.log(`\n📊 Total active subcategories: ${totalSubcats}`);
    console.log('\n🎉 Fix completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixSubcategories();
