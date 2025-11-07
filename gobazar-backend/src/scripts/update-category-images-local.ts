import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoryImages: Record<string, string> = {
  'vegetables-fruits': '/fresh fruits and veg.avif',
  'dairy-breakfast': '/dairy,eggs and breads.avif',
  'munchies': '/cnacks and munchies.avif',
  'cold-drinks-juices': '/coldrink and juices.avif',
  'tea-coffee-health-drinks': '/Tea,Coffee and Health Drink.avif',
  'bakery-biscuits': '/Bakery and buiscuits.avif',
  'sweet-tooth': '/sweet-tooth.avif',
  'paan-corner': '/paan-corner_web.avif',
  'breakfast-instant-food': '/Breakfast and instant food.avif',
  'atta-rice-dal': '/Atta,Rice and Dal.avif',
  'masala-oil-more': '/Masala,oil and more.avif',
  'sauces-spreads': '/Sauces and spreads.avif',
  'chicken-meat-fish': '/Chicken , Meat and fish.avif',
  'organic-healthy-living': '/Organic & Healthy Living.avif',
  'baby-care': '/Baby Care.avif',
  'pharma-wellness': '/Pharma & Wellness.avif',
  'cleaning-essentials': '/Cleaning Essentials.avif',
  'home-office': '/Home & Office.avif',
  'personal-care': '/Personal Care.avif',
  'pet-care': '/PetCare.avif',
};

async function main() {
  console.log('🖼️ Updating category images with local files...');

  try {
    for (const [slug, imagePath] of Object.entries(categoryImages)) {
      const category = await prisma.category.update({
        where: { slug },
        data: { image: imagePath },
      });
      console.log(`✅ Updated ${category.name} with ${imagePath}`);
    }

    console.log('🎉 All category images updated successfully!');
  } catch (error) {
    console.error('❌ Error updating images:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
