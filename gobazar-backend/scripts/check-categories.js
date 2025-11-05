const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCategories() {
  try {
    console.log('🔍 Checking database categories...');
    
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' }
    });
    
    console.log(`📊 Total categories in database: ${categories.length}`);
    console.log('\n📋 Categories list:');
    
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (${cat.slug}) - Active: ${cat.isActive}`);
    });
    
    const activeCategories = categories.filter(cat => cat.isActive);
    console.log(`\n✅ Active categories: ${activeCategories.length}`);
    
    const subcategories = await prisma.subCategory.findMany({
      orderBy: { order: 'asc' }
    });
    
    console.log(`📊 Total subcategories in database: ${subcategories.length}`);
    
    const activeSubcategories = subcategories.filter(sub => sub.isActive);
    console.log(`✅ Active subcategories: ${activeSubcategories.length}`);
    
  } catch (error) {
    console.error('❌ Error checking categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCategories();
