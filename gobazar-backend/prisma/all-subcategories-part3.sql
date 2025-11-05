-- Part 3: Categories 6-13

-- 6) Bakery & Biscuits
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Biscuits Gift Pack', 'biscuits-gift-pack', id, 1, true FROM categories WHERE slug = 'bakery-biscuits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Bread & Pav', 'bread-pav-bakery', id, 2, true FROM categories WHERE slug = 'bakery-biscuits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cookies', 'cookies', id, 3, true FROM categories WHERE slug = 'bakery-biscuits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cream Biscuits', 'cream-biscuits', id, 4, true FROM categories WHERE slug = 'bakery-biscuits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Glucose & Marie', 'glucose-marie', id, 5, true FROM categories WHERE slug = 'bakery-biscuits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Healthy & Digestive', 'healthy-digestive', id, 6, true FROM categories WHERE slug = 'bakery-biscuits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Rusks & Wafers', 'rusks-wafers-bakery', id, 7, true FROM categories WHERE slug = 'bakery-biscuits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cakes & Rolls', 'cakes-rolls-bakery', id, 8, true FROM categories WHERE slug = 'bakery-biscuits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Baking Ingredients', 'baking-ingredients', id, 9, true FROM categories WHERE slug = 'bakery-biscuits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Sweet & Salty', 'sweet-salty', id, 10, true FROM categories WHERE slug = 'bakery-biscuits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Gourmet Bakery', 'gourmet-bakery', id, 11, true FROM categories WHERE slug = 'bakery-biscuits'
ON CONFLICT (slug) DO NOTHING;

-- 7) Sweet Tooth
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Indian Sweets', 'indian-sweets', id, 1, true FROM categories WHERE slug = 'sweet-tooth'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Chocolate Gift Pack', 'chocolate-gift-pack', id, 2, true FROM categories WHERE slug = 'sweet-tooth'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Ice Cream & Frozen Dessert', 'ice-cream-frozen-dessert', id, 3, true FROM categories WHERE slug = 'sweet-tooth'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Chocolate Packs', 'chocolate-packs', id, 4, true FROM categories WHERE slug = 'sweet-tooth'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Chocolates', 'chocolates', id, 5, true FROM categories WHERE slug = 'sweet-tooth'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Energy Bars', 'energy-bars-sweet', id, 6, true FROM categories WHERE slug = 'sweet-tooth'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Candies & Gum', 'candies-gum-sweet', id, 7, true FROM categories WHERE slug = 'sweet-tooth'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Syrups', 'syrups-sweet', id, 8, true FROM categories WHERE slug = 'sweet-tooth'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cakes & Rolls', 'cakes-rolls-sweet', id, 9, true FROM categories WHERE slug = 'sweet-tooth'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Mouth Fresheners', 'mouth-fresheners-sweet', id, 10, true FROM categories WHERE slug = 'sweet-tooth'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Flavoured Yogurts', 'flavoured-yogurts', id, 11, true FROM categories WHERE slug = 'sweet-tooth'
ON CONFLICT (slug) DO NOTHING;

-- 8) Paan Corner
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cigarettes', 'cigarettes', id, 1, true FROM categories WHERE slug = 'paan-corner'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cigar', 'cigar', id, 2, true FROM categories WHERE slug = 'paan-corner'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Rolling Needs', 'rolling-needs', id, 3, true FROM categories WHERE slug = 'paan-corner'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Smoking Cessation', 'smoking-cessation-paan', id, 4, true FROM categories WHERE slug = 'paan-corner'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Candies & Gum', 'candies-gum-paan', id, 5, true FROM categories WHERE slug = 'paan-corner'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Mouth Fresheners', 'mouth-fresheners-paan', id, 6, true FROM categories WHERE slug = 'paan-corner'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Ashtrays', 'ashtrays', id, 7, true FROM categories WHERE slug = 'paan-corner'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Lighters', 'lighters', id, 8, true FROM categories WHERE slug = 'paan-corner'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Tobacco', 'tobacco', id, 9, true FROM categories WHERE slug = 'paan-corner'
ON CONFLICT (slug) DO NOTHING;

-- 9) Breakfast & Instant Food
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Noodles', 'noodles', id, 1, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Frozen Veg Snacks', 'frozen-veg-snacks-instant', id, 2, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Frozen Non-Veg Snacks', 'frozen-nonveg-snacks-instant', id, 3, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Pasta & More', 'pasta-more', id, 4, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Instant Mixes', 'instant-mixes', id, 5, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Energy Bars', 'energy-bars-instant', id, 6, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Soup', 'soup', id, 7, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Frozen Veg', 'frozen-veg-instant', id, 8, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Ready to Cook & Eat', 'ready-cook-eat', id, 9, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Dessert & Cake Mixes', 'dessert-cake-mixes', id, 10, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Herbs & Seasoning', 'herbs-seasoning', id, 11, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Batter', 'batter-instant', id, 12, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Imported Noodles & Pasta', 'imported-noodles-pasta', id, 13, true FROM categories WHERE slug = 'breakfast-instant-food'
ON CONFLICT (slug) DO NOTHING;

-- 10) Atta, Rice & Dal
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Atta', 'atta', id, 1, true FROM categories WHERE slug = 'atta-rice-dal'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Rice', 'rice-atta', id, 2, true FROM categories WHERE slug = 'atta-rice-dal'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Toor, Urad & Chana', 'toor-urad-chana', id, 3, true FROM categories WHERE slug = 'atta-rice-dal'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Besan', 'besan', id, 4, true FROM categories WHERE slug = 'atta-rice-dal'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Sooji & Maida', 'sooji-maida', id, 5, true FROM categories WHERE slug = 'atta-rice-dal'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Poha, Daliya & Other Grains', 'poha-daliya-atta', id, 6, true FROM categories WHERE slug = 'atta-rice-dal'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Millet & Other Flours', 'millet-other-flours', id, 7, true FROM categories WHERE slug = 'atta-rice-dal'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Rajma, Chole & Others', 'rajma-chole-others', id, 8, true FROM categories WHERE slug = 'atta-rice-dal'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Moong & Masoor', 'moong-masoor', id, 9, true FROM categories WHERE slug = 'atta-rice-dal'
ON CONFLICT (slug) DO NOTHING;

-- 11) Masala, Oil & More
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Oil', 'oil-masala', id, 1, true FROM categories WHERE slug = 'masala-oil-more'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Dry Fruits', 'dry-fruits-masala', id, 2, true FROM categories WHERE slug = 'masala-oil-more'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Ghee & Vanaspati', 'ghee-vanaspati', id, 3, true FROM categories WHERE slug = 'masala-oil-more'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Whole Spices', 'whole-spices', id, 4, true FROM categories WHERE slug = 'masala-oil-more'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Powdered Spice', 'powdered-spice', id, 5, true FROM categories WHERE slug = 'masala-oil-more'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Dates & Seeds', 'dates-seeds', id, 6, true FROM categories WHERE slug = 'masala-oil-more'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Salt, Sugar & Jaggery', 'salt-sugar-jaggery', id, 7, true FROM categories WHERE slug = 'masala-oil-more'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Papad & Fryums', 'papad-fryums-masala', id, 8, true FROM categories WHERE slug = 'masala-oil-more'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Dry Fruit Gift Packs', 'dry-fruit-gift-packs', id, 9, true FROM categories WHERE slug = 'masala-oil-more'
ON CONFLICT (slug) DO NOTHING;

-- 12) Sauces & Spreads
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Tomato & Chilli Ketchup', 'tomato-chilli-ketchup', id, 1, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Asian Sauces', 'asian-sauces', id, 2, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Mayonnaise', 'mayonnaise', id, 3, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Peanut Butter', 'peanut-butter-sauces', id, 4, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Jam & Spreads', 'jam-spreads', id, 5, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Honey & Chyawanprash', 'honey-chyawanprash-sauces', id, 6, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Syrups', 'syrups-sauces', id, 7, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Indian Chutney & Pickle', 'indian-chutney-pickle', id, 8, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Dips & Salad Dressings', 'dips-salad-dressings', id, 9, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Table Sauces', 'table-sauces', id, 10, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cooking Sauces & Vinegar', 'cooking-sauces-vinegar', id, 11, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Imported Spreads', 'imported-spreads', id, 12, true FROM categories WHERE slug = 'sauces-spreads'
ON CONFLICT (slug) DO NOTHING;

-- 13) Chicken, Meat & Fish
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Fresh Meat', 'fresh-meat', id, 1, true FROM categories WHERE slug = 'chicken-meat-fish'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Eggs', 'eggs-meat', id, 2, true FROM categories WHERE slug = 'chicken-meat-fish'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Frozen Non-Veg Snacks', 'frozen-nonveg-snacks-meat', id, 3, true FROM categories WHERE slug = 'chicken-meat-fish'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Chicken', 'chicken', id, 4, true FROM categories WHERE slug = 'chicken-meat-fish'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Mutton', 'mutton', id, 5, true FROM categories WHERE slug = 'chicken-meat-fish'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Fish & Seafood', 'fish-seafood', id, 6, true FROM categories WHERE slug = 'chicken-meat-fish'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Sausages, Salami & Ham', 'sausages-salami-ham-meat', id, 7, true FROM categories WHERE slug = 'chicken-meat-fish'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Exotic Meat', 'exotic-meat', id, 8, true FROM categories WHERE slug = 'chicken-meat-fish'
ON CONFLICT (slug) DO NOTHING;
