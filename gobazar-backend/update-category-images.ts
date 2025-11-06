import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateCategoryImages() {
  console.log('🖼️ Updating category images...\n');

  // Map of category slugs to their local image paths from public folder
  const categoryImages: Record<string, string> = {
    'atta-rice-dal': '/Atta,Rice and Dal.avif',
    'baby-care': '/Baby Care.avif',
    'bakery-biscuits': '/Bakery and buiscuits.avif',
    'breakfast-instant-food': '/Breakfast and instant food.avif',
    'chicken-meat-fish': '/Chicken , Meat and fish.avif',
    'cleaning-essentials': '/Cleaning Essentials.avif',
    'cold-drinks-juices': '/coldrink and juices.avif',
    'dairy-breakfast': '/dairy,eggs and breads.avif',
    'home-office': '/Home & Office.avif',
    'masala-oil-more': '/Masala,oil and more.avif',
    'munchies': '/cnacks and munchies.avif',
    'organic-healthy-living': '/Organic & Healthy Living.avif',
    'paan-corner': '/paan-corner_web.avif',
    'personal-care': '/Personal Care.avif',
    'pet-care': '/PetCare.avif',
    'pharma-wellness': '/Pharma & Wellness.avif',
    'sauces-spread': '/Sauces and spreads.avif',
    'sweet-tooth': '/sweet tooth.avif',
    'tea-coffee-health-drinks': '/Tea,Coffee and Health Drink.avif',
    'vegetables-fruits': '/fresh fruits and veg.avif',
  };

  let updated = 0;
  let failed = 0;

  for (const [slug, imageUrl] of Object.entries(categoryImages)) {
    try {
      const category = await prisma.category.findUnique({
        where: { slug }
      });

      if (category) {
        await prisma.category.update({
          where: { slug },
          data: { image: imageUrl }
        });
        console.log(`✅ Updated ${category.name} (${slug})`);
        updated++;
      } else {
        console.log(`⚠️ Category not found: ${slug}`);
        failed++;
      }
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error);
      failed++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`✅ Updated: ${updated}`);
  console.log(`❌ Failed: ${failed}`);
}

updateCategoryImages()
  .catch((e) => {
    console.error('Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
