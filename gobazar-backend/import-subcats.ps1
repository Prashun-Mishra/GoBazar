Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Importing ALL Subcategories" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

Write-Host "Running import script..." -ForegroundColor Yellow
node scripts\fix-subcategories.js

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Import Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Restart backend: npm run dev" -ForegroundColor White
Write-Host "  2. Clear browser cache" -ForegroundColor White
Write-Host "  3. Reload frontend" -ForegroundColor White
Write-Host ""
