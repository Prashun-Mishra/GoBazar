-- Part 4: Categories 14-20 (Final)

-- 14) Organic & Healthy Living
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Oil & Ghee', 'oil-ghee-organic', id, 1, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Flour', 'flour-organic', id, 2, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Noodles & Pasta', 'noodles-pasta-organic', id, 3, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Dry Fruits & Seeds', 'dry-fruits-seeds-organic', id, 4, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Pulses & Millets', 'pulses-millets', id, 5, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Premium Sauces & Spreads', 'premium-sauces-spreads', id, 6, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Spices & Vinegar', 'spices-vinegar-organic', id, 7, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Organic Salt, Sugar & Honey', 'organic-salt-sugar-honey', id, 8, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Chocolate & Candies', 'chocolate-candies-organic', id, 9, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Rice & Rice Products', 'rice-products-organic', id, 10, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cookies & Wafers', 'cookies-wafers-organic', id, 11, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Tea & Coffee', 'tea-coffee-organic', id, 12, true FROM categories WHERE slug = 'organic-healthy-living'
ON CONFLICT (slug) DO NOTHING;

-- 15) Baby Care
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Diapers & More', 'diapers-more', id, 1, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Bathing Needs', 'bathing-needs-baby', id, 2, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Baby Wipes', 'baby-wipes', id, 3, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Baby Food', 'baby-food', id, 4, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Skin & Hair Care', 'skin-hair-care-baby', id, 5, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Feeding Essentials', 'feeding-essentials', id, 6, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Oral & Nasal Care', 'oral-nasal-care-baby', id, 7, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Nursing', 'nursing', id, 8, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Baby Gifting & Toys', 'baby-gifting-toys', id, 9, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Hygiene', 'hygiene-baby', id, 10, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Mom Care Needs', 'mom-care-needs', id, 11, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Health & Safety', 'health-safety-baby', id, 12, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Baby Accessories', 'baby-accessories', id, 13, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Baby Gear', 'baby-gear', id, 14, true FROM categories WHERE slug = 'baby-care'
ON CONFLICT (slug) DO NOTHING;

-- 16) Pharma & Wellness
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Sexual Wellness', 'sexual-wellness', id, 1, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Adult Diapers', 'adult-diapers', id, 2, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Health & Wellness Supplements', 'health-wellness-supplements', id, 3, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Protein & Workout Supplements', 'protein-workout-supplements', id, 4, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Masks & Sanitizers', 'masks-sanitizers', id, 5, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Milk Drinks', 'milk-drinks-pharma', id, 6, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Smoking Cessation', 'smoking-cessation-pharma', id, 7, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Herbal Drinks', 'herbal-drinks-pharma', id, 8, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Chyawanprash', 'chyawanprash', id, 9, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Health & Ortho Supports', 'health-ortho-supports', id, 10, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Pure OTC', 'pure-otc', id, 11, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Hangover Cure', 'hangover-cure', id, 12, true FROM categories WHERE slug = 'pharma-wellness'
ON CONFLICT (slug) DO NOTHING;

-- 17) Cleaning Essentials
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Fabric Conditioners & Additives', 'fabric-conditioners-additives', id, 1, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Floor & Surface Cleaners', 'floor-surface-cleaners', id, 2, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Toilet & Bathroom Cleaners', 'toilet-bathroom-cleaners', id, 3, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Fresheners', 'fresheners', id, 4, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Detergent Powder & Bars', 'detergent-powder-bars', id, 5, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Dishwashing Gels & Tablets', 'dishwashing-gels-tablets', id, 6, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cleaning Tools', 'cleaning-tools', id, 7, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Dishwashing Bars & Tubs', 'dishwashing-bars-tubs', id, 8, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Disinfectants', 'disinfectants', id, 9, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Dishwashing Accessories', 'dishwashing-accessories', id, 10, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Shoe Care', 'shoe-care', id, 11, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Garbage Bags', 'garbage-bags', id, 12, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Liquid Detergents', 'liquid-detergents', id, 13, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Repellents', 'repellents', id, 14, true FROM categories WHERE slug = 'cleaning-essentials'
ON CONFLICT (slug) DO NOTHING;

-- 18) Home & Office
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Pooja Needs', 'pooja-needs', id, 1, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Party Essentials', 'party-essentials', id, 2, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Home Décor', 'home-decor', id, 3, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Festive & Occasion Needs', 'festive-occasion-needs', id, 4, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Tissues & Disposables', 'tissues-disposables', id, 5, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Bathroom Essentials', 'bathroom-essentials-home', id, 6, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Sports & Fitness', 'sports-fitness', id, 7, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Car & Bike Care', 'car-bike-care', id, 8, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Home Improvement', 'home-improvement', id, 9, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Flowers, Plants & Gardening', 'flowers-plants-gardening', id, 10, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Forex Cards', 'forex-cards', id, 11, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Home Furnishing', 'home-furnishing', id, 12, true FROM categories WHERE slug = 'home-office'
ON CONFLICT (slug) DO NOTHING;

-- 19) Personal Care
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Face & Body Moisturizer', 'face-body-moisturizer', id, 1, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Bath & Beauty Gifts', 'bath-beauty-gifts', id, 2, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Feminine Care', 'feminine-care', id, 3, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Oral Care', 'oral-care-personal', id, 4, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Handwash', 'handwash', id, 5, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Face Cleaning', 'face-cleaning', id, 6, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Men''s Grooming', 'mens-grooming', id, 7, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Sunscreen', 'sunscreen', id, 8, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Hair Care', 'hair-care-personal', id, 9, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Deodorant & Talc', 'deodorant-talc', id, 10, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Women''s Grooming', 'womens-grooming', id, 11, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Skin & Hair Care', 'skin-hair-care-personal', id, 12, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Face Wash', 'face-wash', id, 13, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Bathing Soaps', 'bathing-soaps', id, 14, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Face Moisturiser', 'face-moisturiser', id, 15, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Shower Gels & Body Wash', 'shower-gels-body-wash', id, 16, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Bathing', 'bathing-personal', id, 17, true FROM categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO NOTHING;

-- 20) Pet Care
INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Accessories & Other Supplies', 'accessories-other-supplies', id, 1, true FROM categories WHERE slug = 'pet-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Cat Needs', 'cat-needs', id, 2, true FROM categories WHERE slug = 'pet-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Diverse Pet Food', 'diverse-pet-food', id, 3, true FROM categories WHERE slug = 'pet-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Dog Needs', 'dog-needs', id, 4, true FROM categories WHERE slug = 'pet-care'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "subcategories" ("name", "slug", "categoryId", "order", "isActive")
SELECT 'Pet Grooming', 'pet-grooming', id, 5, true FROM categories WHERE slug = 'pet-care'
ON CONFLICT (slug) DO NOTHING;

-- DONE! All subcategories for all 20 categories have been added.
