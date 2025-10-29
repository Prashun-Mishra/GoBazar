import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'vegetables-fruits' },
      update: {},
      create: {
        name: 'Vegetables & Fruits',
        slug: 'vegetables-fruits',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'dairy-breakfast' },
      update: {},
      create: {
        name: 'Dairy & Breakfast',
        slug: 'dairy-breakfast',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'munchies' },
      update: {},
      create: {
        name: 'Munchies',
        slug: 'munchies',
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cold-drinks-juices' },
      update: {},
      create: {
        name: 'Cold Drinks & Juices',
        slug: 'cold-drinks-juices',
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
        order: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tea-coffee-health-drinks' },
      update: {},
      create: {
        name: 'Tea, Coffee & Health Drinks',
        slug: 'tea-coffee-health-drinks',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        order: 5,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'bakery-biscuits' },
      update: {},
      create: {
        name: 'Bakery & Biscuits',
        slug: 'bakery-biscuits',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
        order: 6,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sweet-tooth' },
      update: {},
      create: {
        name: 'Sweet Tooth',
        slug: 'sweet-tooth',
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
        order: 7,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'paan-corner' },
      update: {},
      create: {
        name: 'Paan Corner',
        slug: 'paan-corner',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        order: 8,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'breakfast-instant-food' },
      update: {},
      create: {
        name: 'Breakfast & Instant Food',
        slug: 'breakfast-instant-food',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
        order: 9,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'atta-rice-dal' },
      update: {},
      create: {
        name: 'Atta, Rice & Dal',
        slug: 'atta-rice-dal',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
        order: 10,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'masala-oil-more' },
      update: {},
      create: {
        name: 'Masala, Oil & More',
        slug: 'masala-oil-more',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
        order: 11,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sauces-spreads' },
      update: {},
      create: {
        name: 'Sauces & Spreads',
        slug: 'sauces-spreads',
        image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400',
        order: 12,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'chicken-meat-fish' },
      update: {},
      create: {
        name: 'Chicken, Meat & Fish',
        slug: 'chicken-meat-fish',
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400',
        order: 13,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'organic-healthy-living' },
      update: {},
      create: {
        name: 'Organic & Healthy Living',
        slug: 'organic-healthy-living',
        image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400',
        order: 14,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'baby-care' },
      update: {},
      create: {
        name: 'Baby Care',
        slug: 'baby-care',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
        order: 15,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'pharma-wellness' },
      update: {},
      create: {
        name: 'Pharma & Wellness',
        slug: 'pharma-wellness',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        order: 16,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cleaning-essentials' },
      update: {},
      create: {
        name: 'Cleaning Essentials',
        slug: 'cleaning-essentials',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
        order: 17,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'home-office' },
      update: {},
      create: {
        name: 'Home & Office',
        slug: 'home-office',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        order: 18,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'personal-care' },
      update: {},
      create: {
        name: 'Personal Care',
        slug: 'personal-care',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
        order: 19,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'pet-care' },
      update: {},
      create: {
        name: 'Pet Care',
        slug: 'pet-care',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
        order: 20,
      },
    }),
  ]);

  console.log('✅ Categories created');

  // Create subcategories
  const subcategories = await Promise.all([
    // Vegetables & Fruits subcategories
    prisma.subCategory.upsert({
      where: { slug: 'fresh-vegetables' },
      update: {},
      create: {
        name: 'Fresh Vegetables',
        slug: 'fresh-vegetables',
        categoryId: categories[0].id,
        order: 1,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'fruits' },
      update: {},
      create: {
        name: 'Fruits',
        slug: 'fruits',
        categoryId: categories[0].id,
        order: 2,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'mangoes-melons' },
      update: {},
      create: {
        name: 'Mangoes & Melons',
        slug: 'mangoes-melons',
        categoryId: categories[0].id,
        order: 3,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'seasonal' },
      update: {},
      create: {
        name: 'Seasonal',
        slug: 'seasonal',
        categoryId: categories[0].id,
        order: 4,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'exotics' },
      update: {},
      create: {
        name: 'Exotics',
        slug: 'exotics',
        categoryId: categories[0].id,
        order: 5,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'freshly-cut-sprouts' },
      update: {},
      create: {
        name: 'Freshly Cut & Sprouts',
        slug: 'freshly-cut-sprouts',
        categoryId: categories[0].id,
        order: 6,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'frozen-veg' },
      update: {},
      create: {
        name: 'Frozen Veg',
        slug: 'frozen-veg',
        categoryId: categories[0].id,
        order: 7,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'leafies-herbs' },
      update: {},
      create: {
        name: 'Leafies & Herbs',
        slug: 'leafies-herbs',
        categoryId: categories[0].id,
        order: 8,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'flowers-leaves' },
      update: {},
      create: {
        name: 'Flowers & Leaves',
        slug: 'flowers-leaves',
        categoryId: categories[0].id,
        order: 9,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'combo-recipes' },
      update: {},
      create: {
        name: 'Combo & Recipes',
        slug: 'combo-recipes',
        categoryId: categories[0].id,
        order: 10,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'all-fruits-vegetables' },
      update: {},
      create: {
        name: 'All Fruits & Vegetables',
        slug: 'all-fruits-vegetables',
        categoryId: categories[0].id,
        order: 11,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'apples-pears' },
      update: {},
      create: {
        name: 'Apples & Pears',
        slug: 'apples-pears',
        categoryId: categories[0].id,
        order: 12,
      },
    }),

    // Dairy & Breakfast subcategories
    prisma.subCategory.upsert({
      where: { slug: 'milk' },
      update: {},
      create: {
        name: 'Milk',
        slug: 'milk',
        categoryId: categories[1].id,
        order: 1,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'bread-pav' },
      update: {},
      create: {
        name: 'Bread & Pav',
        slug: 'bread-pav',
        categoryId: categories[1].id,
        order: 2,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'eggs' },
      update: {},
      create: {
        name: 'Eggs',
        slug: 'eggs',
        categoryId: categories[1].id,
        order: 3,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'flakes-kids-cereals' },
      update: {},
      create: {
        name: 'Flakes & Kids Cereals',
        slug: 'flakes-kids-cereals',
        categoryId: categories[1].id,
        order: 4,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'muesli-granola' },
      update: {},
      create: {
        name: 'Muesli & Granola',
        slug: 'muesli-granola',
        categoryId: categories[1].id,
        order: 5,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'oats' },
      update: {},
      create: {
        name: 'Oats',
        slug: 'oats',
        categoryId: categories[1].id,
        order: 6,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'paneer-tofu' },
      update: {},
      create: {
        name: 'Paneer & Tofu',
        slug: 'paneer-tofu',
        categoryId: categories[1].id,
        order: 7,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'curd-yogurt' },
      update: {},
      create: {
        name: 'Curd & Yogurt',
        slug: 'curd-yogurt',
        categoryId: categories[1].id,
        order: 8,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'butter-more' },
      update: {},
      create: {
        name: 'Butter & More',
        slug: 'butter-more',
        categoryId: categories[1].id,
        order: 9,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'cheese' },
      update: {},
      create: {
        name: 'Cheese',
        slug: 'cheese',
        categoryId: categories[1].id,
        order: 10,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'cream-condensed-milk' },
      update: {},
      create: {
        name: 'Cream & Condensed Milk',
        slug: 'cream-condensed-milk',
        categoryId: categories[1].id,
        order: 11,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'vermicelli-poha-daliya' },
      update: {},
      create: {
        name: 'Vermicelli, Poha, Daliya & Other Grains',
        slug: 'vermicelli-poha-daliya',
        categoryId: categories[1].id,
        order: 12,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'peanut-butter' },
      update: {},
      create: {
        name: 'Peanut Butter',
        slug: 'peanut-butter',
        categoryId: categories[1].id,
        order: 13,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'energy-bars' },
      update: {},
      create: {
        name: 'Energy Bars',
        slug: 'energy-bars',
        categoryId: categories[1].id,
        order: 14,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'lassi-shakes-more' },
      update: {},
      create: {
        name: 'Lassi, Shakes & More',
        slug: 'lassi-shakes-more',
        categoryId: categories[1].id,
        order: 15,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'breakfast-mixes' },
      update: {},
      create: {
        name: 'Breakfast Mixes',
        slug: 'breakfast-mixes',
        categoryId: categories[1].id,
        order: 16,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'honey-chyawanprash' },
      update: {},
      create: {
        name: 'Honey & Chyawanprash',
        slug: 'honey-chyawanprash',
        categoryId: categories[1].id,
        order: 17,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'sausage-salami-ham' },
      update: {},
      create: {
        name: 'Sausage, Salami & Ham',
        slug: 'sausage-salami-ham',
        categoryId: categories[1].id,
        order: 18,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'batter' },
      update: {},
      create: {
        name: 'Batter',
        slug: 'batter',
        categoryId: categories[1].id,
        order: 19,
      },
    }),

    // Munchies subcategories
    prisma.subCategory.upsert({
      where: { slug: 'chips-crisps' },
      update: {},
      create: {
        name: 'Chips & Crisps',
        slug: 'chips-crisps',
        categoryId: categories[2].id,
        order: 1,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'rusks-wafers' },
      update: {},
      create: {
        name: 'Rusks & Wafers',
        slug: 'rusks-wafers',
        categoryId: categories[2].id,
        order: 2,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'munchies-energy-bars' },
      update: {},
      create: {
        name: 'Energy Bars',
        slug: 'munchies-energy-bars',
        categoryId: categories[2].id,
        order: 3,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'nachos' },
      update: {},
      create: {
        name: 'Nachos',
        slug: 'nachos',
        categoryId: categories[2].id,
        order: 4,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'bhujia-mixtures' },
      update: {},
      create: {
        name: 'Bhujia & Mixtures',
        slug: 'bhujia-mixtures',
        categoryId: categories[2].id,
        order: 5,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'popcorn' },
      update: {},
      create: {
        name: 'Popcorn',
        slug: 'popcorn',
        categoryId: categories[2].id,
        order: 6,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'namkeen-snacks' },
      update: {},
      create: {
        name: 'Namkeen Snacks',
        slug: 'namkeen-snacks',
        categoryId: categories[2].id,
        order: 7,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'makhana-more' },
      update: {},
      create: {
        name: 'Makhana & More',
        slug: 'makhana-more',
        categoryId: categories[2].id,
        order: 8,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'papad-fryums' },
      update: {},
      create: {
        name: 'Papad & Fryums',
        slug: 'papad-fryums',
        categoryId: categories[2].id,
        order: 9,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'imported-snacks' },
      update: {},
      create: {
        name: 'Imported Snacks',
        slug: 'imported-snacks',
        categoryId: categories[2].id,
        order: 10,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'granola' },
      update: {},
      create: {
        name: 'Granola',
        slug: 'granola',
        categoryId: categories[2].id,
        order: 11,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'munchies-gift-packs' },
      update: {},
      create: {
        name: 'Munchies Gift Packs',
        slug: 'munchies-gift-packs',
        categoryId: categories[2].id,
        order: 12,
      },
    }),

    // Cold Drinks & Juices subcategories
    prisma.subCategory.upsert({
      where: { slug: 'beverages-gift-packs' },
      update: {},
      create: {
        name: 'Beverages Gift Packs',
        slug: 'beverages-gift-packs',
        categoryId: categories[3].id,
        order: 1,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'soft-drinks' },
      update: {},
      create: {
        name: 'Soft Drinks',
        slug: 'soft-drinks',
        categoryId: categories[3].id,
        order: 2,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'fruit-juice' },
      update: {},
      create: {
        name: 'Fruit Juice',
        slug: 'fruit-juice',
        categoryId: categories[3].id,
        order: 3,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'mango-drinks' },
      update: {},
      create: {
        name: 'Mango Drinks',
        slug: 'mango-drinks',
        categoryId: categories[3].id,
        order: 4,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'pure-juices' },
      update: {},
      create: {
        name: 'Pure Juices',
        slug: 'pure-juices',
        categoryId: categories[3].id,
        order: 5,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'concentrates-syrups' },
      update: {},
      create: {
        name: 'Concentrates & Syrups',
        slug: 'concentrates-syrups',
        categoryId: categories[3].id,
        order: 6,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'herbal-drinks' },
      update: {},
      create: {
        name: 'Herbal Drinks',
        slug: 'herbal-drinks',
        categoryId: categories[3].id,
        order: 7,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'energy-drinks' },
      update: {},
      create: {
        name: 'Energy Drinks',
        slug: 'energy-drinks',
        categoryId: categories[3].id,
        order: 8,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'coconut-water' },
      update: {},
      create: {
        name: 'Coconut Water',
        slug: 'coconut-water',
        categoryId: categories[3].id,
        order: 9,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'cold-lassi-shakes-more' },
      update: {},
      create: {
        name: 'Lassi, Shakes & More',
        slug: 'cold-lassi-shakes-more',
        categoryId: categories[3].id,
        order: 10,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'water-ice-cubes' },
      update: {},
      create: {
        name: 'Water & Ice Cubes',
        slug: 'water-ice-cubes',
        categoryId: categories[3].id,
        order: 11,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'cold-coffee-ice-tea' },
      update: {},
      create: {
        name: 'Cold Coffee & Ice Tea',
        slug: 'cold-coffee-ice-tea',
        categoryId: categories[3].id,
        order: 12,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'soda-mixers' },
      update: {},
      create: {
        name: 'Soda & Mixers',
        slug: 'soda-mixers',
        categoryId: categories[3].id,
        order: 13,
      },
    }),
  ]);

  console.log('✅ Subcategories created');

  // Create sample products
  const products = await Promise.all([
    // Dairy products
    prisma.product.upsert({
      where: { id: 'prod-milk-1' },
      update: {},
      create: {
        id: 'prod-milk-1',
        name: 'Amul Fresh Milk',
        brand: 'Amul',
        categoryId: categories[0].id,
        subcategoryId: subcategories[0].id,
        price: 28,
        mrp: 30,
        discountPercent: 7,
        images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'],
        unit: '500ml',
        stock: 100,
        description: 'Fresh and pure milk from Amul, rich in calcium and protein.',
        highlights: ['Fresh & Pure', 'Rich in Calcium', 'No Preservatives'],
        rating: 4.5,
        reviewCount: 150,
        tags: ['milk', 'dairy', 'fresh', 'amul'],
        nutritionalInfo: 'Per 100ml: Energy 68kcal, Protein 3.2g, Fat 4.1g, Carbs 4.4g',
      },
    }),
    prisma.product.upsert({
      where: { id: 'prod-bread-1' },
      update: {},
      create: {
        id: 'prod-bread-1',
        name: 'Britannia White Bread',
        brand: 'Britannia',
        categoryId: categories[0].id,
        subcategoryId: subcategories[1].id,
        price: 25,
        mrp: 27,
        discountPercent: 7,
        images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'],
        unit: '400g',
        stock: 50,
        description: 'Soft and fresh white bread, perfect for breakfast and snacks.',
        highlights: ['Soft & Fresh', 'No Trans Fat', 'Enriched with Vitamins'],
        rating: 4.2,
        reviewCount: 89,
        tags: ['bread', 'breakfast', 'britannia'],
        nutritionalInfo: 'Per 100g: Energy 265kcal, Protein 8.9g, Fat 3.3g, Carbs 49.2g',
      },
    }),
    // Fruits
    prisma.product.upsert({
      where: { id: 'prod-apple-1' },
      update: {},
      create: {
        id: 'prod-apple-1',
        name: 'Fresh Red Apples',
        brand: 'FreshMart',
        categoryId: categories[1].id,
        subcategoryId: subcategories[3].id,
        price: 120,
        mrp: 140,
        discountPercent: 14,
        images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400'],
        unit: '1kg',
        stock: 75,
        description: 'Fresh, crisp and juicy red apples. Rich in fiber and vitamins.',
        highlights: ['Fresh & Crisp', 'Rich in Fiber', 'High in Vitamins'],
        rating: 4.7,
        reviewCount: 203,
        tags: ['apple', 'fruit', 'fresh', 'healthy'],
        nutritionalInfo: 'Per 100g: Energy 52kcal, Protein 0.3g, Fat 0.2g, Carbs 14g',
        benefits: 'Rich in antioxidants, supports heart health, aids digestion',
      },
    }),
    prisma.product.upsert({
      where: { id: 'prod-banana-1' },
      update: {},
      create: {
        id: 'prod-banana-1',
        name: 'Fresh Bananas',
        brand: 'FreshMart',
        categoryId: categories[1].id,
        subcategoryId: subcategories[3].id,
        price: 40,
        mrp: 45,
        discountPercent: 11,
        images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400'],
        unit: '1 dozen',
        stock: 60,
        description: 'Fresh and ripe bananas, perfect for snacking and smoothies.',
        highlights: ['Naturally Sweet', 'Rich in Potassium', 'Energy Booster'],
        rating: 4.4,
        reviewCount: 167,
        tags: ['banana', 'fruit', 'fresh', 'potassium'],
        nutritionalInfo: 'Per 100g: Energy 89kcal, Protein 1.1g, Fat 0.3g, Carbs 23g',
        benefits: 'Good source of potassium, supports muscle function, natural energy',
      },
    }),
    // Vegetables
    prisma.product.upsert({
      where: { id: 'prod-onion-1' },
      update: {},
      create: {
        id: 'prod-onion-1',
        name: 'Fresh Onions',
        brand: 'FreshMart',
        categoryId: categories[1].id,
        subcategoryId: subcategories[4].id,
        price: 30,
        mrp: 35,
        discountPercent: 14,
        images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400'],
        unit: '1kg',
        stock: 90,
        description: 'Fresh and quality onions, essential for cooking.',
        highlights: ['Fresh Quality', 'Essential Cooking Ingredient', 'Long Lasting'],
        rating: 4.1,
        reviewCount: 95,
        tags: ['onion', 'vegetable', 'cooking', 'fresh'],
        nutritionalInfo: 'Per 100g: Energy 40kcal, Protein 1.1g, Fat 0.1g, Carbs 9.3g',
      },
    }),
    // Snacks
    prisma.product.upsert({
      where: { id: 'prod-chips-1' },
      update: {},
      create: {
        id: 'prod-chips-1',
        name: 'Lays Classic Salted Chips',
        brand: 'Lays',
        categoryId: categories[2].id,
        price: 20,
        mrp: 20,
        discountPercent: 0,
        images: ['https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400'],
        unit: '52g',
        stock: 120,
        description: 'Crispy and delicious potato chips with the perfect amount of salt.',
        highlights: ['Crispy Texture', 'Perfect Salt Balance', 'Made from Real Potatoes'],
        rating: 4.3,
        reviewCount: 245,
        tags: ['chips', 'snack', 'lays', 'crispy'],
        nutritionalInfo: 'Per 100g: Energy 536kcal, Protein 6.6g, Fat 33.4g, Carbs 53.3g',
      },
    }),
  ]);

  console.log('✅ Products created');

  // Create product variants
  await Promise.all([
    // Milk variants
    prisma.productVariant.create({
      data: {
        name: '1 Liter',
        unit: '1L',
        price: 55,
        mrp: 60,
        stock: 80,
        productId: products[0].id,
      },
    }),
    // Apple variants
    prisma.productVariant.create({
      data: {
        name: '500g Pack',
        unit: '500g',
        price: 65,
        mrp: 75,
        stock: 40,
        productId: products[2].id,
      },
    }),
  ]);

  console.log('✅ Product variants created');

  // Create sample coupons
  await Promise.all([
    prisma.coupon.upsert({
      where: { code: 'WELCOME10' },
      update: {},
      create: {
        code: 'WELCOME10',
        description: 'Welcome offer - 10% off on first order',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        minOrderValue: 200,
        maxDiscount: 100,
        validFrom: new Date(),
        validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        usageLimit: 1000,
      },
    }),
    prisma.coupon.upsert({
      where: { code: 'SAVE50' },
      update: {},
      create: {
        code: 'SAVE50',
        description: 'Flat ₹50 off on orders above ₹500',
        discountType: 'FIXED',
        discountValue: 50,
        minOrderValue: 500,
        validFrom: new Date(),
        validTo: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
        usageLimit: 500,
      },
    }),
  ]);

  console.log('✅ Coupons created');

  // Create admin user
  await prisma.user.upsert({
    where: { email: 'gobazar.2025@gmail.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'gobazar.2025@gmail.com',
      phone: '+91 9999999999',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
