@echo off
echo ========================================
echo  Fixing Missing Subcategories
echo ========================================
echo.
echo This script will import missing subcategories
echo for categories 5-20 into the database.
echo.
pause

cd /d "%~dp0"
node scripts\fix-subcategories.js

echo.
echo ========================================
echo  Fix Complete!
echo ========================================
echo.
echo Please restart your backend server:
echo   npm run dev
echo.
echo Then clear your browser cache and reload
echo the frontend to see all subcategories.
echo.
pause
