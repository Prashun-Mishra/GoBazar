const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function debugCategories() {
  try {
    console.log('🔍 Debugging categories issue...\n');
    
    // Check total categories in database
    const allCategories = await prisma.category.findMany({
      orderBy: { order: 'asc' }
    });
    console.log(`📊 Total categories in DB: ${allCategories.length}`);
    
    // Check active categories
    const activeCategories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    console.log(`✅ Active categories: ${activeCategories.length}`);
    
    // Check inactive categories
    const inactiveCategories = allCategories.filter(cat => !cat.isActive);
    console.log(`❌ Inactive categories: ${inactiveCategories.length}`);
    
    if (inactiveCategories.length > 0) {
      console.log('\n❌ Inactive categories:');
      inactiveCategories.forEach((cat, index) => {
        console.log(`${index + 1}. ${cat.name} (${cat.slug})`);
      });
    }
    
    // Test the service method directly
    console.log('\n🧪 Testing categoryService.getCategories()...');
    const categoryService = require('../dist/services/categoryService').default;
    const serviceResult = await categoryService.getCategories();
    console.log(`🔧 Service returned: ${serviceResult.length} categories`);
    
    if (serviceResult.length !== activeCategories.length) {
      console.log('⚠️  Mismatch between direct query and service!');
    }
    
    // List all active categories
    console.log('\n📋 Active categories list:');
    activeCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (order: ${cat.order})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugCategories();
