-- Complete Subcategories for All 20 Categories
-- Run this SQL to add all subcategories

-- First, get category IDs (we'll need to match by slug)

-- 1) Vegetables & Fruits
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Fresh Vegetables', 'fresh-vegetables', id, 1, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Fruits', 'fruits', id, 2, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Mangoes & Melons', 'mangoes-melons', id, 3, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Seasonal', 'seasonal-veg', id, 4, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Exotics', 'exotics', id, 5, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Freshly Cut & Sprouts', 'freshly-cut-sprouts', id, 6, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Frozen Veg', 'frozen-veg', id, 7, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Leafies & Herbs', 'leafies-herbs', id, 8, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Flowers & Leaves', 'flowers-leaves', id, 9, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Combo & Recipes', 'combo-recipes', id, 10, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'All Fruits & Vegetables', 'all-fruits-vegetables', id, 11, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Apples & Pears', 'apples-pears', id, 12, true FROM categories WHERE slug = 'vegetables-fruits'
ON CONFLICT (slug) DO NOTHING;

-- 2) Dairy & Breakfast
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Milk', 'milk', id, 1, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Bread & Pav', 'bread-pav', id, 2, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Eggs', 'eggs-dairy', id, 3, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Flakes & Kids Cereals', 'flakes-kids-cereals', id, 4, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Muesli & Granola', 'muesli-granola', id, 5, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Oats', 'oats', id, 6, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Paneer & Tofu', 'paneer-tofu', id, 7, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Curd & Yogurt', 'curd-yogurt', id, 8, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Butter & More', 'butter-more', id, 9, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cheese', 'cheese', id, 10, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cream & Condensed Milk', 'cream-condensed-milk', id, 11, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Vermicelli, Poha, Daliya & Other Grains', 'vermicelli-poha-daliya', id, 12, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Peanut Butter', 'peanut-butter-dairy', id, 13, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Energy Bars', 'energy-bars-dairy', id, 14, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Lassi, Shakes & More', 'lassi-shakes-more', id, 15, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Breakfast Mixes', 'breakfast-mixes', id, 16, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Honey & Chyawanprash', 'honey-chyawanprash-dairy', id, 17, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Sausage, Salami & Ham', 'sausage-salami-ham', id, 18, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Batter', 'batter-dairy', id, 19, true FROM categories WHERE slug = 'dairy-breakfast'
ON CONFLICT (slug) DO NOTHING;

-- Script continues... Let me create part 2
