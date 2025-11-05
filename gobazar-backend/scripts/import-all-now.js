const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const subcategoriesData = {
  'vegetables-fruits': ['Fresh Vegetables', 'Fruits', 'Mangoes & Melons', 'Seasonal', 'Exotics', 'Freshly Cut & Sprouts', 'Frozen Veg', 'Leafies & Herbs', 'Flowers & Leaves', 'Combo & Recipes', 'All Fruits & Vegetables', 'Apples & Pears'],
  'dairy-breakfast': ['Milk', 'Bread & Pav', 'Eggs', 'Flakes & Kids Cereals', 'Muesli & Granola', 'Oats', 'Paneer & Tofu', 'Curd & Yogurt', 'Butter & More', 'Cheese', 'Cream & Condensed Milk', 'Vermicelli, Poha, Daliya & Other Grains', 'Peanut Butter', 'Energy Bars', 'Lassi, Shakes & More', 'Breakfast Mixes', 'Honey & Chyawanprash', 'Sausage, Salami & Ham', 'Batter'],
  'munchies': ['Chips & Crisps', 'Rusks & Wafers', 'Energy Bars', 'Nachos', 'Bhujia & Mixtures', 'Popcorn', 'Namkeen Snacks', 'Makhana & More', 'Papad & Fryums', 'Imported Snacks', 'Granola', 'Munchies Gift Packs'],
  'cold-drinks-juices': ['Beverages Gift Packs', 'Soft Drinks', 'Fruit Juice', 'Mango Drinks', 'Pure Juices', 'Concentrates & Syrups', 'Herbal Drinks', 'Energy Drinks', 'Coconut Water', 'Lassi, Shakes & More', 'Water & Ice Cubes', 'Cold Coffee & Ice Tea', 'Soda & Mixers'],
  'tea-coffee-health-drinks': ['Tea', 'Coffee', 'Milk Drinks', 'Green & Flavoured Tea', 'Herbal Drinks', 'Hot Chocolate', 'Energy Drinks', 'Lassi, Shakes & More', 'Cold Coffee & Ice Tea', 'Tea & Coffee Add-Ons', 'Lactose Free Drink', 'Imported Tea & Coffee'],
  'bakery-biscuits': ['Biscuits Gift Pack', 'Bread & Pav', 'Cookies', 'Cream Biscuits', 'Glucose', 'Glucose & Marie', 'Healthy & Digestive', 'Rusks & Wafers', 'Cakes & Rolls', 'Baking Ingredients', 'Sweet & Salty', 'Gourmet Bakery'],
  'sweet-tooth': ['Indian Sweets', 'Chocolate Gift Pack', 'Ice Cream & Frozen Dessert', 'Chocolate Packs', 'Chocolates', 'Energy Bars', 'Candies & Gum', 'Syrups', 'Cakes & Rolls', 'Mouth Fresheners', 'Flavoured Yogurts'],
  'paan-corner': ['Cigarettes', 'Cigar', 'Rolling Needs', 'Smoking Cessation', 'Candies & Gum', 'Mouth Fresheners', 'Ashtrays', 'Lighters', 'Tobacco'],
  'breakfast-instant-food': ['Noodles', 'Frozen Veg Snacks', 'Frozen Non-Veg Snacks', 'Pasta & More', 'Instant Mixes', 'Energy Bars', 'Soup', 'Frozen Veg', 'Ready to Cook & Eat', 'Dessert & Cake Mixes', 'Herbs & Seasoning', 'Batter', 'Imported Noodles & Pasta'],
  'atta-rice-dal': ['Atta', 'Rice', 'Toor, Urad & Chana', 'Besan', 'Sooji & Maida', 'Poha, Daliya & Other Grains', 'Millet & Other Flours', 'Rajma, Chole & Others', 'Moong & Masoor'],
  'masala-oil-more': ['Oil', 'Dry Fruits', 'Ghee & Vanaspati', 'Whole Spices', 'Powdered Spice', 'Dates & Seeds', 'Salt', 'Sugar & Jaggery', 'Papad & Fryums', 'Dry Fruit Gift Packs'],
  'sauces-spreads': ['Tomato & Chilli Ketchup', 'Asian Sauces', 'Mayonnaise', 'Peanut Butter', 'Jam & Spreads', 'Honey & Chyawanprash', 'Syrups', 'Indian Chutney & Pickle', 'Dips & Salad Dressings', 'Table Sauces', 'Cooking Sauces & Vinegar', 'Imported Spreads'],
  'chicken-meat-fish': ['Fresh Meat', 'Eggs', 'Frozen Non Veg Snacks', 'Chicken', 'Mutton', 'Fish & Seafood', 'Sausages, Salami & Ham', 'Exotic Meat'],
  'organic-healthy-living': ['Oil & Ghee', 'Flour', 'Noodles & Pasta', 'Dry Fruits & Seeds', 'Pulses & Millets', 'Premium Sauces & Spreads', 'Spices & Vinegar', 'Organic Salt, Sugar & Honey', 'Chocolate & Candies', 'Rice & Rice Products', 'Cookies & Wafers', 'Tea & Coffee'],
  'baby-care': ['Diapers & More', 'Bathing Needs', 'Baby Wipes', 'Baby Food', 'Skin & Hair Care', 'Feeding Essentials', 'Oral & Nasal Care', 'Nursing', 'Baby Gifting & Toys', 'Hygiene', 'Mom Care Needs', 'Health & Safety', 'Baby Accessories', 'Baby Gear'],
  'pharma-wellness': ['Sexual Wellness', 'Adult Diapers', 'Health & Wellness Supplements', 'Protein and Workout Supplements', 'Masks & Sanitizers', 'Milk Drinks', 'Smoking Cessation', 'Herbal Drinks', 'Chyawanprash', 'Health & Ortho Supports', 'Pure OTC', 'Hangover Cure'],
  'cleaning-essentials': ['Fabric Conditioners & Additive', 'Floor & Surface Cleaners', 'Toilet & Bathroom Cleaners', 'Fresheners', 'Detergent Powder & Bars', 'Dishwashing Gels & Tablets', 'Cleaning Tools', 'Dishwashing Bars & Tubs', 'Disinfectants', 'Dishwashing Accessories', 'Shoe Care', 'Garbage Bags', 'Liquid Detergents', 'Repellents'],
  'home-office': ['Pooja Needs', 'Party Essentials', 'Home Décor', 'Festive & Occasion Needs', 'Tissues & Disposables', 'Bathroom Essentials', 'Sports & Fitness', 'Car & Bike Care', 'Home Improvement', 'Flowers, Plants & Gardening', 'Forex Cards', 'Home Furnishing'],
  'personal-care': ['Face & Body Moisturizer', 'Bath & Beauty Gifts', 'Feminine Care', 'Oral Care', 'Handwash', 'Face Cleaning', 'Mens Grooming', 'Sunscreen', 'Hair Care', 'Deodorant & Talc', 'Womens Grooming', 'Skin & Hair Care', 'Face Wash', 'Bathing Soaps', 'Face Moisturiser', 'Shower Gels & Body Wash', 'Bathing'],
  'pet-care': ['Accessories & Other Supplies', 'Cat Needs', 'Diverse Pet Food', 'Dogs Needs', 'Pet Grooming']
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function importAll() {
  try {
    console.log('🚀 Starting import of ALL categories and subcategories...\n');
    
    const categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
    console.log(`📊 Found ${categories.length} categories\n`);
    
    let imported = 0, skipped = 0;
    
    for (const cat of categories) {
      const subs = subcategoriesData[cat.slug];
      if (!subs) { console.log(`⚠️  No data for ${cat.name}`); continue; }
      
      console.log(`📦 ${cat.name} (${subs.length} subcategories)`);
      
      for (let i = 0; i < subs.length; i++) {
        const name = subs[i];
        const slug = slugify(name);
        
        const exists = await prisma.subCategory.findFirst({ where: { slug } });
        if (exists) { skipped++; continue; }
        
        await prisma.subCategory.create({
          data: { name, slug, categoryId: cat.id, order: i + 1, isActive: true }
        });
        imported++;
      }
      console.log(`   ✅ Done\n`);
    }
    
    console.log('\n========================================');
    console.log(`✅ Import Complete!`);
    console.log(`   Imported: ${imported} | Skipped: ${skipped}`);
    console.log('========================================\n');
    
    const final = await prisma.category.findMany({
      include: { subcategories: { where: { isActive: true } } },
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    
    console.log('🔍 Verification:\n');
    final.forEach((c, i) => {
      const status = c.subcategories.length > 0 ? '✅' : '❌';
      console.log(`${status} ${i + 1}. ${c.name.padEnd(35)} ${c.subcategories.length} subcategories`);
    });
    
    const total = await prisma.subCategory.count({ where: { isActive: true } });
    console.log(`\n📊 Total: ${total} subcategories\n🎉 Done!\n`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importAll();
