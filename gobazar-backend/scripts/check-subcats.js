const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkSubcategories() {
  try {
    console.log('🔍 Checking subcategories by category...\n');
    
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        subcategories: {
          where: { isActive: true },
          orderBy: { order: 'asc' }
        }
      }
    });
    
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (ID: ${cat.id})`);
      console.log(`   Subcategories: ${cat.subcategories.length}`);
      if (cat.subcategories.length > 0) {
        cat.subcategories.forEach((sub, subIndex) => {
          console.log(`   ${subIndex + 1}. ${sub.name}`);
        });
      }
      console.log('');
    });
    
    const totalSubcats = await prisma.subCategory.count({
      where: { isActive: true }
    });
    console.log(`\n📊 Total active subcategories: ${totalSubcats}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSubcategories();
