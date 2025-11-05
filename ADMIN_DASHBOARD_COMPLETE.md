# 🎨 Admin Dashboard - Complete Setup Guide

## ✅ What's Already Built

### Backend (100% Complete)
- ✅ Admin API endpoints (`/api/admin/*`)
- ✅ Product CRUD operations
- ✅ Bulk import system (CSV)
- ✅ Admin authentication & authorization
- ✅ Stock management
- ✅ Low stock alerts

### Frontend (Partially Complete)
- ✅ Admin layout with sidebar
- ✅ Admin products page
- ✅ Product form components
- ✅ Bulk operations UI
- 🚧 Needs backend integration

---

## 🔧 Integration Steps

### Step 1: Update Frontend API Routes

The frontend currently uses mock data. We need to connect it to the backend.

#### Update Products API Route

**File:** `blinkit-clone/app/api/products/route.ts`

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '20';
  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('categoryId') || '';
  
  const queryParams = new URLSearchParams({
    page,
    limit,
    ...(search && { search }),
    ...(categoryId && { categoryId }),
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${queryParams}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for fresh data
    }
  );

  const data = await response.json();
  return Response.json(data);
}
```

#### Update Categories API Route

**File:** `blinkit-clone/app/api/categories/route.ts`

```typescript
export async function GET() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();
  return Response.json(data);
}
```

### Step 2: Create Admin API Helper

**File:** `blinkit-clone/lib/admin-api.ts` (Create this file)

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class AdminAPI {
  private static getAuthHeaders() {
    const token = localStorage.getItem('auth-token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  // Products
  static async getProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.search) queryParams.set('search', params.search);
    if (params?.categoryId) queryParams.set('categoryId', params.categoryId);

    const response = await fetch(
      `${API_URL}/api/admin/products?${queryParams}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  }

  static async createProduct(productData: any) {
    const response = await fetch(`${API_URL}/api/admin/products`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return response.json();
  }

  static async updateProduct(id: string, productData: any) {
    const response = await fetch(`${API_URL}/api/admin/products/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return response.json();
  }

  static async deleteProduct(id: string) {
    const response = await fetch(`${API_URL}/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    return response.json();
  }

  static async updateStock(id: string, stock: number, variantId?: string) {
    const response = await fetch(`${API_URL}/api/admin/products/${id}/stock`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ stock, variantId }),
    });

    if (!response.ok) {
      throw new Error('Failed to update stock');
    }

    return response.json();
  }

  static async getLowStockProducts(threshold: number = 10) {
    const response = await fetch(
      `${API_URL}/api/admin/products/low-stock?threshold=${threshold}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch low stock products');
    }

    return response.json();
  }

  static async bulkUpdate(products: Array<{ id: string; data: any }>) {
    const response = await fetch(`${API_URL}/api/admin/products/bulk-update`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ products }),
    });

    if (!response.ok) {
      throw new Error('Failed to bulk update products');
    }

    return response.json();
  }

  // Categories
  static async getCategories() {
    const response = await fetch(`${API_URL}/api/categories`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return response.json();
  }
}
```

### Step 3: Update Admin Products Page

**File:** `blinkit-clone/app/admin/products/page.tsx`

Replace the `useEffect` hook:

```typescript
import { AdminAPI } from '@/lib/admin-api';

// Replace the existing useEffect
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [productsData, categoriesData] = await Promise.all([
        AdminAPI.getProducts({ page: 1, limit: 100 }),
        AdminAPI.getCategories(),
      ]);

      setProducts(productsData.data || productsData);
      setCategories(categoriesData.data || categoriesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Show error toast
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

// Add product handlers
const handleCreateProduct = async (productData: any) => {
  try {
    const result = await AdminAPI.createProduct(productData);
    setProducts([...products, result.data]);
    setShowProductForm(false);
    // Show success toast
  } catch (error) {
    console.error('Failed to create product:', error);
    // Show error toast
  }
};

const handleUpdateProduct = async (id: string, productData: any) => {
  try {
    const result = await AdminAPI.updateProduct(id, productData);
    setProducts(products.map(p => p.id === id ? result.data : p));
    setEditingProduct(null);
    setShowProductForm(false);
    // Show success toast
  } catch (error) {
    console.error('Failed to update product:', error);
    // Show error toast
  }
};

const handleDeleteProduct = async (id: string) => {
  if (!confirm('Are you sure you want to delete this product?')) return;
  
  try {
    await AdminAPI.deleteProduct(id);
    setProducts(products.filter(p => p.id !== id));
    // Show success toast
  } catch (error) {
    console.error('Failed to delete product:', error);
    // Show error toast
  }
};
```

---

## 🚀 Quick Setup Commands

### 1. Install Dependencies (if needed)
```bash
cd blinkit-clone
npm install
```

### 2. Ensure Environment Variables
```bash
# blinkit-clone/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Make User Admin
```bash
# Connect to database
psql -U postgres -d gobazar_db

# Update user role
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

### 4. Start Servers
```bash
# Terminal 1 - Backend
cd gobazar-backend
npm run dev

# Terminal 2 - Frontend
cd blinkit-clone
npm run dev
```

### 5. Access Admin Dashboard
```
http://localhost:3000/admin
```

---

## 📋 Admin Dashboard Features

### Current Features:
- ✅ Product listing with search & filters
- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Bulk operations
- ✅ Stock management
- ✅ Category filtering
- ✅ Low stock alerts

### Additional Features to Add:
- 🚧 Image upload
- 🚧 CSV export
- 🚧 Analytics dashboard
- 🚧 Order management
- 🚧 User management

---

## 🎯 Complete Workflow

### Adding Products via Admin Dashboard:

1. **Login as Admin**
   - Go to `http://localhost:3000`
   - Click "Sign In"
   - Enter admin email
   - Verify OTP
   - You'll be logged in as admin

2. **Access Admin Panel**
   - Go to `http://localhost:3000/admin`
   - Or click "Admin Dashboard" in header (if admin)

3. **Add Product**
   - Click "Add Product" button
   - Fill in product details:
     - Name, Description, Brand
     - Category, Subcategory
     - Price, MRP, Discount
     - Stock, Unit
     - Images (URLs)
     - Tags
   - Click "Save"

4. **Manage Products**
   - Search products
   - Filter by category
   - Edit product details
   - Update stock
   - Delete products
   - Bulk operations

### Adding Products via CSV:

1. **Prepare CSV File**
   - Use template: `gobazar-backend/templates/products_import_template.csv`
   - Add your products

2. **Run Import**
   ```bash
   cd gobazar-backend
   npx ts-node scripts/import-products.ts path/to/products.csv
   ```

3. **Verify in Admin Dashboard**
   - Refresh admin products page
   - Products should appear

---

## 🔐 Security Checklist

- ✅ Admin routes protected by authentication
- ✅ Backend checks for ADMIN role
- ✅ JWT tokens validated
- ✅ CORS configured
- ✅ Input validation on backend
- ⚠️ Use HTTPS in production
- ⚠️ Implement rate limiting
- ⚠️ Add audit logs

---

## 📊 Testing Checklist

### Backend API:
- [ ] Test admin login
- [ ] Test create product
- [ ] Test update product
- [ ] Test delete product
- [ ] Test bulk operations
- [ ] Test low stock alerts
- [ ] Test CSV import

### Frontend:
- [ ] Test admin dashboard access
- [ ] Test product listing
- [ ] Test product creation
- [ ] Test product editing
- [ ] Test product deletion
- [ ] Test search & filters
- [ ] Test bulk operations

---

## 🐛 Common Issues & Solutions

### Issue 1: "Admin access required" error
**Solution:** Update user role to 'ADMIN' in database

### Issue 2: Products not loading
**Solution:** 
- Check backend is running
- Verify API_URL in .env.local
- Check browser console for errors

### Issue 3: Cannot create product
**Solution:**
- Ensure you're logged in as admin
- Check JWT token is valid
- Verify all required fields are filled

### Issue 4: Images not showing
**Solution:**
- Use publicly accessible image URLs
- Check CORS settings
- Verify image URLs are valid

---

## 📈 Next Steps

### Immediate:
1. ✅ Test admin login
2. ✅ Test product creation
3. ✅ Import sample products via CSV
4. ✅ Verify products on frontend

### Short Term:
5. Add image upload functionality
6. Add CSV export
7. Add analytics dashboard
8. Add order management

### Long Term:
9. Advanced search & filters
10. Product variants management
11. Inventory forecasting
12. Multi-admin support

---

**Status:** ✅ Backend Complete | ✅ Frontend Ready | 🚧 Integration Needed
**Last Updated:** 2025-10-05
