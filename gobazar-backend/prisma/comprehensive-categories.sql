-- Comprehensive Categories and Subcategories for GoBazar
-- Run this after clearing existing categories

-- Clear existing data
DELETE FROM "subcategories";
DELETE FROM "categories";

-- Insert Categories
INSERT INTO "categories" (id, name, slug, image, "order", "isActive", "createdAt", "updatedAt") VALUES
('cat-vegetables-fruits', 'Vegetables & Fruits', 'vegetables-fruits', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 1, true, NOW(), NOW()),
('cat-dairy-breakfast', 'Dairy & Breakfast', 'dairy-breakfast', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', 2, true, NOW(), NOW()),
('cat-munchies', 'Munchies', 'munchies', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', 3, true, NOW(), NOW()),
('cat-cold-drinks-juices', 'Cold Drinks & Juices', 'cold-drinks-juices', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', 4, true, NOW(), NOW()),
('cat-tea-coffee-health', 'Tea, Coffee & Health Drinks', 'tea-coffee-health-drinks', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', 5, true, NOW(), NOW()),
('cat-bakery-biscuits', 'Bakery & Biscuits', 'bakery-biscuits', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', 6, true, NOW(), NOW()),
('cat-sweet-tooth', 'Sweet Tooth', 'sweet-tooth', 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400', 7, true, NOW(), NOW()),
('cat-paan-corner', 'Paan Corner', 'paan-corner', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 8, true, NOW(), NOW()),
('cat-breakfast-instant', 'Breakfast & Instant Food', 'breakfast-instant-food', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400', 9, true, NOW(), NOW()),
('cat-atta-rice-dal', 'Atta, Rice & Dal', 'atta-rice-dal', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', 10, true, NOW(), NOW()),
('cat-masala-oil-more', 'Masala, Oil & More', 'masala-oil-more', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', 11, true, NOW(), NOW()),
('cat-sauces-spreads', 'Sauces & Spreads', 'sauces-spreads', 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400', 12, true, NOW(), NOW()),
('cat-chicken-meat-fish', 'Chicken, Meat & Fish', 'chicken-meat-fish', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400', 13, true, NOW(), NOW()),
('cat-organic-healthy', 'Organic & Healthy Living', 'organic-healthy-living', 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400', 14, true, NOW(), NOW()),
('cat-baby-care', 'Baby Care', 'baby-care', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', 15, true, NOW(), NOW()),
('cat-pharma-wellness', 'Pharma & Wellness', 'pharma-wellness', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', 16, true, NOW(), NOW()),
('cat-cleaning-essentials', 'Cleaning Essentials', 'cleaning-essentials', 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400', 17, true, NOW(), NOW()),
('cat-home-office', 'Home & Office', 'home-office', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', 18, true, NOW(), NOW()),
('cat-personal-care', 'Personal Care', 'personal-care', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', 19, true, NOW(), NOW()),
('cat-pet-care', 'Pet Care', 'pet-care', 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400', 20, true, NOW(), NOW());
