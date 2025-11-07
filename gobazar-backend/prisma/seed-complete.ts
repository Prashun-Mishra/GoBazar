import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoriesData = [
  {
    name: 'Vegetables & Fruits',
    slug: 'vegetables-fruits',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
    subcategories: [
      'Fresh Vegetables', 'Fruits', 'Mangoes & Melons', 'Seasonal', 'Exotics',
      'Freshly Cut & Sprouts', 'Frozen Veg', 'Leafies & Herbs', 'Flowers & Leaves',
      'Combo & Recipes', 'All Fruits & Vegetables', 'Apples & Pears'
    ]
  },
  {
    name: 'Dairy & Breakfast',
    slug: 'dairy-breakfast',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
    subcategories: [
      'Milk', 'Bread & Pav', 'Eggs', 'Flakes & Kids Cereals', 'Muesli & Granola',
      'Oats', 'Paneer & Tofu', 'Curd & Yogurt', 'Butter & More', 'Cheese',
      'Cream & Condensed Milk', 'Vermicelli', 'Poha', 'Daliya & Other Grains',
      'Peanut Butter', 'Energy Bars', 'Lassi, Shakes & More', 'Breakfast Mixes',
      'Honey & Chyawanprash', 'Sausage, Salami & Ham', 'Batter'
    ]
  },
  {
    name: 'Munchies',
    slug: 'munchies',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
    subcategories: [
      'Chips & Crisps', 'Rusks & Wafers', 'Energy Bars', 'Nachos', 'Bhujia & Mixtures',
      'Popcorn', 'Namkeen Snacks', 'Makhana & More', 'Papad & Fryums', 'Imported Snacks',
      'Granola', 'Munchies Gift Packs'
    ]
  },
  {
    name: 'Cold Drinks & Juices',
    slug: 'cold-drinks-juices',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
    subcategories: [
      'Beverages Gift Packs', 'Soft Drinks', 'Fruit Juice', 'Mango Drinks', 'Pure Juices',
      'Concentrates & Syrups', 'Herbal Drinks', 'Energy Drinks', 'Coconut Water',
      'Lassi, Shakes & More', 'Water & Ice Cubes', 'Cold Coffee & Ice Tea', 'Soda & Mixers'
    ]
  },
  {
    name: 'Tea, Coffee & Health Drinks',
    slug: 'tea-coffee-health-drinks',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    subcategories: [
      'Tea', 'Coffee', 'Milk Drinks', 'Green & Flavoured Tea', 'Herbal Drinks',
      'Hot Chocolate', 'Energy Drinks', 'Lassi, Shakes & More', 'Cold Coffee & Ice Tea',
      'Tea & Coffee Add-Ons', 'Lactose Free Drink', 'Imported Tea & Coffee'
    ]
  },
  {
    name: 'Bakery & Biscuits',
    slug: 'bakery-biscuits',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    subcategories: [
      'Biscuits Gift Pack', 'Bread & Pav', 'Cookies', 'Cream Biscuits', 'Glucose',
      'Glucose & Marine', 'Healthy & Digestive', 'Rusks & Wafers', 'Cakes & Rolls',
      'Baking Ingredients', 'Sweet & Salty', 'Gourmet Bakery'
    ]
  },
  {
    name: 'Sweet Tooth',
    slug: 'sweet-tooth',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
    subcategories: [
      'Indian Sweets', 'Chocolate Gift Pack', 'Ice Cream & Frozen Dessert', 'Chocolate Packs',
      'Chocolates', 'Energy Bars', 'Candies & Gum', 'Syrups', 'Cakes & Rolls',
      'Mouth Fresheners', 'Flavoured Yogurts'
    ]
  },
  {
    name: 'Paan Corner',
    slug: 'paan-corner',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    subcategories: [
      'Cigarettes', 'Cigar', 'Rolling Needs', 'Smoking Cessation', 'Candies & Gum',
      'Mouth Fresheners', 'Ashtrays', 'Lighters', 'Tobacco'
    ]
  },
  {
    name: 'Breakfast & Instant Food',
    slug: 'breakfast-instant-food',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    subcategories: [
      'Noodles', 'Frozen Veg Snacks', 'Frozen Non-Veg Snacks', 'Pasta & More',
      'Instant Mixes', 'Energy Bars', 'Soup', 'Frozen Veg', 'Ready to Cook & Eat',
      'Dessert & Cake Mixes', 'Herbs & Seasoning', 'Batter', 'Imported Noodles & Pasta'
    ]
  },
  {
    name: 'Atta, Rice & Dal',
    slug: 'atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    subcategories: [
      'Atta', 'Rice', 'Toor', 'Urad & Chana', 'Besan', 'Sooji & Maida', 'Poha',
      'Daliya & Other Grains', 'Millet & Other Flours', 'Rajma', 'Cholle & Others', 'Moong & Masoor'
    ]
  },
  {
    name: 'Masala, Oil & More',
    slug: 'masala-oil-more',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
    subcategories: [
      'Oil', 'Dry Fruits', 'Ghee & Vanaspati', 'Whole Spices', 'Powdered Spice',
      'Dates & Seeds', 'Salt', 'Sugar & Jaggery', 'Papad & Fryums', 'Dry Fruit Gift Packs'
    ]
  },
  {
    name: 'Sauces & Spreads',
    slug: 'sauces-spreads',
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400',
    subcategories: [
      'Tomato & Chilli Ketchup', 'Asian Sauces', 'Mayonnaise', 'Peanut Butter',
      'Jam & Spreads', 'Honey & Chyawanprash', 'Syrups', 'Indian Chutney & Pickle',
      'Dips & Salad Dressings', 'Table Sauces', 'Cooking Sauces & Vinegar', 'Imported Spreads'
    ]
  },
  {
    name: 'Chicken, Meat & Fish',
    slug: 'chicken-meat-fish',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400',
    subcategories: [
      'Fresh Meat', 'Eggs', 'Frozen Non-Veg Snacks', 'Chicken', 'Mutton',
      'Fish & Seafood', 'Sausages', 'Salami & Ham', 'Exotic Meat'
    ]
  },
  {
    name: 'Organic & Healthy Living',
    slug: 'organic-healthy-living',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400',
    subcategories: [
      'Oil & Ghee', 'Flour', 'Noodles & Pasta', 'Dry Fruits & Seeds', 'Pulses & Millets',
      'Premium Sauces & Spreads', 'Spices & Vinegar', 'Organic Salt', 'Sugar & Honey',
      'Chocolate & Candies', 'Rice & Rice Products', 'Cookies & Wafers', 'Tea & Coffee'
    ]
  },
  {
    name: 'Baby Care',
    slug: 'baby-care',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    subcategories: [
      'Diapers & More', 'Bathing Needs', 'Baby Wipes', 'Baby Food', 'Skin & Hair Care',
      'Feeding Essentials', 'Oral & Nasal Care', 'Nursing', 'Baby Gifting & Toys',
      'Hygiene', 'Mom Care Needs', 'Health & Safety', 'Baby Accessories', 'Baby Gear'
    ]
  },
  {
    name: 'Pharma & Wellness',
    slug: 'pharma-wellness',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    subcategories: [
      'Sexual Wellness', 'Adult Diapers', 'Health & Wellness Supplements', 'Protein & Workout Supplements',
      'Masks & Sanitizers', 'Milk Drinks', 'Smoking Cessation', 'Herbal Drinks',
      'Chyawanprash', 'Health & Ortho Supports', 'Pure OTC', 'Hangover Cure'
    ]
  },
  {
    name: 'Cleaning Essentials',
    slug: 'cleaning-essentials',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
    subcategories: [
      'Fabric Conditioners & Additive', 'Floor & Surface Cleaners', 'Toilet & Bathroom Cleaners',
      'Fresheners', 'Detergent Powder & Bars', 'Dishwashing Gels & Tablets', 'Cleaning Tools',
      'Dishwashing Bars & Tubs', 'Disinfectants', 'Dishwashing Accessories', 'Shoe Care',
      'Garbage Bags', 'Liquid Detergents', 'Repellents'
    ]
  },
  {
    name: 'Home & Office',
    slug: 'home-office',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    subcategories: [
      'Pooja Needs', 'Party Essentials', 'Home Décor', 'Festive & Occasion Needs',
      'Tissues & Disposables', 'Bathroom Essentials', 'Sports & Fitness', 'Car & Bike Care',
      'Home Improvement', 'Flowers, Plants & Gardening', 'Forex Cards', 'Home Furnishing'
    ]
  },
  {
    name: 'Personal Care',
    slug: 'personal-care',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    subcategories: [
      'Face & Body Moisturizer', 'Bath & Beauty Gifts', 'Feminine Care', 'Oral Care',
      'Handwash', 'Face Cleaning', 'Men\'s Grooming', 'Sunscreen', 'Hair Care',
      'Deodorant & Talc', 'Women\'s Grooming', 'Skin & Hair Care', 'Face Wash',
      'Bathing Soaps', 'Face Moisturizer', 'Shower Gels & Body Wash', 'Bathing'
    ]
  },
  {
    name: 'Pet Care',
    slug: 'pet-care',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
    subcategories: [
      'Accessories & Other Supplies', 'Cat Needs', 'Diverse Pet Food', 'Dogs Needs', 'Pet Grooming'
    ]
  }
];

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create categories and subcategories
    for (const catData of categoriesData) {
      const category = await prisma.category.upsert({
        where: { slug: catData.slug },
        update: {},
        create: {
          name: catData.name,
          slug: catData.slug,
          image: catData.image,
          order: categoriesData.indexOf(catData) + 1,
        },
      });

      // Create subcategories for this category
      for (let i = 0; i < catData.subcategories.length; i++) {
        const subName = catData.subcategories[i];
        const subSlug = subName.toLowerCase().replace(/[&\s]+/g, '-').replace(/[^a-z0-9-]/g, '');
        
        await prisma.subCategory.upsert({
          where: { slug: subSlug },
          update: {},
          create: {
            name: subName,
            slug: subSlug,
            categoryId: category.id,
            order: i + 1,
            isActive: true,
          },
        });
      }
    }

    console.log('✅ All 20 categories with subcategories created');
    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
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
