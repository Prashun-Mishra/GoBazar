const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixCategories() {
  try {
    console.log('🔧 Fixing categories...\n');
    
    // Update all categories to be active
    const updateResult = await prisma.category.updateMany({
      data: { isActive: true }
    });
    
    console.log(`✅ Updated ${updateResult.count} categories to active`);
    
    // Update all subcategories to be active
    const updateSubResult = await prisma.subCategory.updateMany({
      data: { isActive: true }
    });
    
    console.log(`✅ Updated ${updateSubResult.count} subcategories to active`);
    
    // Verify the fix
    const activeCategories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    
    console.log(`\n📊 Now showing ${activeCategories.length} active categories:`);
    activeCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (${cat.slug})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixCategories();
