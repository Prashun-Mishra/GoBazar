@echo off
echo ========================================
echo ADDING ALL SUBCATEGORIES TO DATABASE
echo ========================================
echo.
echo This will add subcategories for all 20 categories
echo Total: 200+ subcategories
echo.
pause

echo.
echo [1/4] Adding subcategories for categories 1-2...
psql -U postgres -d gobazar_db -f "prisma/all-subcategories.sql"
if %errorlevel% neq 0 (
    echo ERROR: Failed to add part 1
    pause
    exit /b 1
)
echo ✓ Part 1 complete!

echo.
echo [2/4] Adding subcategories for categories 3-5...
psql -U postgres -d gobazar_db -f "prisma/all-subcategories-part2.sql"
if %errorlevel% neq 0 (
    echo ERROR: Failed to add part 2
    pause
    exit /b 1
)
echo ✓ Part 2 complete!

echo.
echo [3/4] Adding subcategories for categories 6-13...
psql -U postgres -d gobazar_db -f "prisma/all-subcategories-part3.sql"
if %errorlevel% neq 0 (
    echo ERROR: Failed to add part 3
    pause
    exit /b 1
)
echo ✓ Part 3 complete!

echo.
echo [4/4] Adding subcategories for categories 14-20...
psql -U postgres -d gobazar_db -f "prisma/all-subcategories-part4.sql"
if %errorlevel% neq 0 (
    echo ERROR: Failed to add part 4
    pause
    exit /b 1
)
echo ✓ Part 4 complete!

echo.
echo ========================================
echo ✅ SUCCESS!
echo ========================================
echo.
echo All subcategories have been added successfully!
echo.
echo Total categories: 20
echo Total subcategories: 200+
echo.
echo You can now:
echo 1. Go to admin panel: http://localhost:3000/admin/products
echo 2. Click "Add Product"
echo 3. Select any category
echo 4. See all subcategories appear in the dropdown!
echo.
echo ========================================
pause
