# HNI Dashboard Operations - Deployment

## 🚀 Cách chạy ứng dụng

### Option 1: Chạy tự động (Khuyến nghị)
```bash
start-app.bat
```

### Option 2: Chạy thủ công

#### Backend API:
```bash
dotnet HniDashOps.API.dll
```
- URL: http://localhost:5000
- Swagger UI: http://localhost:5000/swagger

#### Frontend:
```bash
node server/index.mjs
```
- URL: http://localhost:3000

## 📁 Cấu trúc deployment

```
scripts/deploy/iis/
├── Backend files (API, DLLs, configs)
├── public/ (Frontend static assets)
├── server/ (Frontend server files)
├── index.html (Landing page)
├── web.config (IIS configuration)
├── package.json (Frontend dependencies)
└── start-app.bat (Auto-start script)
```

## 🔧 Cấu hình IIS

1. **Backend API**: Chạy trên port 5000
2. **Frontend**: Chạy trên port 3000
3. **Static files**: Served từ folder `public/`
4. **API routes**: Được proxy đến backend

## 🌐 Truy cập ứng dụng

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Swagger UI**: http://localhost:5000/swagger
- **Landing page**: http://localhost (IIS)

## 📝 Ghi chú

- Backend cần .NET 8.0 Runtime
- Frontend cần Node.js 18+
- Database connection string trong `appsettings.json`
