-- Update user role to ADMIN for gobazar.2025@gmail.com

UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'gobazar.2025@gmail.com';

-- Verify the update
SELECT id, name, email, role, "createdAt" 
FROM users 
WHERE email = 'gobazar.2025@gmail.com';

-- To see all users with their roles:
SELECT id, name, email, role 
FROM users 
ORDER BY "createdAt" DESC;
