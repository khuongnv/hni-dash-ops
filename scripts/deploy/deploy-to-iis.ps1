# Deploy to IIS Script
# Copies build outputs to IIS deployment structure

param(
    [string]$IISPath = "C:\inetpub\wwwroot\hni-dash-ops",
    [string]$BackupPath = "C:\backups\hni-dash-ops",
    [string]$BackendSource = "scripts/build/backend",
    [string]$FrontendSource = "scripts/build/frontend",
    [switch]$CreateBackup = $true,
    [switch]$Force = $false
)

Write-Host "🚀 Deploying to IIS..." -ForegroundColor Green
Write-Host "IIS Path: $IISPath" -ForegroundColor Yellow
Write-Host "Backend Source: $BackendSource" -ForegroundColor Yellow
Write-Host "Frontend Source: $FrontendSource" -ForegroundColor Yellow

# Validate source paths
if (-not (Test-Path $BackendSource)) {
    Write-Error "❌ Backend source not found: $BackendSource"
    Write-Host "💡 Run '.\scripts\build\build-all.ps1' first" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path $FrontendSource)) {
    Write-Error "❌ Frontend source not found: $FrontendSource"
    Write-Host "💡 Run '.\scripts\build\build-all.ps1' first" -ForegroundColor Yellow
    exit 1
}

try {
    # Create backup if requested and target exists
    if ($CreateBackup -and (Test-Path $IISPath)) {
        Write-Host "📦 Creating backup..." -ForegroundColor Blue
        $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
        $backupDir = "$BackupPath\$timestamp"
        
        if (-not (Test-Path $BackupPath)) {
            New-Item -ItemType Directory -Path $BackupPath -Force
        }
        
        New-Item -ItemType Directory -Path $backupDir -Force
        Copy-Item -Path $IISPath -Destination $backupDir -Recurse -Force
        Write-Host "✅ Backup created: $backupDir" -ForegroundColor Green
    }
    
    # Create IIS deployment directory
    Write-Host "📁 Creating IIS deployment directory..." -ForegroundColor Blue
    if (Test-Path $IISPath) {
        if ($Force) {
            Remove-Item -Path $IISPath -Recurse -Force
        } else {
            Write-Error "❌ IIS path already exists: $IISPath"
            Write-Host "💡 Use -Force to overwrite or -CreateBackup to backup first" -ForegroundColor Yellow
            exit 1
        }
    }
    
    New-Item -ItemType Directory -Path $IISPath -Force
    
    # Copy Backend files
    Write-Host "📤 Copying Backend files..." -ForegroundColor Blue
    Copy-Item -Path "$BackendSource\*" -Destination $IISPath -Recurse -Force
    
    # Copy Frontend files
    Write-Host "📤 Copying Frontend files..." -ForegroundColor Blue
    Copy-Item -Path "$FrontendSource\*" -Destination $IISPath -Recurse -Force
    
    # Copy web.config
    Write-Host "📋 Copying web.config..." -ForegroundColor Blue
    Copy-Item -Path "scripts/deploy/iis/web.config" -Destination $IISPath -Force
    
    # Set permissions (if running as admin)
    Write-Host "🔐 Setting permissions..." -ForegroundColor Blue
    try {
        $acl = Get-Acl $IISPath
        $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("IIS_IUSRS", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
        $acl.SetAccessRule($accessRule)
        Set-Acl -Path $IISPath -AclObject $acl
        Write-Host "✅ Permissions set successfully" -ForegroundColor Green
    } catch {
        Write-Warning "⚠️ Could not set permissions: $($_.Exception.Message)"
        Write-Host "💡 You may need to set permissions manually" -ForegroundColor Yellow
    }
    
    # Create deployment info
    $deployInfo = @{
        DeployTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        IISPath = $IISPath
        BackendSource = $BackendSource
        FrontendSource = $FrontendSource
        Version = "1.0.0"
        Environment = "Production"
    }
    
    $deployInfo | ConvertTo-Json | Out-File -FilePath "$IISPath/deploy-info.json" -Encoding UTF8
    
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "📁 Deployment location: $IISPath" -ForegroundColor Cyan
    
    # Show deployment structure
    Write-Host "`n📁 Deployment structure:" -ForegroundColor Yellow
    Get-ChildItem -Path $IISPath -Name | ForEach-Object { Write-Host "  $_" -ForegroundColor White }
    
} catch {
    Write-Error "❌ Deployment failed: $($_.Exception.Message)"
    exit 1
}

Write-Host "`n🎉 IIS deployment process completed!" -ForegroundColor Green
Write-Host "💡 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Configure IIS Application Pool" -ForegroundColor White
Write-Host "  2. Configure IIS Site binding" -ForegroundColor White
Write-Host "  3. Test the application" -ForegroundColor White
