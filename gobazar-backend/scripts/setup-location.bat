@echo off
echo.
echo 🌍 Setting up Location Feature...
echo.

REM Step 1: Run Prisma migration
echo 📦 Running database migration...
call npx prisma migrate dev --name add_location_models

REM Step 2: Generate Prisma client
echo 🔧 Generating Prisma client...
call npx prisma generate

REM Step 3: Seed popular locations
echo 🌱 Seeding popular locations...
call npx ts-node prisma/seeds/popularLocations.ts

echo.
echo ✅ Location feature setup complete!
echo.
echo 📖 API Documentation: docs/LOCATION_API.md
echo 🚀 Start server: npm run dev
echo.
echo Available endpoints:
echo   GET  /api/location/search?q=^<query^>
echo   GET  /api/location/current?latitude=^<lat^>&longitude=^<lon^>
echo   GET  /api/location/popular
echo   POST /api/location/save (requires auth)
echo   GET  /api/location/user (requires auth)
echo   POST /api/location/popular (admin only)
echo.
pause
