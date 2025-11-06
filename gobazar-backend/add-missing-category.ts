import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addMissingCategory() {
  console.log('Adding Sauces & Spread category...');
  
  // Create the category
  const category = await prisma.category.upsert({
    where: { slug: 'sauces-spread' },
    update: {},
    create: {
      name: 'Sauces & Spread',
      slug: 'sauces-spread',
      image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400',
      order: 12,
    },
  });
  
  console.log('✅ Category created:', category.name);
  
  // Add subcategories
  const subcategories = [
    'Tomato & Chilli Ketchup', 'Asian Sauces', 'Mayonnaise', 'Peanut Butter',
    'Jam & Spreads', 'Honey & Chyawanprash', 'Syrups', 'Indian Chutney & Pickle',
    'Dips & Salad Dressings', 'Table Sauces', 'Cooking Sauces & Vinegar', 'Imported Spreads'
  ];
  
  for (let i = 0; i < subcategories.length; i++) {
    const subcategoryName = subcategories[i];
    const subcategorySlug = `sauces-spread-${subcategoryName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`;
    
    await prisma.subCategory.upsert({
      where: { slug: subcategorySlug },
      update: { name: subcategoryName, order: i + 1 },
      create: {
        name: subcategoryName,
        slug: subcategorySlug,
        categoryId: category.id,
        order: i + 1
      }
    });
    
    console.log(`  ✅ ${subcategoryName}`);
  }
  
  console.log('✅ Completed 12 subcategories for Sauces & Spread');
  console.log('\n🎉 All done!');
}

addMissingCategory()
  .catch((e) => {
    console.error('Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
