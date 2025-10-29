# GoBazar Categories Setup Guide

## Overview
This guide will help you set up the comprehensive category structure for GoBazar with 20 main categories and their respective subcategories.

## Steps to Update Categories

### 1. Backend Setup

First, navigate to the backend directory:
```bash
cd gobazar-backend
```

### 2. Run Category Update Script

Execute the category update script:
```bash
node scripts/update-categories.js
```

This script will:
- Clear existing categories and subcategories
- Insert all 20 main categories
- Insert all subcategories for each category
- Verify the data insertion

### 3. Alternative Manual Database Update

If the script doesn't work, you can manually run the SQL files:

```bash
# Connect to your PostgreSQL database and run these files in order:
psql -d your_database_name -f prisma/comprehensive-categories.sql
psql -d your_database_name -f prisma/comprehensive-subcategories.sql
psql -d your_database_name -f prisma/remaining-subcategories.sql
psql -d your_database_name -f prisma/final-subcategories.sql
```

### 4. Start the Backend Server

```bash
npm run dev
```

### 5. Frontend Setup

Navigate to the frontend directory:
```bash
cd ../blinkit-clone
```

Start the frontend server:
```bash
npm run dev
```

## Category Structure

The system now includes these 20 main categories:

1. **Vegetables & Fruits** (12 subcategories)
2. **Dairy & Breakfast** (19 subcategories)
3. **Munchies** (12 subcategories)
4. **Cold Drinks & Juices** (13 subcategories)
5. **Tea, Coffee & Health Drinks** (12 subcategories)
6. **Bakery & Biscuits** (12 subcategories)
7. **Sweet Tooth** (11 subcategories)
8. **Paan Corner** (9 subcategories)
9. **Breakfast & Instant Food** (13 subcategories)
10. **Atta, Rice & Dal** (9 subcategories)
11. **Masala, Oil & More** (10 subcategories)
12. **Sauces & Spreads** (12 subcategories)
13. **Chicken, Meat & Fish** (8 subcategories)
14. **Organic & Healthy Living** (12 subcategories)
15. **Baby Care** (14 subcategories)
16. **Pharma & Wellness** (12 subcategories)
17. **Cleaning Essentials** (14 subcategories)
18. **Home & Office** (12 subcategories)
19. **Personal Care** (17 subcategories)
20. **Pet Care** (5 subcategories)

## Verification

After setup, you can verify the categories are working by:

1. Visiting the frontend at `http://localhost:3000`
2. Checking the category grid on the homepage
3. Visiting the admin panel at `http://localhost:3000/admin/categories`
4. Testing the API endpoints:
   - `http://localhost:5000/api/categories`
   - `http://localhost:5000/api/categories/subcategories`

## Troubleshooting

### Cart Sidebar Error Fixed
The "products.find is not a function" error has been resolved by updating the cart-sidebar.tsx component to properly handle the backend API response format.

### API Response Format
The frontend now properly handles the backend's paginated response format where data is returned in a `data` field.

### Database Connection
Ensure your PostgreSQL database is running and the connection string in `.env` is correct.

## Next Steps

1. Add products to the new categories
2. Update product seeding to use the new category structure
3. Implement category-based filtering and search
4. Add admin functionality for category management (CRUD operations)
