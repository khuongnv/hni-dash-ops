# Deploy All Script
# Builds and deploys the entire application

param(
    [string]$Configuration = "Release",
    [string]$Mode = "production",
    [string]$IISPath = "C:\inetpub\wwwroot\hni-dash-ops",
    [string]$BackupPath = "C:\backups\hni-dash-ops",
    [switch]$CreateBackup = $true,
    [switch]$Force = $false
)

Write-Host "🚀 Full Stack Deploy Process..." -ForegroundColor Green
Write-Host "Configuration: $Configuration" -ForegroundColor Yellow
Write-Host "Mode: $Mode" -ForegroundColor Yellow
Write-Host "IIS Path: $IISPath" -ForegroundColor Yellow

$startTime = Get-Date

try {
    # Step 1: Build everything
    Write-Host "`n🔧 Step 1: Building application..." -ForegroundColor Cyan
    & ".\scripts\build\build-all.ps1" -Configuration $Configuration -Mode $Mode
    if ($LASTEXITCODE -ne 0) {
        throw "Build process failed"
    }
    
    # Step 2: Deploy to IIS
    Write-Host "`n🚀 Step 2: Deploying to IIS..." -ForegroundColor Cyan
    & ".\scripts\deploy\deploy-to-iis.ps1" -IISPath $IISPath -BackupPath $BackupPath -CreateBackup:$CreateBackup -Force:$Force
    if ($LASTEXITCODE -ne 0) {
        throw "Deployment process failed"
    }
    
    $endTime = Get-Date
    $duration = $endTime - $startTime
    
    Write-Host "`n✅ Full deployment completed successfully!" -ForegroundColor Green
    Write-Host "⏱️ Total deployment time: $($duration.TotalSeconds.ToString('F2')) seconds" -ForegroundColor Cyan
    
    # Show final status
    Write-Host "`n📊 Deployment Summary:" -ForegroundColor Yellow
    Write-Host "  ✅ Backend built and deployed" -ForegroundColor Green
    Write-Host "  ✅ Frontend built and deployed" -ForegroundColor Green
    Write-Host "  ✅ IIS configuration applied" -ForegroundColor Green
    Write-Host "  📁 Deployment location: $IISPath" -ForegroundColor Cyan
    
} catch {
    Write-Error "❌ Full deployment failed: $($_.Exception.Message)"
    exit 1
}

Write-Host "`n🎉 Full stack deployment process completed!" -ForegroundColor Green
Write-Host "💡 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Configure IIS Application Pool (.NET 9.0)" -ForegroundColor White
Write-Host "  2. Configure IIS Site binding (HTTP/HTTPS)" -ForegroundColor White
Write-Host "  3. Test the application at your domain" -ForegroundColor White
Write-Host "  4. Configure SSL certificate if needed" -ForegroundColor White
