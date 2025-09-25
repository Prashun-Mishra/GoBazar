import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'dairy-bread-eggs' },
      update: {},
      create: {
        name: 'Dairy, Bread & Eggs',
        slug: 'dairy-bread-eggs',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'fruits-vegetables' },
      update: {},
      create: {
        name: 'Fruits & Vegetables',
        slug: 'fruits-vegetables',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'snacks-beverages' },
      update: {},
      create: {
        name: 'Snacks & Beverages',
        slug: 'snacks-beverages',
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'grocery-staples' },
      update: {},
      create: {
        name: 'Grocery & Staples',
        slug: 'grocery-staples',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
        order: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'household-care' },
      update: {},
      create: {
        name: 'Household Care',
        slug: 'household-care',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
        order: 5,
      },
    }),
  ]);

  console.log('✅ Categories created');

  // Create subcategories
  const subcategories = await Promise.all([
    // Dairy, Bread & Eggs subcategories
    prisma.subCategory.upsert({
      where: { slug: 'milk-curd' },
      update: {},
      create: {
        name: 'Milk & Curd',
        slug: 'milk-curd',
        categoryId: categories[0].id,
        order: 1,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'bread-bakery' },
      update: {},
      create: {
        name: 'Bread & Bakery',
        slug: 'bread-bakery',
        categoryId: categories[0].id,
        order: 2,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'eggs' },
      update: {},
      create: {
        name: 'Eggs',
        slug: 'eggs',
        categoryId: categories[0].id,
        order: 3,
      },
    }),
    // Fruits & Vegetables subcategories
    prisma.subCategory.upsert({
      where: { slug: 'fresh-fruits' },
      update: {},
      create: {
        name: 'Fresh Fruits',
        slug: 'fresh-fruits',
        categoryId: categories[1].id,
        order: 1,
      },
    }),
    prisma.subCategory.upsert({
      where: { slug: 'fresh-vegetables' },
      update: {},
      create: {
        name: 'Fresh Vegetables',
        slug: 'fresh-vegetables',
        categoryId: categories[1].id,
        order: 2,
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
    where: { email: 'admin@gobazar.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@gobazar.com',
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
