-- Fix admin email configuration
-- This script will:
-- 1. Set gobazar.2025@gmail.com as ADMIN
-- 2. Demote animelover200p@gmail.com to USER

-- Step 1: Update new email to ADMIN role
UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'gobazar.2025@gmail.com';

-- Step 2: Demote old admin to USER role
UPDATE users 
SET role = 'USER' 
WHERE email = 'animelover200p@gmail.com';

-- Verify the changes
SELECT id, name, email, role, "createdAt" 
FROM users 
WHERE email IN ('gobazar.2025@gmail.com', 'animelover200p@gmail.com')
ORDER BY role DESC;

-- Show all admin users
SELECT id, name, email, role 
FROM users 
WHERE role = 'ADMIN';
