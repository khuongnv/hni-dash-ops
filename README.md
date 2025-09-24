# HniDashOps - Full Stack Dashboard System

Hệ thống dashboard operations hoàn chỉnh với backend .NET Core 9.0 và frontend Nuxt.js, được thiết kế để deploy trên IIS như một ứng dụng duy nhất.

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt và chạy dự án](#cài-đặt-và-chạy-dự-án)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Hệ thống phân quyền](#hệ-thống-phân-quyền)

## 🎯 Tổng quan

HniDashOps là hệ thống quản lý dashboard hoàn chỉnh với:

### **Backend (.NET Core 9.0)**
- **Clean Architecture** với 4 layers
- **Entity Framework Core** với PostgreSQL
- **JWT Authentication** và **Role-based Authorization**
- **Audit System** đầy đủ cho tất cả thao tác

### **Frontend (Nuxt.js)**
- **Modern UI/UX** với Tailwind CSS
- **SSR/SPA** hybrid architecture
- **Real-time notifications**
- **Responsive design**

### **Tính năng chính**
- 👥 **Quản lý người dùng** với hệ thống phân quyền phức tạp
- 📋 **Quản lý menu** với cấu trúc phân cấp
- 🏢 **Quản lý phòng ban** với cấu trúc tree
- 📂 **Quản lý danh mục** với cấu trúc phân cấp
- 🔔 **Hệ thống thông báo** real-time
- 📊 **Dashboard** với charts và analytics
- 🔐 **SSO Integration** (tùy chọn)

## 🏗️ Kiến trúc hệ thống

### **Backend Architecture (Clean Architecture)**

```
backend/
├── HniDashOps.API/           # Presentation Layer
│   ├── Controllers/          # API Controllers
│   ├── DTOs/                 # Data Transfer Objects
│   └── Program.cs            # Application entry point
├── HniDashOps.Core/          # Domain Layer
│   ├── Entities/             # Domain entities
│   ├── Services/             # Service interfaces
│   └── Authorization/        # Authorization logic
├── HniDashOps.Infrastructure/# Infrastructure Layer
│   ├── Data/                 # Database context
│   ├── Services/             # Service implementations
│   └── Migrations/           # Database migrations
└── HniDashOps.Shared/        # Shared utilities
```

### **Frontend Architecture (Nuxt.js)**

```
frontend/
├── components/               # Vue components
│   ├── ui/                  # Reusable UI components
│   └── charts/              # Chart components
├── pages/                   # Application pages
│   ├── admin/              # Admin pages
│   ├── auth/               # Authentication pages
│   └── system/             # System pages
├── composables/            # Vue composables
├── layouts/                # Page layouts
├── middleware/             # Route middleware
├── plugins/                # Nuxt plugins
└── server/                 # Server-side API routes
```

## 📁 Cấu trúc dự án

```
hni-dash-ops/
├── backend/                    # .NET Core Backend
│   ├── HniDashOps.sln        # Solution file
│   ├── HniDashOps.API/       # Web API project
│   ├── HniDashOps.Core/      # Domain layer
│   ├── HniDashOps.Infrastructure/ # Infrastructure layer
│   └── HniDashOps.Shared/    # Shared utilities
├── frontend/                   # Nuxt.js Frontend
│   ├── components/            # Vue components
│   ├── pages/                 # Application pages
│   ├── composables/           # Vue composables
│   ├── layouts/               # Page layouts
│   ├── middleware/            # Route middleware
│   ├── plugins/               # Nuxt plugins
│   ├── server/                # Server-side API
│   ├── assets/                # Static assets
│   ├── nuxt.config.ts        # Nuxt configuration
│   └── package.json           # Dependencies
├── shared/                     # Shared types/contracts
│   ├── types/                 # TypeScript types
│   └── contracts/             # API contracts
├── docs/                       # Documentation
├── scripts/                    # Build/deploy scripts
│   ├── build/                 # Build scripts
│   └── deploy/                # Deployment scripts
└── README.md                   # This file
```

## 🚀 Cài đặt và chạy dự án

### 📋 Yêu cầu hệ thống

- **.NET 9.0 SDK**
- **Node.js 18+**
- **PostgreSQL 13+**
- **Visual Studio 2022** hoặc **VS Code**

### 🔧 Cài đặt Backend

1. **Clone repository:**
```bash
git clone <repository-url>
cd hni-dash-ops
```

2. **Restore packages:**
```bash
cd backend
dotnet restore
```

3. **Cấu hình database:**
```bash
# Cập nhật connection string trong backend/HniDashOps.API/appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=hni_dash_ops;Username=postgres;Password=your_password"
  }
}
```

4. **Chạy migrations:**
```bash
dotnet ef database update --project HniDashOps.Infrastructure --startup-project HniDashOps.API
```

5. **Seed dữ liệu mẫu:**
```bash
# Chạy API để seed dữ liệu
curl -X POST https://localhost:7001/api/seed/initialize
```

### 🔧 Cài đặt Frontend

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Cấu hình environment:**
```bash
# Tạo file .env
cp .env.example .env
# Cập nhật các biến môi trường
```

3. **Chạy development server:**
```bash
npm run dev
```

## 💻 Development Workflow

### **Chạy cả Backend và Frontend**

**Terminal 1 - Backend:**
```bash
cd backend
dotnet run --project HniDashOps.API
# API sẽ chạy tại: https://localhost:7001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend sẽ chạy tại: http://localhost:3000
```

### **Development URLs**

- **Frontend**: http://localhost:3000
- **Backend API**: https://localhost:7001
- **API Documentation**: https://localhost:7001/swagger

### **Hot Reload**

- **Frontend**: Tự động reload khi thay đổi code
- **Backend**: Cần restart khi thay đổi code

## 🚀 Deployment

### **IIS Deployment (Recommended)**

1. **Build Backend:**
```bash
cd backend
dotnet publish -c Release -o ./publish
```

2. **Build Frontend:**
```bash
cd frontend
npm run build
# Output sẽ được tạo trong .output/public/
```

3. **Deploy to IIS:**
   - Copy backend files vào IIS application folder
   - Copy frontend static files vào wwwroot
   - Cấu hình URL rewriting cho SPA routing

### **Docker Deployment (Optional)**

```bash
# Build và chạy với Docker Compose
docker-compose up -d
```

## 📚 API Documentation

### **Authentication Endpoints**

```http
POST /api/auth/login
Content-Type: application/json

{
  "usernameOrEmail": "superadmin",
  "password": "admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "superadmin",
      "email": "admin@example.com",
      "role": 1,
      "firstName": "Super",
      "lastName": "Admin"
    }
  }
}
```

### **User Management**

```http
GET /api/users
Authorization: Bearer {token}

POST /api/users
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "New",
  "lastName": "User",
  "roleId": 3
}
```

### **Menu Management**

```http
GET /api/menus
Authorization: Bearer {token}

POST /api/menus
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Dashboard",
  "href": "/dashboard",
  "icon": "fas fa-tachometer-alt",
  "order": 1,
  "isVisible": true
}
```

### **Department Management**

```http
GET /api/departments
Authorization: Bearer {token}

POST /api/departments
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "IT",
  "name": "Information Technology",
  "note": "IT Department"
}
```

### **Category Management**

```http
GET /api/categories
Authorization: Bearer {token}

POST /api/categories
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "CAT001",
  "name": "Software",
  "parentId": null,
  "order": 1
}
```

### **System Notifications**

```http
GET /api/notifications
Authorization: Bearer {token}

POST /api/notifications
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "System Maintenance",
  "message": "System will be under maintenance",
  "type": "warning",
  "priority": "high"
}
```

## 🗄️ Database Schema

### **Entity Relationship Diagram**

```
USERS (1) ──┐
            │
            ├── GROUP_USERS (n) ──┐
            │                     │
            └─────────────────────┼── GROUPS (1) ──┐
                                  │                │
                                  └────────────────┼── GROUP_MENUS (n) ──┐
                                                   │                   │
                                                   └───────────────────┼── MENUS (1)
                                                                       │
DEPARTMENTS (1) ──┐                                                  │
                  │                                                  │
                  ├── DEPARTMENTS (n) [self-reference]               │
                  │                                                  │
CATEGORIES (1) ───┼── CATEGORIES (n) [self-reference]               │
                  │                                                  │
SYSTEM_NOTIFICATIONS (1) ───────────────────────────────────────────┘
```

### **Key Features**

- **Audit Fields**: Tất cả entities có `CreatedAt`, `CreatedBy`, `UpdatedAt`, `UpdatedBy`, `IsDeleted`, `DeletedAt`
- **Soft Delete**: Sử dụng `IsDeleted` thay vì xóa thật
- **Hierarchical Data**: Departments và Categories hỗ trợ cấu trúc tree
- **Role-based Access**: Hệ thống phân quyền phức tạp với Groups và Menus

## 🔐 Hệ thống phân quyền

### **User Roles**

```csharp
public enum UserRole
{
    SuperAdmin = 1,    // Quản trị viên cao cấp - bypass tất cả kiểm tra quyền
    SubAdmin = 2,      // Quản trị viên phụ
    Member = 3,        // Thành viên
    Guest = 4          // Khách
}
```

### **Authorization System**

#### **1. SuperAdmin Bypass**
- User có role `SuperAdmin` sẽ **bypass tất cả** kiểm tra quyền
- Có thể truy cập tất cả API endpoints (trừ authentication)

#### **2. Custom Authorization Attributes**

**AuthorizeSuperAdmin Attribute:**
```csharp
[AuthorizeSuperAdmin]
public class UsersController : ControllerBase
{
    // Chỉ SuperAdmin mới có thể truy cập
}
```

**AuthorizeMenus Attribute:**
```csharp
[AuthorizeMenus(new[] { 1, 2, 3 }, LogicType.AND)]
public async Task<IActionResult> GetMenus()
{
    // User phải có quyền truy cập TẤT CẢ menu ID 1, 2, 3
}

[AuthorizeMenus(new[] { 1, 2, 3 }, LogicType.OR)]
public async Task<IActionResult> GetMenus()
{
    // User chỉ cần có quyền truy cập ÍT NHẤT 1 trong menu ID 1, 2, 3
}
```

**AuthorizeResource Attribute:**
```csharp
[AuthorizeResource(AuthorizationType.Department, new[] { 1, 2 }, LogicType.AND)]
public async Task<IActionResult> GetDepartments()
{
    // User phải có quyền truy cập TẤT CẢ department ID 1, 2
}
```

### **Authorization Logic**

**Cấu trúc phân quyền:**
```
User (1) -> GroupUser (n) -> Group (1) -> GroupMenu (n) -> Menu (1)
```

**Quy trình kiểm tra quyền:**
1. **Kiểm tra SuperAdmin**: Nếu user là SuperAdmin → cho phép truy cập
2. **Lấy danh sách Group**: Tìm tất cả Group mà user thuộc về
3. **Lấy danh sách Menu/Resource**: Từ các Group, lấy danh sách Menu/Resource được phép truy cập
4. **Kiểm tra Logic**: Áp dụng logic AND/OR để kiểm tra quyền truy cập

## 🔧 Development Guidelines

### **Backend Guidelines**

1. **Naming Conventions:**
   - Classes: `PascalCase`
   - Methods: `PascalCase`
   - Properties: `PascalCase`
   - Variables: `camelCase`
   - Database: `SNAKE_CASE`

2. **Entity Framework:**
   - Sử dụng `[Column]` attribute cho tất cả properties
   - Sử dụng `[Table]` attribute cho tất cả entities
   - Configure relationships trong `ApplicationDbContext`

3. **Services:**
   - Tất cả services kế thừa từ `BaseService`
   - Sử dụng async/await pattern
   - Implement proper error handling và logging

### **Frontend Guidelines**

1. **Vue.js Best Practices:**
   - Sử dụng Composition API
   - Implement proper error handling
   - Sử dụng TypeScript cho type safety

2. **Component Structure:**
   - Reusable components trong `components/ui/`
   - Page-specific components trong `components/`
   - Sử dụng composables cho business logic

3. **State Management:**
   - Sử dụng Pinia cho global state
   - Local state với `ref()` và `reactive()`

### **Testing**

```bash
# Backend tests
cd backend
dotnet test

# Frontend tests
cd frontend
npm run test
```

### **Build Scripts**

```bash
# Build backend
cd backend
dotnet build

# Build frontend
cd frontend
npm run build

# Build for production
npm run build:production
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@example.com
- **Documentation**: [Wiki](https://github.com/your-repo/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

---

**HniDashOps** - Built with ❤️ using .NET 9.0 + Nuxt.js