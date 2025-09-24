# Environment Variables Setup

## Tạo file .env

Tạo file `.env` trong thư mục gốc của dự án với nội dung:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_API_KEY=your-anon-key-here
```

## Lấy thông tin từ Supabase

1. Đăng nhập vào [Supabase Dashboard](https://supabase.com/)
2. Chọn project của bạn
3. Vào **Settings** → **API**
4. Copy các thông tin:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_API_KEY`

## Cấu hình Vercel

Khi deploy lên Vercel, thêm environment variables trong Vercel Dashboard:

1. Vào project settings
2. Chọn **Environment Variables**
3. Thêm:
   - `SUPABASE_URL` = https://your-project-id.supabase.co
   - `SUPABASE_API_KEY` = your-anon-key-here

## Lưu ý

- File `.env` không được commit vào git (đã có trong .gitignore)
- Environment variables trên Vercel phải khớp với tên trong nuxt.config.ts
- Không sử dụng service_role key cho client-side



# Supabase Configuration
SUPABASE_URL=https://tpqraghvxywsoaxmfcfs.supabase.co
SUPABASE_API_KEY=sb_secret_xc-edfngrUhDEYjYfqTDyQ_-RJGwlKP
