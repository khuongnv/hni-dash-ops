# Environment Variables Setup

## Tạo file .env

Tạo file `.env` trong thư mục gốc của dự án với nội dung:

```env
# API Configuration
API_BASE_URL=http://localhost:64707
NUXT_PUBLIC_API_BASE_URL=http://localhost:64707
```

## Cấu hình Backend API

1. Đảm bảo backend đang chạy trên port 64707
2. Cấu hình các thông tin:
   - **API Base URL** → `API_BASE_URL` (mặc định: http://localhost:64707)
   - **Nuxt Public API Base URL** → `NUXT_PUBLIC_API_BASE_URL`

## Cấu hình Vercel

Khi deploy lên Vercel, thêm environment variables trong Vercel Dashboard:

1. Vào project settings
2. Chọn **Environment Variables**
3. Thêm:
   - `API_BASE_URL` = https://your-backend-api.com
   - `NUXT_PUBLIC_API_BASE_URL` = https://your-backend-api.com

## Lưu ý

- File `.env` không được commit vào git (đã có trong .gitignore)
- Environment variables trên Vercel phải khớp với tên trong nuxt.config.ts
- Backend API phải hỗ trợ CORS cho frontend domain
- Đảm bảo backend đang chạy trước khi start frontend
