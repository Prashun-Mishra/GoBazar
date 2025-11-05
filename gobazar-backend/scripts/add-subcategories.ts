import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function runSQLFile(filePath: string) {
  console.log(`\n📄 Reading SQL file: ${path.basename(filePath)}`);
  
  const sql = fs.readFileSync(filePath, 'utf-8');
  
  // Split by semicolon and filter out empty statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  
  console.log(`   Found ${statements.length} SQL statements`);
  
  let successCount = 0;
  let skipCount = 0;
  
  for (const statement of statements) {
    try {
      await prisma.$executeRawUnsafe(statement);
      successCount++;
    } catch (error: any) {
      // Ignore duplicate key errors (already exists)
      if (error.code === '23505' || error.message.includes('duplicate')) {
        skipCount++;
      } else {
        console.error(`   ❌ Error executing statement:`, error.message);
      }
    }
  }
  
  console.log(`   ✅ Success: ${successCount}, Skipped (already exists): ${skipCount}`);
}

async function main() {
  console.log('========================================');
  console.log('ADDING ALL SUBCATEGORIES TO DATABASE');
  console.log('========================================\n');
  console.log('This will add subcategories for all 20 categories');
  console.log('Total: 200+ subcategories\n');
  
  const sqlFiles = [
    'prisma/all-subcategories.sql',
    'prisma/all-subcategories-part2.sql',
    'prisma/all-subcategories-part3.sql',
    'prisma/all-subcategories-part4.sql',
  ];
  
  try {
    for (let i = 0; i < sqlFiles.length; i++) {
      console.log(`\n[${i + 1}/${sqlFiles.length}] Processing ${sqlFiles[i]}...`);
      const filePath = path.join(process.cwd(), sqlFiles[i]);
      
      if (!fs.existsSync(filePath)) {
        console.log(`   ⚠️  File not found, skipping...`);
        continue;
      }
      
      await runSQLFile(filePath);
    }
    
    // Count total subcategories
    const count = await prisma.subCategory.count();
    
    console.log('\n========================================');
    console.log('✅ SUCCESS!');
    console.log('========================================\n');
    console.log(`Total subcategories in database: ${count}`);
    console.log('\nYou can now:');
    console.log('1. Go to admin panel: http://localhost:3000/admin/products');
    console.log('2. Click "Add Product"');
    console.log('3. Select any category');
    console.log('4. See all subcategories appear in the dropdown!');
    console.log('\n========================================');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
