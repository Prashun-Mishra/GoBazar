import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCategories() {
  console.log('📋 All categories in database:\n');

  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: 'asc' }
  });

  categories.forEach((cat, index) => {
    console.log(`${index + 1}. ${cat.name} (${cat.slug})`);
  });

  console.log(`\n✅ Total: ${categories.length} categories`);
}

checkCategories()
  .catch((e) => {
    console.error('Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
