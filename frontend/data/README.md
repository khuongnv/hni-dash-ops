# Demo Data

Thư mục này chứa dữ liệu demo để thay thế tạm thời cho Supabase REST API.

## Các file dữ liệu demo

### 1. `demo-menus.ts`
- Chứa 30 menu items với cấu trúc phân cấp
- Bao gồm menu chính, sub-menu và sub-sub-menu
- Tất cả menu đều được đánh dấu `is_public: true` và `is_active: true`

### 2. `demo-categories.ts`
- Chứa 30 categories với cấu trúc phân cấp
- Bao gồm các danh mục chính: Công nghệ thông tin, Nhân sự, Tài chính, Marketing, Vận hành
- Mỗi danh mục chính có các sub-categories tương ứng

### 3. `demo-departments.ts`
- Chứa 32 departments với cấu trúc phân cấp 4 cấp
- Cấp 1: Công ty
- Cấp 2: Các phòng ban chính
- Cấp 3: Các bộ phận trong phòng ban
- Cấp 4: Các nhóm trong bộ phận

### 4. `demo-system-notifications.ts`
- Chứa 30 thông báo hệ thống với các loại khác nhau
- Bao gồm: maintenance, security, holiday, meeting, policy, training, etc.
- Có các mức độ ưu tiên: high, medium, low
- Một số thông báo đã được đánh dấu `is_read: true`

### 5. `demo-users.ts`
- Chứa 25 users với thông tin đầy đủ
- Bao gồm thông tin cá nhân, phòng ban, vai trò, vị trí
- Có liên kết với departments và các thông tin khác

## Cách sử dụng

Các composables đã được cập nhật để sử dụng dữ liệu demo thay vì gọi API:

- `useMenus()` - Sử dụng `demoMenus`
- `useCategories()` - Sử dụng `demoCategories`
- `useDepartments()` - Sử dụng `demoDepartments`
- `useSystemNotifications()` - Sử dụng `demoSystemNotifications`
- `useUsers()` - Sử dụng `demoUsers`

## Lưu ý

- Tất cả dữ liệu demo đều được đánh dấu `is_public: true` để hiển thị khi chưa login
- Các thao tác CRUD vẫn hoạt động bình thường nhưng chỉ thay đổi trong memory
- Dữ liệu sẽ reset về trạng thái ban đầu khi reload trang
- Để chuyển lại sang Supabase, chỉ cần thay đổi logic trong các composables
