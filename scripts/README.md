# Build & Deploy Scripts

Thư mục này chứa các scripts để build và deploy ứng dụng HniDashOps.

## 📁 Cấu trúc

```
scripts/
├── build/                    # Build scripts
│   ├── backend/             # Backend build output
│   ├── frontend/            # Frontend build output
│   ├── build-backend.ps1    # Build backend script
│   ├── build-frontend.ps1   # Build frontend script
│   └── build-all.ps1        # Build everything script
├── deploy/                   # Deploy scripts
│   ├── iis/                 # IIS configuration
│   │   └── web.config       # IIS web.config
│   ├── deploy-to-iis.ps1    # Deploy to IIS script
│   └── deploy-all.ps1       # Full deploy script
└── README.md                # This file
```

## 🚀 Cách sử dụng

### **Build Backend**
```powershell
.\scripts\build\build-backend.ps1
```

### **Build Frontend**
```powershell
.\scripts\build\build-frontend.ps1
```

### **Build Everything**
```powershell
.\scripts\build\build-all.ps1
```

### **Deploy to IIS**
```powershell
.\scripts\deploy\deploy-to-iis.ps1
```

### **Full Deploy (Build + Deploy)**
```powershell
.\scripts\deploy\deploy-all.ps1
```

## 🔧 Parameters

### **Build Scripts**

| Parameter | Description | Default |
|-----------|-------------|---------|
| `-Configuration` | Backend build configuration | `Release` |
| `-Mode` | Frontend build mode | `production` |
| `-OutputPath` | Output directory | `scripts/build/backend` or `scripts/build/frontend` |

### **Deploy Scripts**

| Parameter | Description | Default |
|-----------|-------------|---------|
| `-IISPath` | IIS deployment path | `C:\inetpub\wwwroot\hni-dash-ops` |
| `-BackupPath` | Backup directory | `C:\backups\hni-dash-ops` |
| `-CreateBackup` | Create backup before deploy | `$true` |
| `-Force` | Force overwrite existing deployment | `$false` |

## 📋 Workflow

### **Development Workflow**
1. **Build Backend**: `.\scripts\build\build-backend.ps1`
2. **Build Frontend**: `.\scripts\build\build-frontend.ps1`
3. **Deploy to IIS**: `.\scripts\deploy\deploy-to-iis.ps1`

### **Production Workflow**
1. **Full Deploy**: `.\scripts\deploy\deploy-all.ps1`

## 🔍 Build Outputs

### **Backend Output** (`scripts/build/backend/`)
- Compiled .NET Core application
- All dependencies
- Configuration files
- `deploy-info.json` with build metadata

### **Frontend Output** (`scripts/build/frontend/`)
- Static files (HTML, CSS, JS)
- Assets and images
- `_nuxt/` directory with compiled code
- `deploy-info.json` with build metadata

## 🚀 IIS Deployment

### **Prerequisites**
- IIS installed and configured
- .NET 9.0 Runtime installed
- Application Pool configured for .NET 9.0

### **Deployment Structure**
```
C:\inetpub\wwwroot\hni-dash-ops\
├── api/                     # Backend API endpoints
├── _nuxt/                   # Frontend static files
├── assets/                  # Frontend assets
├── index.html              # Frontend entry point
├── web.config              # IIS configuration
└── deploy-info.json        # Deployment metadata
```

### **IIS Configuration**
- **Application Pool**: .NET 9.0, Integrated Pipeline
- **Site Binding**: HTTP (80) and HTTPS (443)
- **URL Rewriting**: Configured for SPA routing
- **Static Files**: Proper MIME types configured

## 🔧 Troubleshooting

### **Build Issues**
- **Backend build fails**: Check .NET 9.0 SDK installation
- **Frontend build fails**: Check Node.js and npm installation
- **Package restore fails**: Check internet connection and package sources

### **Deploy Issues**
- **Permission denied**: Run PowerShell as Administrator
- **IIS path exists**: Use `-Force` parameter or `-CreateBackup`
- **Static files not loading**: Check MIME types in web.config

### **Common Solutions**
```powershell
# Clean build outputs
Remove-Item -Path "scripts/build" -Recurse -Force

# Rebuild everything
.\scripts\build\build-all.ps1

# Force deploy
.\scripts\deploy\deploy-to-iis.ps1 -Force
```

## 📊 Monitoring

### **Build Information**
- Build time and configuration
- Version and environment
- Dependencies and packages

### **Deploy Information**
- Deployment time and location
- Source paths and versions
- IIS configuration applied

## 🔐 Security

### **IIS Security Headers**
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

### **File Permissions**
- IIS_IUSRS: Full Control
- Application Pool Identity: Read/Execute

## 📞 Support

Nếu gặp vấn đề với build hoặc deploy:

1. **Check logs**: Xem output của scripts để tìm lỗi
2. **Verify prerequisites**: Đảm bảo .NET 9.0 và Node.js đã cài đặt
3. **Check permissions**: Đảm bảo có quyền ghi vào IIS path
4. **Review configuration**: Kiểm tra các tham số và đường dẫn

---

**HniDashOps Build & Deploy Scripts** - Automated deployment for full-stack applications
