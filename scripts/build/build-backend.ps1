# Build Backend Script
# Publishes .NET Core backend to scripts/build/backend/

param(
    [string]$Configuration = "Release",
    [string]$OutputPath = "scripts/build/backend"
)

Write-Host "Building Backend..." -ForegroundColor Green
Write-Host "Configuration: $Configuration" -ForegroundColor Yellow
Write-Host "Output Path: $OutputPath" -ForegroundColor Yellow

# Change to backend directory
Set-Location "backend"

try {
    # Clean previous build
    Write-Host "Cleaning previous build..." -ForegroundColor Blue
    if (Test-Path "../$OutputPath") {
        Remove-Item -Path "../$OutputPath" -Recurse -Force
    }
    
    # Restore packages
    Write-Host "Restoring packages..." -ForegroundColor Blue
    dotnet restore
    if ($LASTEXITCODE -ne 0) {
        throw "Package restore failed"
    }
    
    # Build solution
    Write-Host "Building solution..." -ForegroundColor Blue
    dotnet build -c $Configuration
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed"
    }
    
    # Publish API project
    Write-Host "Publishing API project..." -ForegroundColor Blue
    dotnet publish HniDashOps.API/HniDashOps.API.csproj -c $Configuration -o "../$OutputPath" --self-contained false
    if ($LASTEXITCODE -ne 0) {
        throw "Publish failed"
    }
    
    # Copy additional files if needed
    Write-Host "Copying additional files..." -ForegroundColor Blue
    
    # Create deployment info file
    $deployInfo = @{
        BuildTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Configuration = $Configuration
        Version = "1.0.0"
        Environment = "Production"
    }
    
    $deployInfo | ConvertTo-Json | Out-File -FilePath "../$OutputPath/deploy-info.json" -Encoding UTF8
    
    Write-Host "Backend build completed successfully!" -ForegroundColor Green
    Write-Host "Output location: $OutputPath" -ForegroundColor Cyan
    
} catch {
    Write-Error "Backend build failed: $($_.Exception.Message)"
    exit 1
} finally {
    # Return to root directory
    Set-Location ".."
}

Write-Host "Backend build process completed!" -ForegroundColor Green
