# HNI Dashboard Operations

Dashboard nội bộ được xây dựng với Nuxt 3 và shadcn-vue cho việc quản lý và giám sát hoạt động hệ thống.

## 🔗 GitHub Repository

**GitHub Repository**: [https://github.com/khuongnv/nuxt-hni-dash-ops](https://github.com/khuongnv/nuxt-hni-dash-ops)

## 🚀 Tính năng

### 📊 Dashboard & Analytics
- **Dashboard tổng quan**: Hiển thị các chỉ số quan trọng và biểu đồ
- **Báo cáo & Thống kê**: Tạo và xem các báo cáo chi tiết
- **Revenue Reports**: Báo cáo doanh thu và phân tích
- **User Reports**: Báo cáo người dùng và hoạt động

### 👥 Quản lý Người dùng
- **CRUD Operations**: Tạo, đọc, cập nhật, xóa người dùng
- **Role Management**: Quản lý vai trò (Admin, User)
- **User Analytics**: Thống kê và phân tích người dùng

### 🔔 Quản lý Thông báo Hệ thống
- **System Notifications**: Tạo và quản lý thông báo hệ thống
- **Notification Types**: Hỗ trợ 4 loại thông báo (Info, Warning, Error, Success)
- **Status Management**: Quản lý trạng thái (Active, Inactive)
- **Date Scheduling**: Lên lịch thông báo với start_at/end_at
- **Filter & Search**: Tìm kiếm và lọc thông báo

### 🎛️ Quản lý Menu & Navigation
- **Dynamic Menu**: Quản lý menu động từ database
- **Menu Hierarchy**: Hỗ trợ menu đa cấp
- **Icon Management**: Quản lý icon cho menu
- **Menu Ordering**: Sắp xếp thứ tự menu

### ⚙️ Cài đặt Hệ thống
- **System Settings**: Cấu hình các tham số hệ thống
- **Security Settings**: Cài đặt bảo mật (2FA, Password)
- **General Settings**: Cài đặt chung

### 🎨 UI/UX Features
- **Dark/Light Mode**: Hỗ trợ chuyển đổi theme
- **Responsive Design**: Tối ưu cho desktop và mobile
- **Sidebar có thể thu gọn**: Giao diện linh hoạt
- **Error Handling**: Xử lý lỗi toàn diện với ErrorBoundary
- **Loading States**: Trạng thái loading cho tất cả operations

## 🛠️ Công nghệ sử dụng

- **Framework**: Nuxt 3
- **UI Library**: shadcn-vue với Radix Vue
- **Styling**: Tailwind CSS
- **Icons**: Lucide Vue Next
- **TypeScript**: Hỗ trợ đầy đủ
- **Database**: PostgreSQL (Supabase)
- **API**: Supabase REST API + Custom API Routes
- **Authentication**: Supabase Auth
- **Charts**: Chart.js với Vue-ChartJS

## 📦 Cài đặt

1. Clone repository:
```bash
git clone https://github.com/khuongnv/nuxt-hni-dash-ops.git
cd nuxt-hni-dash-ops
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Cấu hình environment variables:
```bash
# Tạo file .env
cp .env.example .env

# Cập nhật thông tin Supabase trong .env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_API_KEY=your-anon-key-here
```

4. Chạy development server:
```bash
npm run dev
```

5. Mở trình duyệt tại `http://localhost:3000`

## 🏗️ Cấu trúc project

```
nuxtjs-hni-dash-ops/
├── assets/
│   └── css/
│       └── main.css                    # Tailwind CSS và custom styles
├── components/
│   ├── ui/                            # shadcn-vue components
│   │   ├── Button.vue
│   │   ├── Card.vue
│   │   ├── Table.vue
│   │   ├── Input.vue
│   │   ├── Select.vue
│   │   ├── Badge.vue
│   │   └── ...
│   ├── charts/                        # Chart components
│   │   ├── ActivityChart.vue
│   │   ├── RevenueChart.vue
│   │   └── SimpleChart.vue
│   ├── Header.vue                     # Header component
│   ├── Sidebar.vue                    # Sidebar component
│   ├── PageHeader.vue                 # Page header component
│   └── ErrorBoundary.vue              # Error boundary component
├── composables/                       # Vue composables
│   ├── useSupabase.ts                 # Supabase client
│   ├── useSystemNotifications.ts      # System notifications logic
│   ├── useErrorHandler.ts             # Error handling
│   ├── useIcons.ts                    # Icon management
│   ├── useAccessibility.ts            # Accessibility features
│   ├── useLazyComponent.ts            # Lazy loading
│   └── useSEO.ts                      # SEO utilities
├── layouts/
│   └── default.vue                    # Layout chính
├── pages/
│   ├── main/
│   │   ├── dashboard.vue              # Trang dashboard
│   │   └── about.vue                  # Trang giới thiệu
│   ├── admin/
│   │   ├── users.vue                  # Quản lý người dùng
│   │   ├── users/
│   │   │   ├── add.vue                # Thêm người dùng
│   │   │   ├── list.vue               # Danh sách người dùng
│   │   │   └── roles/                 # Quản lý vai trò
│   │   ├── menus.vue                  # Quản lý menu
│   │   └── system-notifications.vue   # Quản lý thông báo hệ thống
│   ├── system/
│   │   ├── reports.vue                # Báo cáo & thống kê
│   │   ├── reports/
│   │   │   ├── revenue.vue            # Báo cáo doanh thu
│   │   │   └── users.vue              # Báo cáo người dùng
│   │   └── settings.vue               # Cài đặt hệ thống
│   │       └── security/              # Cài đặt bảo mật
│   ├── index.vue                      # Trang chủ (redirect)
│   ├── 404.vue                        # Trang 404
│   └── error.vue                      # Trang lỗi
├── server/
│   └── api/
│       ├── menus/                     # API endpoints cho menu
│       │   ├── index.get.ts
│       │   ├── index.post.ts
│       │   ├── [id].get.ts
│       │   ├── [id].put.ts
│       │   └── [id].delete.ts
│       └── system-notifications/      # API endpoints cho thông báo
│           ├── index.get.ts
│           ├── index.post.ts
│           ├── [id].get.ts
│           ├── [id].put.ts
│           └── [id].delete.ts
├── plugins/
│   ├── supabase.client.ts             # Supabase client plugin
│   └── suppress-warnings.client.ts    # Suppress warnings plugin
├── lib/
│   └── utils.ts                       # Utility functions
├── data/
│   └── env-setup.md                   # Hướng dẫn setup environment
├── nuxt.config.ts                     # Cấu hình Nuxt
├── tailwind.config.js                 # Cấu hình Tailwind
└── package.json
```

## 🎨 UI Components

Project sử dụng shadcn-vue với các component đã được tùy chỉnh:

- **Button**: Nút bấm với nhiều variant (default, destructive, outline, secondary, ghost, link)
- **Card**: Container cho nội dung với header, content, description
- **Table**: Bảng dữ liệu với sorting và filtering
- **Input**: Form input fields với validation
- **Select**: Dropdown selection (sử dụng native HTML select)
- **Badge**: Hiển thị trạng thái với màu sắc
- **Avatar**: Ảnh đại diện người dùng
- **DropdownMenu**: Menu dropdown
- **Tooltip**: Tooltip cho các element
- **Label**: Label cho form fields

## 🔔 System Notifications

### Tính năng chính:
- **CRUD Operations**: Tạo, đọc, cập nhật, xóa thông báo
- **Notification Types**: 
  - `info` - Thông tin (màu xanh dương)
  - `warning` - Cảnh báo (màu vàng)
  - `error` - Lỗi (màu đỏ)
  - `success` - Thành công (màu xanh lá)
- **Status Management**: 
  - `active` - Hoạt động
  - `inactive` - Tạm dừng
- **Date Scheduling**: Lên lịch thông báo với `start_at` và `end_at`
- **Filter & Search**: Tìm kiếm theo tiêu đề, nội dung, loại, trạng thái

### Database Schema:
```sql
CREATE TABLE system_notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    status VARCHAR(20) DEFAULT 'active',
    created_by INTEGER,
    start_at TIMESTAMP,
    end_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎛️ Menu Management

### Tính năng:
- **Dynamic Menu**: Menu được quản lý từ database
- **Menu Hierarchy**: Hỗ trợ menu đa cấp với `parent_id`
- **Icon Management**: Sử dụng Lucide icons với `useIcons` composable
- **Menu Ordering**: Sắp xếp thứ tự với `order` field
- **Active Status**: Quản lý trạng thái hoạt động

### Database Schema:
```sql
CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    href VARCHAR(255),
    icon VARCHAR(100),
    order INTEGER DEFAULT 1,
    parent_id INTEGER,
    level INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌙 Dark Mode

Hỗ trợ chuyển đổi giữa dark mode và light mode:

- Sử dụng `@nuxtjs/color-mode`
- Toggle button trong header
- Lưu preference trong localStorage
- CSS variables cho theme colors

## 📱 Responsive Design

- **Desktop**: Sidebar cố định, có thể thu gọn
- **Tablet**: Sidebar overlay
- **Mobile**: Sidebar drawer, header compact

## 🔧 Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## 🗄️ Database & API

### Supabase PostgreSQL
- **Database**: PostgreSQL được host trên Supabase
- **Bảng chính**: 
  - `menus` - quản lý menu hệ thống
  - `system_notifications` - quản lý thông báo hệ thống
- **Real-time**: Hỗ trợ real-time subscriptions
- **Row Level Security**: Bảo mật dữ liệu với RLS

### API Endpoints

#### Menu Management:
```bash
GET    /api/menus           # Lấy danh sách menu
POST   /api/menus           # Tạo menu mới
GET    /api/menus/[id]      # Lấy menu theo ID
PUT    /api/menus/[id]      # Cập nhật menu
DELETE /api/menus/[id]      # Xóa menu
```

#### System Notifications:
```bash
GET    /api/system-notifications           # Lấy danh sách thông báo
POST   /api/system-notifications           # Tạo thông báo mới
GET    /api/system-notifications/[id]      # Lấy thông báo theo ID
PUT    /api/system-notifications/[id]      # Cập nhật thông báo
DELETE /api/system-notifications/[id]      # Xóa thông báo
```

### Environment Variables
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_API_KEY=your-anon-key-here
```

### Cấu hình Vercel Deployment
Khi deploy lên Vercel, cần thêm environment variables trong Vercel Dashboard:

1. Vào **Project Settings** → **Environment Variables**
2. Thêm các biến:
   - `SUPABASE_URL` = https://your-project-id.supabase.co
   - `SUPABASE_API_KEY` = your-anon-key-here
3. Redeploy project sau khi thêm environment variables

**Lưu ý**: Không sử dụng service_role key cho client-side, chỉ dùng anon key.

## 🚀 Deployment

1. Build project:
```bash
npm run build
```

2. Deploy thư mục `.output` lên hosting service

## 🛡️ Error Handling

- **ErrorBoundary Component**: Bắt và hiển thị lỗi gracefully
- **useErrorHandler Composable**: Xử lý lỗi tập trung
- **API Error Handling**: Xử lý lỗi API với try-catch
- **Form Validation**: Validation đầy đủ cho tất cả forms
- **Loading States**: Hiển thị trạng thái loading cho UX tốt hơn

## 📊 Performance Optimizations

- **Lazy Loading**: Sử dụng `useLazyComponent` cho components lớn
- **Code Splitting**: Tự động split code theo routes
- **Image Optimization**: Tối ưu hình ảnh với Nuxt Image
- **Caching**: Cache API responses và static assets
- **Bundle Optimization**: Tối ưu bundle size

## 🔒 Security Features

- **Row Level Security**: Bảo mật dữ liệu với Supabase RLS
- **Input Validation**: Validation tất cả inputs
- **XSS Protection**: Bảo vệ khỏi XSS attacks
- **CSRF Protection**: Bảo vệ khỏi CSRF attacks
- **Environment Variables**: Bảo mật sensitive data

## 📄 License

© 2024 KhuongNV. All rights reserved.

## 📞 Liên hệ

- Email: khuongnv@live.com
- GitHub: [https://github.com/khuongnv](https://github.com/khuongnv)

## 🎯 Roadmap

### Đã hoàn thành:
- ✅ CRUD System Notifications
- ✅ Menu Management
- ✅ User Management
- ✅ Dashboard & Reports
- ✅ Error Handling
- ✅ Responsive Design

### Đang phát triển:
- 🔄 Authentication & Authorization
- 🔄 Real-time Notifications
- 🔄 Advanced Analytics
- 🔄 Export/Import Features

### Kế hoạch:
- 📋 Multi-language Support
- 📋 Advanced Search & Filtering
- 📋 Audit Logs
- 📋 API Documentation
- 📋 Unit Tests & E2E Tests