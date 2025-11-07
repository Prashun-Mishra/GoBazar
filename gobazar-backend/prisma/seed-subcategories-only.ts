import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoriesData = [
  {
    slug: 'vegetables-fruits',
    subcategories: [
      'Fresh Vegetables', 'Fruits', 'Mangoes & Melons', 'Seasonal', 'Exotics',
      'Freshly Cut & Sprouts', 'Frozen Veg', 'Leafies & Herbs', 'Flowers & Leaves',
      'Combo & Recipes', 'All Fruits & Vegetables', 'Apples & Pears'
    ]
  },
  {
    slug: 'dairy-breakfast',
    subcategories: [
      'Milk', 'Bread & Pav', 'Eggs', 'Flakes & Kids Cereals', 'Muesli & Granola',
      'Oats', 'Paneer & Tofu', 'Curd & Yogurt', 'Butter & More', 'Cheese',
      'Cream & Condensed Milk', 'Vermicelli', 'Poha', 'Daliya & Other Grains',
      'Peanut Butter', 'Energy Bars', 'Lassi, Shakes & More', 'Breakfast Mixes',
      'Honey & Chyawanprash', 'Sausage, Salami & Ham', 'Batter'
    ]
  },
  {
    slug: 'munchies',
    subcategories: [
      'Chips & Crisps', 'Rusks & Wafers', 'Energy Bars', 'Nachos', 'Bhujia & Mixtures',
      'Popcorn', 'Namkeen Snacks', 'Makhana & More', 'Papad & Fryums', 'Imported Snacks',
      'Granola', 'Munchies Gift Packs'
    ]
  },
  {
    slug: 'cold-drinks-juices',
    subcategories: [
      'Beverages Gift Packs', 'Soft Drinks', 'Fruit Juice', 'Mango Drinks', 'Pure Juices',
      'Concentrates & Syrups', 'Herbal Drinks', 'Energy Drinks', 'Coconut Water',
      'Lassi, Shakes & More', 'Water & Ice Cubes', 'Cold Coffee & Ice Tea', 'Soda & Mixers'
    ]
  },
  {
    slug: 'tea-coffee-health-drinks',
    subcategories: [
      'Tea', 'Coffee', 'Milk Drinks', 'Green & Flavoured Tea', 'Herbal Drinks',
      'Hot Chocolate', 'Energy Drinks', 'Lassi, Shakes & More', 'Cold Coffee & Ice Tea',
      'Tea & Coffee Add-Ons', 'Lactose Free Drink', 'Imported Tea & Coffee'
    ]
  },
  {
    slug: 'bakery-biscuits',
    subcategories: [
      'Biscuits Gift Pack', 'Bread & Pav', 'Cookies', 'Cream Biscuits', 'Glucose',
      'Glucose & Marine', 'Healthy & Digestive', 'Rusks & Wafers', 'Cakes & Rolls',
      'Baking Ingredients', 'Sweet & Salty', 'Gourmet Bakery'
    ]
  },
  {
    slug: 'sweet-tooth',
    subcategories: [
      'Indian Sweets', 'Chocolate Gift Pack', 'Ice Cream & Frozen Dessert', 'Chocolate Packs',
      'Chocolates', 'Energy Bars', 'Candies & Gum', 'Syrups', 'Cakes & Rolls',
      'Mouth Fresheners', 'Flavoured Yogurts'
    ]
  },
  {
    slug: 'paan-corner',
    subcategories: [
      'Cigarettes', 'Cigar', 'Rolling Needs', 'Smoking Cessation', 'Candies & Gum',
      'Mouth Fresheners', 'Ashtrays', 'Lighters', 'Tobacco'
    ]
  },
  {
    slug: 'breakfast-instant-food',
    subcategories: [
      'Noodles', 'Frozen Veg Snacks', 'Frozen Non-Veg Snacks', 'Pasta & More',
      'Instant Mixes', 'Energy Bars', 'Soup', 'Frozen Veg', 'Ready to Cook & Eat',
      'Dessert & Cake Mixes', 'Herbs & Seasoning', 'Batter', 'Imported Noodles & Pasta'
    ]
  },
  {
    slug: 'atta-rice-dal',
    subcategories: [
      'Atta', 'Rice', 'Toor', 'Urad & Chana', 'Besan', 'Sooji & Maida', 'Poha',
      'Daliya & Other Grains', 'Millet & Other Flours', 'Rajma', 'Cholle & Others', 'Moong & Masoor'
    ]
  },
  {
    slug: 'masala-oil-more',
    subcategories: [
      'Oil', 'Dry Fruits', 'Ghee & Vanaspati', 'Whole Spices', 'Powdered Spice',
      'Dates & Seeds', 'Salt', 'Sugar & Jaggery', 'Papad & Fryums', 'Dry Fruit Gift Packs'
    ]
  },
  {
    slug: 'sauces-spreads',
    subcategories: [
      'Tomato & Chilli Ketchup', 'Asian Sauces', 'Mayonnaise', 'Peanut Butter',
      'Jam & Spreads', 'Honey & Chyawanprash', 'Syrups', 'Indian Chutney & Pickle',
      'Dips & Salad Dressings', 'Table Sauces', 'Cooking Sauces & Vinegar', 'Imported Spreads'
    ]
  },
  {
    slug: 'chicken-meat-fish',
    subcategories: [
      'Fresh Meat', 'Eggs', 'Frozen Non-Veg Snacks', 'Chicken', 'Mutton',
      'Fish & Seafood', 'Sausages', 'Salami & Ham', 'Exotic Meat'
    ]
  },
  {
    slug: 'organic-healthy-living',
    subcategories: [
      'Oil & Ghee', 'Flour', 'Noodles & Pasta', 'Dry Fruits & Seeds', 'Pulses & Millets',
      'Premium Sauces & Spreads', 'Spices & Vinegar', 'Organic Salt', 'Sugar & Honey',
      'Chocolate & Candies', 'Rice & Rice Products', 'Cookies & Wafers', 'Tea & Coffee'
    ]
  },
  {
    slug: 'baby-care',
    subcategories: [
      'Diapers & More', 'Bathing Needs', 'Baby Wipes', 'Baby Food', 'Skin & Hair Care',
      'Feeding Essentials', 'Oral & Nasal Care', 'Nursing', 'Baby Gifting & Toys',
      'Hygiene', 'Mom Care Needs', 'Health & Safety', 'Baby Accessories', 'Baby Gear'
    ]
  },
  {
    slug: 'pharma-wellness',
    subcategories: [
      'Sexual Wellness', 'Adult Diapers', 'Health & Wellness Supplements', 'Protein & Workout Supplements',
      'Masks & Sanitizers', 'Milk Drinks', 'Smoking Cessation', 'Herbal Drinks',
      'Chyawanprash', 'Health & Ortho Supports', 'Pure OTC', 'Hangover Cure'
    ]
  },
  {
    slug: 'cleaning-essentials',
    subcategories: [
      'Fabric Conditioners & Additive', 'Floor & Surface Cleaners', 'Toilet & Bathroom Cleaners',
      'Fresheners', 'Detergent Powder & Bars', 'Dishwashing Gels & Tablets', 'Cleaning Tools',
      'Dishwashing Bars & Tubs', 'Disinfectants', 'Dishwashing Accessories', 'Shoe Care',
      'Garbage Bags', 'Liquid Detergents', 'Repellents'
    ]
  },
  {
    slug: 'home-office',
    subcategories: [
      'Pooja Needs', 'Party Essentials', 'Home Décor', 'Festive & Occasion Needs',
      'Tissues & Disposables', 'Bathroom Essentials', 'Sports & Fitness', 'Car & Bike Care',
      'Home Improvement', 'Flowers, Plants & Gardening', 'Forex Cards', 'Home Furnishing'
    ]
  },
  {
    slug: 'personal-care',
    subcategories: [
      'Face & Body Moisturizer', 'Bath & Beauty Gifts', 'Feminine Care', 'Oral Care',
      'Handwash', 'Face Cleaning', 'Men\'s Grooming', 'Sunscreen', 'Hair Care',
      'Deodorant & Talc', 'Women\'s Grooming', 'Skin & Hair Care', 'Face Wash',
      'Bathing Soaps', 'Face Moisturizer', 'Shower Gels & Body Wash', 'Bathing'
    ]
  },
  {
    slug: 'pet-care',
    subcategories: [
      'Accessories & Other Supplies', 'Cat Needs', 'Diverse Pet Food', 'Dogs Needs', 'Pet Grooming'
    ]
  }
];

async function main() {
  console.log('🌱 Adding subcategories only...');

  try {
    let totalAdded = 0;

    for (const catData of categoriesData) {
      const category = await prisma.category.findUnique({
        where: { slug: catData.slug },
      });

      if (!category) {
        console.log(`⚠️ Category not found: ${catData.slug}`);
        continue;
      }

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
        totalAdded++;
      }
    }

    console.log(`✅ Added ${totalAdded} subcategories`);
    console.log('🎉 Subcategories seeding completed successfully!');
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
