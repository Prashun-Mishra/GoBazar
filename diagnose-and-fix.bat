@echo off
echo ========================================
echo GO BAZAR - DIAGNOSTIC AND FIX SCRIPT
echo ========================================
echo.

echo [1/5] Checking Backend Server...
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Backend is running on port 5000
) else (
    echo ✗ Backend is NOT running!
    echo.
    echo PLEASE START BACKEND:
    echo   cd gobazar-backend
    echo   npm run dev
    echo.
    pause
    exit /b 1
)

echo.
echo [2/5] Testing Categories API...
curl -s http://localhost:5000/api/categories > temp_categories.json
findstr /C:"success" temp_categories.json >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Categories API is working
    type temp_categories.json | findstr /C:"message"
) else (
    echo ✗ Categories API failed
    echo Response:
    type temp_categories.json
)
del temp_categories.json >nul 2>&1

echo.
echo [3/5] Testing Orders API...
curl -s http://localhost:5000/api/orders > temp_orders.json
type temp_orders.json | findstr /C:"error" >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Orders API requires authentication (expected)
) else (
    echo ⚠ Orders API response:
    type temp_orders.json
)
del temp_orders.json >nul 2>&1

echo.
echo [4/5] Checking Frontend Server...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Frontend is running on port 3000
) else (
    echo ✗ Frontend is NOT running!
    echo.
    echo PLEASE START FRONTEND:
    echo   cd blinkit-clone
    echo   npm run dev
    echo.
    pause
    exit /b 1
)

echo.
echo [5/5] Testing Frontend API Proxy...
curl -s http://localhost:3000/api/categories > temp_frontend_categories.json
findstr /C:"success" temp_frontend_categories.json >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Frontend API proxy is working
    type temp_frontend_categories.json | findstr /C:"message"
) else (
    echo ✗ Frontend API proxy failed
    echo Response:
    type temp_frontend_categories.json
)
del temp_frontend_categories.json >nul 2>&1

echo.
echo ========================================
echo DIAGNOSTICS COMPLETE
echo ========================================
echo.
echo SOLUTIONS:
echo.
echo 1. CLEAR BROWSER CACHE:
echo    - Press Ctrl + Shift + Delete
echo    - Select "Cached images and files"
echo    - Click "Clear data"
echo.
echo 2. HARD REFRESH:
echo    - Press Ctrl + Shift + R in browser
echo.
echo 3. CHECK BROWSER CONSOLE:
echo    - Press F12
echo    - Go to Console tab
echo    - Look for errors or log: "Categories fetched: X"
echo.
echo 4. RESTART BOTH SERVERS:
echo    Backend: gobazar-backend\npm run dev
echo    Frontend: blinkit-clone\npm run dev
echo.
echo ========================================
pause
