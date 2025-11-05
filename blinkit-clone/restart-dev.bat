@echo off
echo 🔄 Restarting development server to apply category image updates...
echo.

REM Kill any existing Next.js processes
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

echo ✅ Cleared existing processes
echo 🚀 Starting development server with updated category images...
echo.

REM Start the development server
npm run dev

echo.
echo 🎉 Development server started!
echo 📱 Open: http://localhost:3000
echo 🖼️ Category images should now show Grofers/Blinkit images
pause
