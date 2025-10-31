# Supabase Setup Guide for Go Bazar

This guide will help you set up Supabase as your database for the Go Bazar application deployed on Vercel.

## Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com) and sign up for a free account
2. Verify your email address

## Step 2: Create a New Project

1. Click "New Project" in the Supabase dashboard
2. Enter a name for your project (e.g., "gobazar")
3. Set a secure database password (save this for later use)
4. Choose the free tier
5. Select a region closest to your target audience
6. Click "Create new project"

## Step 3: Set Up Database Tables

After your project is created, you'll need to set up the database schema. You can use the SQL editor in Supabase to create your tables:

1. Go to the "SQL Editor" section in your Supabase dashboard
2. Create a new query and paste the following SQL (adjust according to your schema):

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subcategories table
CREATE TABLE subcategories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2),
  image_url TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  subcategory_id INTEGER REFERENCES subcategories(id) ON DELETE SET NULL,
  stock INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  address TEXT NOT NULL,
  payment_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Run the query to create your tables

## Step 4: Get Your Connection Details

1. Go to "Project Settings" > "API" in your Supabase dashboard
2. Under "Project URL", copy your Supabase URL
3. Under "Project API Keys", copy your "anon" public key and "service_role" secret key

## Step 5: Update Your Environment Variables

Update your `.env.production` file with the Supabase connection details:

```
DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"
```

## Step 6: Install Supabase Client

In your project directory, install the Supabase client:

```bash
cd blinkit-clone
npm install @supabase/supabase-js
```

## Step 7: Create Supabase Client Utility

Create a utility file to initialize the Supabase client:

1. Create a new file at `blinkit-clone/lib/supabase.ts`
2. Add the following code:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Client for browser usage (public data only)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (protected routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to get authenticated client on the server
export const getServerSupabase = (accessToken: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
};
```

## Step 8: Update API Endpoints

Update your API endpoints to use Supabase instead of Prisma. For example, update `blinkit-clone/api/products.js`:

```javascript
// Example serverless function for products API using Supabase
import { supabaseAdmin } from '../lib/supabase';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Handle GET request to fetch products
    if (req.method === 'GET') {
      const { categoryId, subcategoryId, limit = 20, page = 1 } = req.query;
      
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const take = parseInt(limit);
      
      let query = supabaseAdmin
        .from('products')
        .select('*, categories(*), subcategories(*)')
        .range(skip, skip + take - 1);
      
      if (categoryId) {
        query = query.eq('category_id', parseInt(categoryId));
      }
      
      if (subcategoryId) {
        query = query.eq('subcategory_id', parseInt(subcategoryId));
      }
      
      const { data: products, error } = await query;
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: 'Database query error' });
      }
      
      // Get total count for pagination
      let countQuery = supabaseAdmin.from('products').select('id', { count: 'exact' });
      
      if (categoryId) {
        countQuery = countQuery.eq('category_id', parseInt(categoryId));
      }
      
      if (subcategoryId) {
        countQuery = countQuery.eq('subcategory_id', parseInt(subcategoryId));
      }
      
      const { count, error: countError } = await countQuery;
      
      if (countError) {
        console.error('Supabase count error:', countError);
        return res.status(500).json({ error: 'Database count error' });
      }
      
      return res.status(200).json({
        products,
        pagination: {
          total: count,
          pages: Math.ceil(count / take),
          page: parseInt(page),
          limit: take,
        },
      });
    }
    
    // Return 405 for unsupported methods
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Products API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

## Step 9: Deploy to Vercel

Follow the deployment steps in the Vercel Deployment Guide to deploy your application with Supabase integration.

## Free Tier Limitations

Supabase Free Tier includes:
- 500MB database storage
- 2GB bandwidth per month
- 50MB file storage
- 50,000 monthly active users
- 500,000 edge function invocations per month
- No credit card required

## Next Steps

1. Set up authentication with Supabase Auth
2. Implement storage for product images using Supabase Storage
3. Consider using Supabase Edge Functions for additional backend functionality
4. Set up Row Level Security (RLS) for enhanced database security