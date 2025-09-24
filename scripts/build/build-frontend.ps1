# Build Frontend Script
# Builds Nuxt.js frontend to scripts/build/frontend/

param(
    [string]$Mode = "production",
    [string]$OutputPath = "scripts/build/frontend"
)

Write-Host "🚀 Building Frontend..." -ForegroundColor Green
Write-Host "Mode: $Mode" -ForegroundColor Yellow
Write-Host "Output Path: $OutputPath" -ForegroundColor Yellow

# Change to frontend directory
Set-Location "frontend"

try {
    # Clean previous build
    Write-Host "🧹 Cleaning previous build..." -ForegroundColor Blue
    if (Test-Path "../$OutputPath") {
        Remove-Item -Path "../$OutputPath" -Recurse -Force
    }
    
    # Remove node_modules and package-lock.json for clean install
    if (Test-Path "node_modules") {
        Write-Host "🗑️ Removing node_modules..." -ForegroundColor Blue
        Remove-Item -Path "node_modules" -Recurse -Force
    }
    
    if (Test-Path "package-lock.json") {
        Remove-Item -Path "package-lock.json" -Force
    }
    
    # Install dependencies
    Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
    npm install
    if ($LASTEXITCODE -ne 0) {
        throw "npm install failed"
    }
    
    # Build frontend
    Write-Host "🔨 Building frontend..." -ForegroundColor Blue
    if ($Mode -eq "production") {
        npm run build
    } else {
        npm run build:dev
    }
    
    if ($LASTEXITCODE -ne 0) {
        throw "Frontend build failed"
    }
    
    # Copy build output to target directory
    Write-Host "📤 Copying build output..." -ForegroundColor Blue
    if (Test-Path ".output/public") {
        Copy-Item -Path ".output/public/*" -Destination "../$OutputPath" -Recurse -Force
    } else {
        throw "Build output not found in .output/public"
    }
    
    # Copy additional files if needed
    Write-Host "📋 Copying additional files..." -ForegroundColor Blue
    
    # Create deployment info file
    $deployInfo = @{
        BuildTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Mode = $Mode
        Version = "1.0.0"
        Environment = "Production"
        NodeVersion = (node --version)
        NpmVersion = (npm --version)
    }
    
    $deployInfo | ConvertTo-Json | Out-File -FilePath "../$OutputPath/deploy-info.json" -Encoding UTF8
    
    Write-Host "✅ Frontend build completed successfully!" -ForegroundColor Green
    Write-Host "📁 Output location: $OutputPath" -ForegroundColor Cyan
    
} catch {
    Write-Error "❌ Frontend build failed: $($_.Exception.Message)"
    exit 1
} finally {
    # Return to root directory
    Set-Location ".."
}

Write-Host "🎉 Frontend build process completed!" -ForegroundColor Green
