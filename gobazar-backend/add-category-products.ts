import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addProducts() {
  console.log('🌱 Adding products for first 3 categories...\n');

  // Get categories
  const vegFruitsCategory = await prisma.category.findUnique({
    where: { slug: 'vegetables-fruits' }
  });
  
  const dairyCategory = await prisma.category.findUnique({
    where: { slug: 'dairy-breakfast' }
  });
  
  const munchiesCategory = await prisma.category.findUnique({
    where: { slug: 'munchies' }
  });

  if (!vegFruitsCategory || !dairyCategory || !munchiesCategory) {
    console.log('❌ Categories not found!');
    return;
  }

  // Add Vegetables & Fruits products
  console.log('🥕 Adding Vegetables & Fruits products...');
  const vegProducts = [
    { name: 'Fresh Red Apples', price: 120, mrp: 140, stock: 100, unit: '1kg', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400' },
    { name: 'Fresh Bananas', price: 40, mrp: 45, stock: 150, unit: '1 dozen', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400' },
    { name: 'Fresh Farm Tomatoes', price: 35, mrp: 50, stock: 200, unit: '1kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400' },
    { name: 'Fresh Potatoes', price: 25, mrp: 30, stock: 180, unit: '1kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' },
    { name: 'Fresh Onions', price: 30, mrp: 35, stock: 160, unit: '1kg', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=400' },
    { name: 'Fresh Carrots', price: 40, mrp: 45, stock: 120, unit: '500g', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400' },
    { name: 'Fresh Green Capsicum', price: 50, mrp: 60, stock: 90, unit: '500g', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400' },
    { name: 'Fresh Spinach', price: 20, mrp: 25, stock: 100, unit: '250g', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400' },
  ];

  for (const product of vegProducts) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });
    
    if (!existing) {
      const { image, ...productData } = product;
      await prisma.product.create({
        data: {
          ...productData,
          description: product.name,
          brand: 'Fresh Farm',
          categoryId: vegFruitsCategory.id,
          images: [image],
          isActive: true,
        }
      });
    }
  }
  console.log(`✅ Added ${vegProducts.length} products to Vegetables & Fruits\n`);

  // Add Dairy & Breakfast products
  console.log('🥛 Adding Dairy & Breakfast products...');
  const dairyProducts = [
    { name: 'Amul Fresh Milk', price: 28, mrp: 30, stock: 200, unit: '500ml', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
    { name: 'Britannia White Bread', price: 25, mrp: 27, stock: 150, unit: '400g', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
    { name: 'Farm Fresh Eggs', price: 70, mrp: 80, stock: 180, unit: '12 pcs', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400' },
    { name: 'Amul Butter', price: 50, mrp: 55, stock: 120, unit: '100g', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400' },
    { name: 'Mother Dairy Curd', price: 30, mrp: 35, stock: 160, unit: '400g', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400' },
    { name: 'Amul Cheese Slices', price: 110, mrp: 125, stock: 90, unit: '200g', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400' },
    { name: 'Amul Paneer', price: 80, mrp: 90, stock: 100, unit: '200g', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
    { name: 'Kellogs Corn Flakes', price: 180, mrp: 200, stock: 80, unit: '475g', image: 'https://images.unsplash.com/photo-1526798424234-8954efdce33e?w=400' },
  ];

  for (const product of dairyProducts) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });
    
    if (!existing) {
      const { image, ...productData } = product;
      await prisma.product.create({
        data: {
          ...productData,
          description: product.name,
          brand: product.name.split(' ')[0],
          categoryId: dairyCategory.id,
          images: [image],
          isActive: true,
        }
      });
    }
  }
  console.log(`✅ Added ${dairyProducts.length} products to Dairy & Breakfast\n`);

  // Add Munchies products
  console.log('🍿 Adding Munchies products...');
  const munchiesProducts = [
    { name: 'Lays Classic Salted Chips', price: 20, mrp: 20, stock: 200, unit: '52g', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
    { name: 'Kurkure Masala Munch', price: 10, mrp: 10, stock: 180, unit: '55g', image: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400' },
    { name: 'Haldirams Bhujia', price: 40, mrp: 45, stock: 150, unit: '200g', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400' },
    { name: 'Bingo Mad Angles', price: 10, mrp: 10, stock: 190, unit: '36.5g', image: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400' },
    { name: 'Parle Monaco Biscuits', price: 15, mrp: 20, stock: 160, unit: '75g', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400' },
    { name: 'Britannia Good Day', price: 30, mrp: 35, stock: 140, unit: '100g', image: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400' },
    { name: 'Doritos Nacho Cheese', price: 35, mrp: 40, stock: 120, unit: '44g', image: 'https://images.unsplash.com/photo-1613919113640-c8c88a0213e7?w=400' },
    { name: 'Act II Popcorn', price: 50, mrp: 60, stock: 100, unit: '70g', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400' },
  ];

  for (const product of munchiesProducts) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });
    
    if (!existing) {
      const { image, ...productData } = product;
      await prisma.product.create({
        data: {
          ...productData,
          description: product.name,
          brand: product.name.split(' ')[0],
          categoryId: munchiesCategory.id,
          images: [image],
          isActive: true,
        }
      });
    }
  }
  console.log(`✅ Added ${munchiesProducts.length} products to Munchies\n`);

  console.log('🎉 All products added successfully!');
}

addProducts()
  .catch((e) => {
    console.error('Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
