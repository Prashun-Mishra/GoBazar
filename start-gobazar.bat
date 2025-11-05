@echo off
echo ========================================
echo    🚀 Starting GoBazar E-commerce Platform
echo ========================================
echo.

echo 📋 Checking Prerequisites...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

echo 🔧 Starting Backend Server...
echo Please make sure your backend is running on http://localhost:5000
echo.

echo 🌐 Starting Frontend Server...
cd /d "c:\Users\mishr\Downloads\Go Bazar\blinkit-clone"

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

echo.
echo 🚀 Launching GoBazar Frontend...
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend should be running at: http://localhost:5000
echo.
echo ========================================
echo    GoBazar Platform Starting...
echo ========================================
echo.

npm run dev

pause
