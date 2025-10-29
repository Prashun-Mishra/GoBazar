# 🎯 Admin & Product Management - Quick Setup

## ✅ What's Been Created

### 1. **Bulk Import System** 📊
- ✅ CSV import script for 1000s of products
- ✅ Template file with sample data
- ✅ Auto-creates categories and subcategories
- ✅ Handles images, tags, variants

### 2. **Admin API Endpoints** 🔌
- ✅ Product CRUD operations
- ✅ Bulk update functionality
- ✅ Stock management
- ✅ Low stock alerts
- ✅ Admin-only access control

### 3. **Documentation** 📚
- ✅ Complete product management guide
- ✅ API usage examples
- ✅ CSV format reference
- ✅ Troubleshooting guide

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
cd gobazar-backend
npm install csv-parser
npm install --save-dev @types/node
```

### Step 2: Create Admin User

```bash
# Option A: Update existing user
psql -U postgres -d gobazar_db -f scripts/setup-admin.sql

# Option B: Manual update
psql -U postgres -d gobazar_db
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

### Step 3: Import Products

```bash
# Use template (5 sample products)
npx ts-node scripts/import-products.ts

# Use your own CSV
npx ts-node scripts/import-products.ts path/to/products.csv
```

---

## 📦 Adding 1000s of Products

### Method 1: CSV Bulk Import (Recommended)

**Prepare CSV:**
```csv
name,description,brand,category,subcategory,price,mrp,discount,stock,unit,images,tags,isFeatured,isOrganic
Product 1,Description,Brand,Category,Subcategory,100,120,16.67,50,1kg,https://img.url,"tag1,tag2",true,false
Product 2,Description,Brand,Category,Subcategory,200,250,20,30,500g,https://img.url,"tag1,tag2",false,true
```

**Import:**
```bash
npx ts-node scripts/import-products.ts products.csv
```

**Features:**
- ✅ Auto-creates categories
- ✅ Handles 1000s of products
- ✅ Shows progress and errors
- ✅ Validates data

### Method 2: Admin Dashboard (Coming Next)

Will create a web UI for:
- Adding products one by one
- Editing existing products
- Managing categories
- Uploading images
- Viewing analytics

### Method 3: Direct API

```bash
curl -X POST http://localhost:5000/api/admin/products \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "price": 100,
    "categoryId": "category-id",
    ...
  }'
```

---

## 🔐 Admin Access

### How Admin Login Works

1. **User registers** via OTP (normal flow)
2. **Admin updates** user role to 'ADMIN' in database
3. **User logs in** with OTP (same flow)
4. **Backend checks** role and grants admin access
5. **Admin can access** `/api/admin/*` endpoints

### Making Someone Admin

```sql
-- Connect to database
psql -U postgres -d gobazar_db

-- Update user role
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@gobazar.com';

-- Verify
SELECT email, role FROM users WHERE role = 'ADMIN';
```

### Admin Endpoints (Require ADMIN role)

```
POST   /api/admin/products              - Create product
GET    /api/admin/products              - List all products
PUT    /api/admin/products/:id          - Update product
DELETE /api/admin/products/:id          - Delete product
PATCH  /api/admin/products/:id/stock    - Update stock
POST   /api/admin/products/bulk-update  - Bulk update
GET    /api/admin/products/low-stock    - Low stock alert
```

---

## 📊 CSV Template Format

### Required Fields:
- `name` - Product name
- `price` - Selling price
- `mrp` - Maximum Retail Price
- `stock` - Quantity available
- `category` - Category name

### Optional Fields:
- `description` - Product description
- `brand` - Brand name
- `subcategory` - Subcategory name
- `discount` - Discount percentage
- `unit` - Unit (1kg, 500g, 1L, etc.)
- `images` - Comma-separated URLs
- `tags` - Comma-separated tags
- `isFeatured` - true/false
- `isOrganic` - true/false

### Example:

```csv
name,description,brand,category,subcategory,price,mrp,discount,stock,unit,images,tags,isFeatured,isOrganic
Amul Milk,Fresh milk,Amul,Dairy,Milk,56,60,6.67,100,1L,https://cdn.com/milk.jpg,"milk,dairy",true,false
```

---

## 🎨 Next: Frontend Admin Dashboard

### What We'll Build:

1. **Admin Login Page** (`/admin/login`)
   - Email OTP authentication
   - Admin role verification
   - Redirect to dashboard

2. **Admin Dashboard** (`/admin`)
   - Product statistics
   - Recent orders
   - Low stock alerts
   - Quick actions

3. **Product Management** (`/admin/products`)
   - List all products
   - Add new product
   - Edit product
   - Delete product
   - Bulk operations

4. **Category Management** (`/admin/categories`)
   - Manage categories
   - Manage subcategories
   - Reorder categories

5. **Order Management** (`/admin/orders`)
   - View all orders
   - Update order status
   - Print invoices

6. **User Management** (`/admin/users`)
   - View all users
   - Make user admin
   - Block/unblock users

### Tech Stack:
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Hook Form
- Zod validation

---

## 📝 Files Created

### Backend:
```
gobazar-backend/
├── scripts/
│   ├── import-products.ts          ✅ CSV import script
│   └── setup-admin.sql             ✅ Admin setup SQL
├── templates/
│   └── products_import_template.csv ✅ CSV template
├── src/
│   ├── controllers/
│   │   └── adminProductController.ts ✅ Admin product controller
│   └── routes/
│       ├── admin.ts                 ✅ Admin routes
│       └── index.ts                 ✅ Updated with admin routes
```

### Documentation:
```
Go Bazar/
├── PRODUCT_MANAGEMENT_GUIDE.md      ✅ Complete guide
└── ADMIN_SETUP_SUMMARY.md           ✅ This file
```

---

## 🧪 Testing

### 1. Test CSV Import

```bash
cd gobazar-backend
npx ts-node scripts/import-products.ts
```

Expected output:
```
📊 Found 5 products to import
✅ Imported: Amul Milk
✅ Imported: Britannia Bread
...
📈 Import Summary:
   ✅ Imported: 5
   ❌ Failed: 0
   📊 Total: 5
```

### 2. Test Admin API

```bash
# Get admin token first (login as admin user)
TOKEN="your-admin-jwt-token"

# List products
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/products

# Create product
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":100,"categoryId":"xxx"}' \
  http://localhost:5000/api/admin/products
```

### 3. Verify in Database

```sql
-- Check products
SELECT COUNT(*) FROM products;

-- Check categories
SELECT * FROM categories;

-- Check admin users
SELECT email, role FROM users WHERE role = 'ADMIN';
```

---

## 🚨 Important Notes

### 1. Admin Security
- ✅ Admin endpoints require authentication
- ✅ Admin endpoints check for ADMIN role
- ✅ Regular users cannot access admin APIs
- ⚠️ Keep admin credentials secure

### 2. CSV Import
- ✅ Categories are auto-created
- ✅ Subcategories are auto-created
- ✅ Duplicate products are skipped
- ⚠️ Large files may take time

### 3. Image URLs
- ✅ Use CDN URLs for better performance
- ✅ Support multiple images per product
- ⚠️ Ensure URLs are publicly accessible

---

## 📈 Workflow

### For Initial Setup (1000s of products):

1. **Prepare CSV** with all products
2. **Run import**: `npx ts-node scripts/import-products.ts products.csv`
3. **Verify** products in database
4. **Test** on frontend

### For Daily Operations:

1. **Login as admin** (via OTP)
2. **Use admin dashboard** (coming soon)
3. **Add/Edit products** individually
4. **Monitor** low stock alerts

### For Bulk Updates:

1. **Export current products** to CSV
2. **Make changes** in CSV
3. **Re-import** with updated data
4. **Or use bulk update API**

---

## ✅ Checklist

- [ ] Install dependencies (`csv-parser`, `@types/node`)
- [ ] Create admin user in database
- [ ] Test CSV import with template
- [ ] Verify products in database
- [ ] Test admin API endpoints
- [ ] Prepare your product CSV
- [ ] Import all products
- [ ] Build admin dashboard (next step)

---

## 🎯 What's Next?

### Immediate (This Week):
1. ✅ CSV import system - DONE
2. ✅ Admin API endpoints - DONE
3. 🚧 Frontend admin dashboard - IN PROGRESS
4. 🚧 Connect frontend to backend products

### Short Term (Next Week):
5. Image upload system
6. Product variants management
7. Inventory alerts
8. Analytics dashboard

### Long Term:
9. Advanced search & filters
10. Product recommendations
11. Review management
12. Export functionality

---

**Status:** ✅ Backend Complete | 🚧 Frontend Admin Dashboard Next
**Documentation:** `PRODUCT_MANAGEMENT_GUIDE.md`
**Last Updated:** 2025-10-05
