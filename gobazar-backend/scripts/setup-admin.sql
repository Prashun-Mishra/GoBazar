-- Setup Admin User for GoBazar
-- Run this SQL script to create/update admin user

-- Option 1: Update existing user to admin
UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'admin@gobazar.com';

-- Option 2: Create new admin user (if doesn't exist)
-- First, you need to register via OTP, then run:
-- UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';

-- Verify admin user
SELECT id, name, email, role, "createdAt" 
FROM users 
WHERE role = 'ADMIN';

-- Check total products
SELECT COUNT(*) as total_products FROM products;

-- Check products by category
SELECT c.name as category, COUNT(p.id) as product_count
FROM categories c
LEFT JOIN products p ON p."categoryId" = c.id
GROUP BY c.id, c.name
ORDER BY product_count DESC;

-- Check low stock products
SELECT name, stock, unit
FROM products
WHERE stock < 10
ORDER BY stock ASC
LIMIT 20;
