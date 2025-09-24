# Build All Script
# Builds both backend and frontend

param(
    [string]$Configuration = "Release",
    [string]$Mode = "production"
)

Write-Host "🚀 Building Full Stack Application..." -ForegroundColor Green
Write-Host "Backend Configuration: $Configuration" -ForegroundColor Yellow
Write-Host "Frontend Mode: $Mode" -ForegroundColor Yellow

$startTime = Get-Date

try {
    # Build Backend
    Write-Host "`n🔧 Building Backend..." -ForegroundColor Cyan
    & ".\scripts\build\build-backend.ps1" -Configuration $Configuration
    if ($LASTEXITCODE -ne 0) {
        throw "Backend build failed"
    }
    
    # Build Frontend
    Write-Host "`n🔧 Building Frontend..." -ForegroundColor Cyan
    & ".\scripts\build\build-frontend.ps1" -Mode $Mode
    if ($LASTEXITCODE -ne 0) {
        throw "Frontend build failed"
    }
    
    $endTime = Get-Date
    $duration = $endTime - $startTime
    
    Write-Host "`n✅ All builds completed successfully!" -ForegroundColor Green
    Write-Host "⏱️ Total build time: $($duration.TotalSeconds.ToString('F2')) seconds" -ForegroundColor Cyan
    
    # Show build outputs
    Write-Host "`n📁 Build outputs:" -ForegroundColor Yellow
    Write-Host "  Backend:  scripts/build/backend/" -ForegroundColor White
    Write-Host "  Frontend: scripts/build/frontend/" -ForegroundColor White
    
} catch {
    Write-Error "❌ Build process failed: $($_.Exception.Message)"
    exit 1
}

Write-Host "`n🎉 Full stack build process completed!" -ForegroundColor Green
