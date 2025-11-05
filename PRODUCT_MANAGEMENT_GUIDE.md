# 📦 Product Management System - Complete Guide

## 🎯 Overview

This guide covers **3 ways** to manage products in GoBazar:

1. **Bulk Import (CSV)** - For importing 1000s of products
2. **Admin Dashboard** - Web UI for product management
3. **Direct API** - For programmatic access

---

## 📊 Part 1: Bulk Product Import (CSV)

### Step 1: Install Required Package

```bash
cd gobazar-backend
npm install csv-parser
npm install --save-dev @types/node
```

### Step 2: Prepare Your CSV File

Use the template at `gobazar-backend/templates/products_import_template.csv`

**CSV Format:**
```csv
name,description,brand,category,subcategory,price,mrp,discount,stock,unit,images,tags,isFeatured,isOrganic
Amul Milk,Fresh full cream milk,Amul,Dairy,Milk,56,60,6.67,100,1L,https://example.com/amul-milk.jpg,"milk,dairy,fresh",true,false
```

**Column Descriptions:**
- `name` - Product name (required)
- `description` - Product description
- `brand` - Brand name
- `category` - Category name (will be created if doesn't exist)
- `subcategory` - Subcategory name (optional)
- `price` - Selling price
- `mrp` - Maximum Retail Price
- `discount` - Discount percentage
- `stock` - Available quantity
- `unit` - Unit of measurement (1L, 500g, etc.)
- `images` - Comma-separated image URLs
- `tags` - Comma-separated tags
- `isFeatured` - true/false
- `isOrganic` - true/false

### Step 3: Run the Import

```bash
# Import from template
npx ts-node scripts/import-products.ts

# Import from custom file
npx ts-node scripts/import-products.ts path/to/your/products.csv
```

### Step 4: Verify Import

The script will show:
```
📊 Found 1000 products to import
✅ Imported: Amul Milk
✅ Imported: Britannia Bread
...
📈 Import Summary:
   ✅ Imported: 995
   ❌ Failed: 5
   📊 Total: 1000
```

---

## 🔐 Part 2: Admin Dashboard Setup

### Backend Setup (Already Done ✅)

Admin endpoints are ready at `/api/admin/*`:

**Admin Product Endpoints:**
- `POST /api/admin/products` - Create product
- `GET /api/admin/products` - List all products (with pagination)
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `PATCH /api/admin/products/:id/stock` - Update stock
- `POST /api/admin/products/bulk-update` - Bulk update
- `GET /api/admin/products/low-stock` - Get low stock products

**Authentication Required:**
- User must be logged in
- User role must be `ADMIN`

### Create Admin User

```bash
# Connect to PostgreSQL
psql -U postgres -d gobazar_db

# Update existing user to admin
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@gobazar.com';

# Or create new admin user (after OTP verification)
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

### Frontend Admin Dashboard (Next Steps)

I'll create the admin dashboard UI in the next steps. It will include:

1. **Admin Login** - Separate admin login page
2. **Dashboard** - Overview with stats
3. **Product Management** - CRUD operations
4. **Category Management** - Manage categories
5. **Order Management** - View and update orders
6. **User Management** - Manage users

---

## 🔌 Part 3: API Usage

### Create Product via API

```typescript
// POST /api/admin/products
const response = await fetch('http://localhost:5000/api/admin/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminToken}`
  },
  body: JSON.stringify({
    name: 'Amul Milk',
    description: 'Fresh full cream milk',
    brand: 'Amul',
    categoryId: 'category-id-here',
    subcategoryId: 'subcategory-id-here', // optional
    price: 56,
    mrp: 60,
    discount: 6.67,
    stock: 100,
    unit: '1L',
    images: ['https://example.com/milk.jpg'],
    tags: ['milk', 'dairy', 'fresh'],
    isFeatured: true,
    isOrganic: false,
    variants: [ // optional
      {
        name: 'Size',
        value: '500ml',
        price: 30,
        stock: 50
      }
    ]
  })
});
```

### Update Product

```typescript
// PUT /api/admin/products/:id
const response = await fetch(`http://localhost:5000/api/admin/products/${productId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminToken}`
  },
  body: JSON.stringify({
    price: 58,
    stock: 150
  })
});
```

### Get All Products (Admin View)

```typescript
// GET /api/admin/products?page=1&limit=20&search=milk&categoryId=xxx
const response = await fetch(
  'http://localhost:5000/api/admin/products?page=1&limit=20',
  {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  }
);
```

---

## 📝 Part 4: Product Schema Reference

### Product Model

```typescript
{
  id: string;
  name: string;
  description: string;
  brand: string;
  categoryId: string;
  subcategoryId?: string;
  price: number;
  mrp: number;
  discount: number;
  stock: number;
  unit: string;
  images: string[];
  tags: string[];
  isFeatured: boolean;
  isOrganic: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Product Variant Model

```typescript
{
  id: string;
  productId: string;
  name: string;        // e.g., "Size", "Weight", "Color"
  value: string;       // e.g., "500ml", "1kg", "Red"
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🚀 Quick Start Workflow

### For 1000s of Products:

1. **Prepare CSV file** with all products
2. **Run import script**: `npx ts-node scripts/import-products.ts products.csv`
3. **Verify in database** or via API

### For Individual Products:

1. **Login as admin** (role = 'ADMIN')
2. **Use admin dashboard** (coming soon) or API
3. **Create/Update products** one by one

### For Regular Updates:

1. **Use admin dashboard** for quick edits
2. **Use bulk update API** for multiple products
3. **Use CSV import** for large-scale changes

---

## 🔒 Security Notes

### Admin Access Control

```typescript
// Middleware checks:
1. User is authenticated (valid JWT token)
2. User role is 'ADMIN'
3. Request is authorized

// If not admin:
{
  "success": false,
  "error": "Forbidden: Admin access required"
}
```

### Making a User Admin

```sql
-- Method 1: Direct database update
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@gobazar.com';

-- Method 2: Via API (requires existing admin)
PUT /api/admin/users/:id
{
  "role": "ADMIN"
}
```

---

## 📊 Sample Data

### Sample Products CSV

```csv
name,description,brand,category,subcategory,price,mrp,discount,stock,unit,images,tags,isFeatured,isOrganic
Amul Milk,Fresh full cream milk,Amul,Dairy,Milk,56,60,6.67,100,1L,https://cdn.gobazar.com/milk.jpg,"milk,dairy",true,false
Britannia Bread,Whole wheat bread,Britannia,Bakery,Bread,40,45,11.11,50,400g,https://cdn.gobazar.com/bread.jpg,"bread,bakery",false,false
Tata Salt,Iodized salt,Tata,Grocery,Spices,20,22,9.09,200,1kg,https://cdn.gobazar.com/salt.jpg,"salt,grocery",false,false
Fortune Oil,Sunflower oil,Fortune,Grocery,Cooking Oil,180,200,10,75,1L,https://cdn.gobazar.com/oil.jpg,"oil,cooking",true,false
Organic Tomato,Fresh tomatoes,Local,Vegetables,Fresh,40,50,20,150,1kg,https://cdn.gobazar.com/tomato.jpg,"vegetables,organic",false,true
```

---

## 🐛 Troubleshooting

### Import Fails

**Issue:** CSV import shows errors

**Solutions:**
1. Check CSV format matches template
2. Ensure all required fields are present
3. Verify image URLs are valid
4. Check for special characters in names

### Admin Access Denied

**Issue:** 403 Forbidden error

**Solutions:**
1. Verify user role is 'ADMIN' in database
2. Check JWT token is valid
3. Ensure Authorization header is set

### Products Not Showing

**Issue:** Products imported but not visible

**Solutions:**
1. Check stock > 0
2. Verify category exists
3. Check frontend API integration
4. Clear cache and rebuild

---

## 📈 Next Steps

### 1. Frontend Integration (Priority)

Update frontend to use backend products:

```typescript
// app/api/products/route.ts
export async function GET(request: Request) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const data = await response.json();
  return Response.json(data);
}
```

### 2. Admin Dashboard UI

Create admin panel at `/admin`:
- Login page
- Product management
- Order management
- Analytics dashboard

### 3. Image Upload

Add image upload functionality:
- Use Cloudinary/AWS S3
- Direct upload from admin panel
- Bulk image import

### 4. Advanced Features

- Product reviews
- Inventory alerts
- Price history
- Bulk operations
- Export to CSV

---

## 📚 Resources

- **Backend API Docs:** `gobazar-backend/docs/`
- **CSV Template:** `gobazar-backend/templates/products_import_template.csv`
- **Import Script:** `gobazar-backend/scripts/import-products.ts`
- **Admin Routes:** `gobazar-backend/src/routes/admin.ts`

---

**Status:** ✅ Backend Ready | 🚧 Frontend Admin Dashboard (Next)
**Last Updated:** 2025-10-05
