-- Create test user for development/testing
-- This user will be used when authentication is disabled

-- First, check if user exists and delete if needed
DELETE FROM users WHERE id = 'test-user-123';
DELETE FROM users WHERE id = 'admin-user-123';

-- Insert test regular user
INSERT INTO users (
  id,
  email,
  name,
  phone,
  role,
  "isActive",
  "emailVerified",
  "createdAt",
  "updatedAt"
) VALUES (
  'test-user-123',
  'test@gobazar.com',
  'Test User',
  '9999999999',
  'USER',
  true,
  true,
  NOW(),
  NOW()
);

-- Insert test admin user
INSERT INTO users (
  id,
  email,
  name,
  phone,
  role,
  "isActive",
  "emailVerified",
  "createdAt",
  "updatedAt"
) VALUES (
  'admin-user-123',
  'admin@gobazar.com',
  'Admin User',
  '8888888888',
  'ADMIN',
  true,
  true,
  NOW(),
  NOW()
);

SELECT 'Test users created successfully!' as message;
