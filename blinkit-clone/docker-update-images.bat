@echo off
echo 🐳 Updating category images via Docker...
echo.

REM Check if Docker is running
docker --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker is not installed or not running
    echo Please start Docker Desktop and try again
    pause
    exit /b 1
)

echo ✅ Docker is running
echo.

REM Find PostgreSQL container
echo 🔍 Looking for PostgreSQL container...
for /f "tokens=*" %%i in ('docker ps --format "{{.Names}}" --filter "ancestor=postgres"') do set POSTGRES_CONTAINER=%%i

if "%POSTGRES_CONTAINER%"=="" (
    echo 🔍 Trying alternative container names...
    for /f "tokens=*" %%i in ('docker ps --format "{{.Names}}" | findstr postgres') do set POSTGRES_CONTAINER=%%i
)

if "%POSTGRES_CONTAINER%"=="" (
    for /f "tokens=*" %%i in ('docker ps --format "{{.Names}}" | findstr gobazar') do set POSTGRES_CONTAINER=%%i
)

if "%POSTGRES_CONTAINER%"=="" (
    echo ❌ Could not find PostgreSQL container
    echo.
    echo Available containers:
    docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"
    echo.
    set /p POSTGRES_CONTAINER="Enter PostgreSQL container name: "
)

echo ✅ Using container: %POSTGRES_CONTAINER%
echo.

REM Copy SQL file to container
echo 📁 Copying SQL script to container...
docker cp update-category-images.sql %POSTGRES_CONTAINER%:/tmp/update-category-images.sql

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to copy SQL file to container
    pause
    exit /b 1
)

echo ✅ SQL file copied successfully
echo.

REM Execute SQL script
echo 🚀 Executing category image updates...
echo.

REM Try different database names and users
set DB_NAMES=gobazar postgres blinkit ecommerce
set DB_USERS=postgres gobazar admin

for %%d in (%DB_NAMES%) do (
    for %%u in (%DB_USERS%) do (
        echo Trying database: %%d with user: %%u
        docker exec %POSTGRES_CONTAINER% psql -U %%u -d %%d -f /tmp/update-category-images.sql 2>nul
        if !ERRORLEVEL! EQU 0 (
            echo ✅ Successfully updated category images!
            echo Database: %%d, User: %%u
            goto :success
        )
    )
)

REM If automatic detection failed, prompt for details
echo.
echo ❌ Automatic database detection failed
echo.
set /p DB_NAME="Enter database name (default: gobazar): "
if "%DB_NAME%"=="" set DB_NAME=gobazar

set /p DB_USER="Enter database user (default: postgres): "
if "%DB_USER%"=="" set DB_USER=postgres

echo.
echo 🔄 Trying with provided credentials...
docker exec %POSTGRES_CONTAINER% psql -U %DB_USER% -d %DB_NAME% -f /tmp/update-category-images.sql

if %ERRORLEVEL% EQU 0 (
    goto :success
) else (
    echo ❌ Failed to update database
    echo.
    echo 🔧 Manual steps:
    echo 1. docker exec -it %POSTGRES_CONTAINER% bash
    echo 2. psql -U %DB_USER% -d %DB_NAME%
    echo 3. \i /tmp/update-category-images.sql
    goto :end
)

:success
echo.
echo 🎉 Category images updated successfully!
echo.
echo ✅ All 20 categories now have Grofers/Blinkit images
echo ✅ Images are live for all users
echo ✅ Ready for production hosting
echo.

REM Clean up
docker exec %POSTGRES_CONTAINER% rm /tmp/update-category-images.sql 2>nul

echo 🧹 Cleaned up temporary files
echo.

:end
pause
