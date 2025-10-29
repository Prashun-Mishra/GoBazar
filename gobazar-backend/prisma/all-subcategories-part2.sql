-- Part 2: Categories 3-10

-- 3) Munchies
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Chips & Crisps', 'chips-crisps', id, 1, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Rusks & Wafers', 'rusks-wafers-munchies', id, 2, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Energy Bars', 'energy-bars-munchies', id, 3, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Nachos', 'nachos', id, 4, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Bhujia & Mixtures', 'bhujia-mixtures', id, 5, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Popcorn', 'popcorn', id, 6, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Namkeen Snacks', 'namkeen-snacks', id, 7, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Makhana & More', 'makhana-more', id, 8, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Papad & Fryums', 'papad-fryums-munchies', id, 9, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Imported Snacks', 'imported-snacks', id, 10, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Granola', 'granola-munchies', id, 11, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Munchies Gift Packs', 'munchies-gift-packs', id, 12, true FROM categories WHERE slug = 'munchies'
ON CONFLICT (slug) DO NOTHING;

-- 4) Cold Drinks & Juices
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Beverages Gift Packs', 'beverages-gift-packs', id, 1, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Soft Drinks', 'soft-drinks', id, 2, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Fruit Juice', 'fruit-juice', id, 3, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Mango Drinks', 'mango-drinks', id, 4, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Pure Juices', 'pure-juices', id, 5, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Concentrates & Syrups', 'concentrates-syrups', id, 6, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Herbal Drinks', 'herbal-drinks-cold', id, 7, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Energy Drinks', 'energy-drinks-cold', id, 8, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Coconut Water', 'coconut-water', id, 9, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Lassi Shakes & More', 'lassi-shakes-cold', id, 10, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Water & Ice Cubes', 'water-ice-cubes', id, 11, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cold Coffee & Ice Tea', 'cold-coffee-ice-tea', id, 12, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Soda & Mixers', 'soda-mixers', id, 13, true FROM categories WHERE slug = 'cold-drinks-juices'
ON CONFLICT (slug) DO NOTHING;

-- 5) Tea, Coffee & Health Drinks
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Tea', 'tea', id, 1, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Coffee', 'coffee', id, 2, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Milk Drinks', 'milk-drinks-tea', id, 3, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Green & Flavoured Tea', 'green-flavoured-tea', id, 4, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Herbal Drinks', 'herbal-drinks-tea', id, 5, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Hot Chocolate', 'hot-chocolate', id, 6, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Energy Drinks', 'energy-drinks-tea', id, 7, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Lassi Shakes & More', 'lassi-shakes-tea', id, 8, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cold Coffee & Ice Tea', 'cold-coffee-tea-section', id, 9, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Tea & Coffee Add-Ons', 'tea-coffee-addons', id, 10, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Lactose Free Drink', 'lactose-free-drink', id, 11, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Imported Tea & Coffee', 'imported-tea-coffee', id, 12, true FROM categories WHERE slug = 'tea-coffee-health-drinks'
ON CONFLICT (slug) DO NOTHING;

-- Continues in part 3...
