import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkProducts() {
  console.log('🔍 Checking products by category...\n');
  
  const categories = await prisma.category.findMany({
    where: {
      slug: {
        in: ['vegetables-fruits', 'dairy-breakfast', 'munchies']
      }
    },
    include: {
      products: {
        take: 5
      }
    }
  });
  
  for (const category of categories) {
    console.log(`📁 ${category.name} (${category.slug})`);
    console.log(`   Total products: ${category.products.length}`);
    if (category.products.length > 0) {
      category.products.forEach(p => {
        console.log(`   - ${p.name} (₹${p.price})`);
      });
    } else {
      console.log('   ❌ No products found!');
    }
    console.log('');
  }
  
  // Check total products
  const totalProducts = await prisma.product.count();
  console.log(`\n📦 Total products in database: ${totalProducts}`);
}

checkProducts()
  .catch((e) => {
    console.error('Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
