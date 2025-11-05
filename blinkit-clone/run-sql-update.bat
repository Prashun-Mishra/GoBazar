@echo off
echo Updating category images in database...
echo.

REM Check if PostgreSQL is installed and accessible
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo PostgreSQL command line tools not found in PATH
    echo Please install PostgreSQL or add it to your PATH
    echo.
    echo Alternative: Run the SQL commands manually in your database client
    echo SQL file: update-category-images.sql
    pause
    exit /b 1
)

echo Found PostgreSQL tools
echo.

REM Prompt for database connection details
set /p DB_HOST="Enter database host (default: localhost): "
if "%DB_HOST%"=="" set DB_HOST=localhost

set /p DB_PORT="Enter database port (default: 5432): "
if "%DB_PORT%"=="" set DB_PORT=5432

set /p DB_NAME="Enter database name (default: gobazar): "
if "%DB_NAME%"=="" set DB_NAME=gobazar

set /p DB_USER="Enter database username (default: postgres): "
if "%DB_USER%"=="" set DB_USER=postgres

echo.
echo Connecting to database: %DB_USER%@%DB_HOST%:%DB_PORT%/%DB_NAME%
echo.

REM Run the SQL update script
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f update-category-images.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Category images updated successfully!
    echo All users will now see the new Grofers/Blinkit category images.
) else (
    echo.
    echo ❌ Failed to update category images
    echo Please check your database connection and try again
)

echo.
pause
