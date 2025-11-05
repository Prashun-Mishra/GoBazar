const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testService() {
  try {
    console.log('🧪 Testing category service directly...\n');
    
    // Test direct Prisma query
    const directQuery = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        subcategories: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
    
    console.log(`📊 Direct Prisma query returned: ${directQuery.length} categories`);
    
    // Test the actual service
    try {
      const categoryService = require('../dist/services/categoryService').default;
      const serviceResult = await categoryService.getCategories();
      console.log(`🔧 CategoryService returned: ${serviceResult.length} categories`);
      
      if (serviceResult.length > 0) {
        console.log('\n📋 First few categories from service:');
        serviceResult.slice(0, 5).forEach((cat, index) => {
          console.log(`${index + 1}. ${cat.name} (subcategories: ${cat.subcategories?.length || 0})`);
        });
      }
    } catch (serviceError) {
      console.log('❌ Service error:', serviceError.message);
      console.log('🔄 Service might not be compiled. Let\'s test the API endpoint...');
      
      // Test API endpoint
      const fetch = require('node-fetch');
      const response = await fetch('http://localhost:5000/api/categories');
      const apiData = await response.json();
      
      console.log(`🌐 API endpoint returned:`, {
        success: apiData.success,
        dataLength: apiData.data?.length,
        message: apiData.message
      });
      
      if (apiData.data && apiData.data.length > 0) {
        console.log('\n📋 First few categories from API:');
        apiData.data.slice(0, 5).forEach((cat, index) => {
          console.log(`${index + 1}. ${cat.name}`);
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testService();
