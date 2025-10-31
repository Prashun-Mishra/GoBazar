# Database Migration & Setup Guide

Complete guide for setting up and migrating your PostgreSQL database for production deployment.

---

## Overview

Your GoBazar backend uses **Prisma ORM** with **PostgreSQL** database. This guide covers:
- Setting up PostgreSQL database
- Running migrations
- Seeding initial data
- Troubleshooting database issues

---

## Step 1: Choose Your Database Provider

### Option 1: Vercel Postgres (Recommended for Vercel)

**Pros:**
- Integrated with Vercel
- Automatic backups
- Easy scaling
- No additional setup

**Steps:**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database" → "Postgres"
3. Select region: **India (Mumbai)**
4. Click "Create"
5. Copy connection string

### Option 2: Supabase (PostgreSQL)

**Pros:**
- Free tier available
- Good for learning
- Easy to manage
- Good documentation

**Steps:**
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in details:
   - Project name: `gobazar`
   - Database password: (generate strong password)
   - Region: **Singapore** (closest to India)
4. Click "Create new project"
5. Wait for initialization (2-3 minutes)
6. Go to Settings → Database → Connection string
7. Copy the URI

### Option 3: Local PostgreSQL (Development Only)

**For testing locally before deployment:**

```bash
# Install PostgreSQL
# Windows: https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Start PostgreSQL service
# Windows: Services → PostgreSQL
# Mac: brew services start postgresql
# Linux: sudo service postgresql start

# Create database
createdb gobazar_db

# Connection string
postgresql://postgres:password@localhost:5432/gobazar_db
```

---

## Step 2: Get Your Database Connection String

### Vercel Postgres
```
postgresql://user:password@host:5432/gobazar_db
```

### Supabase
```
postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
```

### Local PostgreSQL
```
postgresql://postgres:password@localhost:5432/gobazar_db
```

---

## Step 3: Configure Environment Variables

### Local Development

1. **Create `.env` file** in `gobazar-backend/`:
   ```bash
   cd gobazar-backend
   ```

2. **Add database URL:**
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/gobazar_db"
   ```

3. **Other required variables:**
   ```env
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your-secret-key-min-32-chars
   CLOUDINARY_CLOUD_NAME=your-name
   CLOUDINARY_API_KEY=your-key
   CLOUDINARY_API_SECRET=your-secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   FRONTEND_URL=http://localhost:3001
   ```

### Production (Vercel)

1. Go to Vercel Dashboard → Backend Project → Settings → Environment Variables
2. Add `DATABASE_URL` with your production database connection string
3. Add all other required variables

---

## Step 4: Run Database Migrations

### Option A: Using Prisma CLI (Recommended)

**Generate Prisma Client:**
```bash
cd gobazar-backend
npm install
npx prisma generate
```

**Run migrations:**
```bash
# Push schema to database (creates tables)
npx prisma db push

# Or use migrate (creates migration files)
npx prisma migrate deploy
```

**Seed initial data:**
```bash
npm run seed
```

### Option B: Using npm scripts

```bash
cd gobazar-backend

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Run migrations
npm run prisma:migrate

# Seed database
npm run seed
```

### Option C: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Pull environment variables
vercel env pull

# Run migrations
npx prisma migrate deploy

# Seed database
npm run seed
```

---

## Step 5: Verify Database Setup

### Check Tables Created

```bash
# Connect to database
psql postgresql://user:password@host:5432/gobazar_db

# List tables
\dt

# Should show:
# users
# addresses
# categories
# products
# cart_items
# orders
# order_items
# payments
# otps
# user_locations
```

### Check Prisma Studio

```bash
cd gobazar-backend
npx prisma studio
```

This opens a visual database browser at `http://localhost:5555`

### Test API Connection

```bash
# Start backend
npm run dev

# In another terminal, test API
curl http://localhost:5000/api/health
```

---

## Step 6: Seed Initial Data (Optional)

### What Gets Seeded

The seed script adds:
- Sample categories
- Sample products
- Sample subcategories

### Run Seed Script

```bash
cd gobazar-backend
npm run seed
```

### Manual Seeding

If seed script fails, manually add data:

```bash
# Connect to database
psql postgresql://user:password@host:5432/gobazar_db

# Add sample category
INSERT INTO categories (id, name, description, image_url, created_at, updated_at)
VALUES ('cat1', 'Groceries', 'Fresh groceries', 'https://...', NOW(), NOW());

# Add sample product
INSERT INTO products (id, name, description, price, category_id, image_url, created_at, updated_at)
VALUES ('prod1', 'Tomato', 'Fresh tomato', 50, 'cat1', 'https://...', NOW(), NOW());
```

---

## Database Schema Overview

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'USER',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Products Table
```sql
CREATE TABLE products (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## Troubleshooting

### Issue: "Cannot find module '@prisma/client'"

**Solution:**
```bash
npm install
npm run prisma:generate
```

### Issue: "Database connection failed"

**Solution:**
1. Verify DATABASE_URL is correct
2. Check database is running
3. Test connection locally:
   ```bash
   psql postgresql://user:password@host:5432/gobazar_db
   ```

### Issue: "Migration failed"

**Solution:**
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or manually fix schema and try again
npx prisma db push --force-reset
```

### Issue: "Table already exists"

**Solution:**
```bash
# Skip existing tables
npx prisma db push --skip-generate
```

### Issue: "Foreign key constraint failed"

**Solution:**
1. Check parent records exist
2. Verify foreign key relationships in schema
3. Run migrations in correct order

---

## Backup & Recovery

### Backup Database

**Vercel Postgres:**
1. Go to Vercel Dashboard → Storage → Your Database
2. Click "Backups"
3. Click "Create Backup"

**Supabase:**
1. Go to Supabase Dashboard → Backups
2. Automatic daily backups are created

**Manual Backup:**
```bash
# Dump database to file
pg_dump postgresql://user:password@host:5432/gobazar_db > backup.sql

# Restore from file
psql postgresql://user:password@host:5432/gobazar_db < backup.sql
```

### Recovery

```bash
# Restore from backup
psql postgresql://user:password@host:5432/gobazar_db < backup.sql

# Re-run migrations
npx prisma migrate deploy
```

---

## Performance Optimization

### Add Indexes

```bash
# Connect to database
psql postgresql://user:password@host:5432/gobazar_db

# Add indexes for common queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
```

### Monitor Database

**Vercel Postgres:**
1. Go to Vercel Dashboard → Storage
2. View metrics and performance

**Supabase:**
1. Go to Supabase Dashboard → Database
2. View metrics and logs

---

## Migration Checklist

- [ ] Database provider selected (Vercel Postgres or Supabase)
- [ ] Connection string obtained
- [ ] DATABASE_URL added to environment variables
- [ ] Prisma client generated (`npm run prisma:generate`)
- [ ] Schema pushed to database (`npm run prisma:push`)
- [ ] Tables verified in database
- [ ] Initial data seeded (optional)
- [ ] API health check passing
- [ ] Prisma Studio accessible
- [ ] Backups configured

---

## Next Steps

1. **Test database locally** before deploying
2. **Run migrations** on production database
3. **Seed initial data** if needed
4. **Monitor database** performance
5. **Set up backups** for disaster recovery

---

## Useful Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Create migration
npm run prisma:migrate

# Open Prisma Studio
npx prisma studio

# Seed database
npm run seed

# Reset database (WARNING: deletes data)
npx prisma migrate reset

# View database URL
echo $DATABASE_URL
```

---

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase Documentation](https://supabase.com/docs)

---

**Last Updated**: 2024
**Status**: Ready for Production
