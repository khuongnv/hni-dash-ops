<template>
  <div class="h-full flex flex-col space-y-6">
    <!-- Page Header -->
    <PageHeader 
      title="Giới thiệu về chương trình"
    />

    <!-- About Content -->
    <div class="space-y-8">
      <!-- Introduction -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Info class="w-5 h-5" />
            Tổng quan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground leading-relaxed">
            Dashboard nội bộ được xây dựng với Nuxt 3 và shadcn-vue cho việc quản lý và giám sát hoạt động hệ thống.
          </p>
        </CardContent>
      </Card>

      <!-- GitHub Repository -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Github class="w-5 h-5" />
            GitHub Repository
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <p class="text-muted-foreground">
              Mã nguồn của dự án được lưu trữ và quản lý trên GitHub:
            </p>
            <div class="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <Github class="w-5 h-5 text-muted-foreground" />
              <div>
                <p class="font-medium">Repository</p>
                <a 
                  href="https://github.com/khuongnv/nuxt-hni-dash-ops" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-primary hover:underline text-sm"
                >
                  https://github.com/khuongnv/nuxt-hni-dash-ops
                </a>
              </div>
            </div>
            <div class="text-sm text-muted-foreground space-y-1">
              <p>• Clone repository: <code class="bg-muted px-1 rounded">git clone https://github.com/khuongnv/nuxt-hni-dash-ops.git</code></p>
              <p>• Xem mã nguồn, tạo issues, và đóng góp vào dự án</p>
              <p>• Theo dõi lịch sử commit và các phiên bản</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Features -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Zap class="w-5 h-5" />
            Tính năng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-6">
            <!-- Dashboard & Analytics -->
            <div>
              <h4 class="font-semibold mb-3 flex items-center gap-2">
                <BarChart3 class="w-4 h-4" />
                Dashboard & Analytics
              </h4>
              <div class="grid gap-3 md:grid-cols-2">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Dashboard tổng quan</h5>
                    <p class="text-xs text-muted-foreground">Hiển thị các chỉ số quan trọng và biểu đồ</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Revenue Reports</h5>
                    <p class="text-xs text-muted-foreground">Báo cáo doanh thu và phân tích</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">User Reports</h5>
                    <p class="text-xs text-muted-foreground">Báo cáo người dùng và hoạt động</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- User Management -->
            <div>
              <h4 class="font-semibold mb-3 flex items-center gap-2">
                <Users class="w-4 h-4" />
                Quản lý Người dùng
              </h4>
              <div class="grid gap-3 md:grid-cols-2">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">CRUD Operations</h5>
                    <p class="text-xs text-muted-foreground">Tạo, đọc, cập nhật, xóa người dùng</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Role Management</h5>
                    <p class="text-xs text-muted-foreground">Quản lý vai trò (Admin, User)</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">User Analytics</h5>
                    <p class="text-xs text-muted-foreground">Thống kê và phân tích người dùng</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- System Notifications -->
            <div>
              <h4 class="font-semibold mb-3 flex items-center gap-2">
                <Bell class="w-4 h-4" />
                Quản lý Thông báo Hệ thống
              </h4>
              <div class="grid gap-3 md:grid-cols-2">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">System Notifications</h5>
                    <p class="text-xs text-muted-foreground">Tạo và quản lý thông báo hệ thống</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Notification Types</h5>
                    <p class="text-xs text-muted-foreground">4 loại: Info, Warning, Error, Success</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Status Management</h5>
                    <p class="text-xs text-muted-foreground">Quản lý trạng thái (Active, Inactive)</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Date Scheduling</h5>
                    <p class="text-xs text-muted-foreground">Lên lịch thông báo với start_at/end_at</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Menu Management -->
            <div>
              <h4 class="font-semibold mb-3 flex items-center gap-2">
                <Menu class="w-4 h-4" />
                Quản lý Menu & Navigation
              </h4>
              <div class="grid gap-3 md:grid-cols-2">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Dynamic Menu</h5>
                    <p class="text-xs text-muted-foreground">Quản lý menu động từ database</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Menu Hierarchy</h5>
                    <p class="text-xs text-muted-foreground">Hỗ trợ menu đa cấp</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Icon Management</h5>
                    <p class="text-xs text-muted-foreground">Quản lý icon cho menu</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- System Settings -->
            <div>
              <h4 class="font-semibold mb-3 flex items-center gap-2">
                <Settings class="w-4 h-4" />
                Cài đặt Hệ thống
              </h4>
              <div class="grid gap-3 md:grid-cols-2">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">System Settings</h5>
                    <p class="text-xs text-muted-foreground">Cấu hình các tham số hệ thống</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Security Settings</h5>
                    <p class="text-xs text-muted-foreground">Cài đặt bảo mật (2FA, Password)</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- UI/UX Features -->
            <div>
              <h4 class="font-semibold mb-3 flex items-center gap-2">
                <Zap class="w-4 h-4" />
                UI/UX Features
              </h4>
              <div class="grid gap-3 md:grid-cols-2">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Dark/Light Mode</h5>
                    <p class="text-xs text-muted-foreground">Hỗ trợ chuyển đổi theme</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Responsive Design</h5>
                    <p class="text-xs text-muted-foreground">Tối ưu cho desktop và mobile</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Error Handling</h5>
                    <p class="text-xs text-muted-foreground">Xử lý lỗi toàn diện với ErrorBoundary</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Loading States</h5>
                    <p class="text-xs text-muted-foreground">Trạng thái loading cho tất cả operations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Technology Stack -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Wrench class="w-5 h-5" />
            Công nghệ sử dụng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div class="p-4 border rounded-lg">
              <h4 class="font-semibold mb-2">Framework</h4>
              <p class="text-sm text-muted-foreground">Nuxt 3</p>
            </div>
            <div class="p-4 border rounded-lg">
              <h4 class="font-semibold mb-2">UI Library</h4>
              <p class="text-sm text-muted-foreground">shadcn-vue với Radix Vue</p>
            </div>
            <div class="p-4 border rounded-lg">
              <h4 class="font-semibold mb-2">Styling</h4>
              <p class="text-sm text-muted-foreground">Tailwind CSS</p>
            </div>
            <div class="p-4 border rounded-lg">
              <h4 class="font-semibold mb-2">Icons</h4>
              <p class="text-sm text-muted-foreground">Lucide Vue Next</p>
            </div>
            <div class="p-4 border rounded-lg">
              <h4 class="font-semibold mb-2">Language</h4>
              <p class="text-sm text-muted-foreground">TypeScript</p>
            </div>
            <div class="p-4 border rounded-lg">
              <h4 class="font-semibold mb-2">Database</h4>
              <p class="text-sm text-muted-foreground">JSON Files</p>
            </div>
            <div class="p-4 border rounded-lg">
              <h4 class="font-semibold mb-2">API</h4>
              <p class="text-sm text-muted-foreground">Custom API Routes + JSON Files</p>
            </div>
            <div class="p-4 border rounded-lg">
              <h4 class="font-semibold mb-2">Authentication</h4>
              <p class="text-sm text-muted-foreground">Custom Auth</p>
            </div>
            <div class="p-4 border rounded-lg">
              <h4 class="font-semibold mb-2">Charts</h4>
              <p class="text-sm text-muted-foreground">Chart.js với Vue-ChartJS</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Project Structure -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <FolderTree class="w-5 h-5" />
            Cấu trúc project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="bg-muted/50 p-4 rounded-lg">
            <pre class="text-sm overflow-x-auto"><code>nuxtjs-hni-dash-ops/
├── assets/css/main.css                    # Tailwind CSS và custom styles
├── components/
│   ├── ui/                               # shadcn-vue components
│   ├── charts/                           # Chart components
│   ├── Header.vue                        # Header component
│   ├── Sidebar.vue                       # Sidebar component
│   ├── PageHeader.vue                    # Page header component
│   └── ErrorBoundary.vue                 # Error boundary component
├── composables/                          # Vue composables
│   ├── useAPI.ts                         # API client
│   ├── useSystemNotifications.ts         # System notifications logic
│   ├── useErrorHandler.ts                # Error handling
│   ├── useIcons.ts                       # Icon management
│   └── ...
├── layouts/default.vue                   # Layout chính
├── pages/
│   ├── main/
│   │   ├── dashboard.vue                 # Trang dashboard
│   │   └── about.vue                    # Trang giới thiệu
│   ├── admin/
│   │   ├── users.vue                    # Quản lý người dùng
│   │   ├── menus.vue                    # Quản lý menu
│   │   └── system-notifications.vue     # Quản lý thông báo hệ thống
│   ├── system/
│   │   ├── reports.vue                  # Báo cáo & thống kê
│   │   └── settings.vue                 # Cài đặt hệ thống
│   └── index.vue                        # Trang chủ (redirect)
├── server/
│   └── api/
│       ├── menus/                       # API endpoints cho menu
│       └── system-notifications/        # API endpoints cho thông báo
├── plugins/
│   ├── api.client.ts                    # API client plugin
│   └── suppress-warnings.client.ts      # Suppress warnings plugin
├── lib/utils.ts                         # Utility functions
├── nuxt.config.ts                       # Cấu hình Nuxt
└── tailwind.config.js                   # Cấu hình Tailwind</code></pre>
          </div>
        </CardContent>
      </Card>

      <!-- Database & API -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Database class="w-5 h-5" />
            Database & API
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-6">
            <!-- JSON Files -->
            <div>
              <h4 class="font-semibold mb-3">JSON Files</h4>
              <div class="space-y-2">
                <div class="flex items-start gap-2">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Database</h5>
                    <p class="text-xs text-muted-foreground">Dữ liệu lưu trữ trong file JSON</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Bảng chính</h5>
                    <p class="text-xs text-muted-foreground">demo-menus.ts, demo-users.ts - quản lý menu và người dùng</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Real-time</h5>
                    <p class="text-xs text-muted-foreground">Truy cập nhanh không cần database</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Row Level Security</h5>
                    <p class="text-xs text-muted-foreground">Dễ dàng quản lý và chỉnh sửa</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Custom API Routes -->
            <div>
              <h4 class="font-semibold mb-3">Custom API Routes</h4>
              <div class="space-y-2">
                <div class="flex items-start gap-2">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Auto-generated</h5>
                    <p class="text-xs text-muted-foreground">API endpoints tùy chỉnh cho từng chức năng</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">CRUD Operations</h5>
                    <p class="text-xs text-muted-foreground">Đầy đủ các thao tác Create, Read, Update, Delete</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 class="font-medium text-sm">Authentication</h5>
                    <p class="text-xs text-muted-foreground">Tích hợp sẵn với hệ thống xác thực</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- API Endpoints -->
            <div>
              <h4 class="font-semibold mb-3">API Endpoints</h4>
              <div class="space-y-4">
                <div>
                  <h5 class="font-medium text-sm mb-2">Menu Management:</h5>
                  <div class="bg-muted/50 p-3 rounded-lg">
                    <pre class="text-xs overflow-x-auto"><code>GET    /api/menus           # Lấy danh sách menu
POST   /api/menus           # Tạo menu mới
GET    /api/menus/[id]      # Lấy menu theo ID
PUT    /api/menus/[id]      # Cập nhật menu
DELETE /api/menus/[id]      # Xóa menu</code></pre>
                  </div>
                </div>
                <div>
                  <h5 class="font-medium text-sm mb-2">System Notifications:</h5>
                  <div class="bg-muted/50 p-3 rounded-lg">
                    <pre class="text-xs overflow-x-auto"><code>GET    /api/system-notifications           # Lấy danh sách thông báo
POST   /api/system-notifications           # Tạo thông báo mới
GET    /api/system-notifications/[id]      # Lấy thông báo theo ID
PUT    /api/system-notifications/[id]      # Cập nhật thông báo
DELETE /api/system-notifications/[id]      # Xóa thông báo</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- System Notifications -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Bell class="w-5 h-5" />
            Quản lý Thông báo Hệ thống
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-6">
            <!-- Notification Overview -->
            <div>
              <h4 class="font-semibold mb-3">Tổng quan thông báo</h4>
              <p class="text-sm text-muted-foreground mb-4">
                Hệ thống quản lý thông báo toàn diện với khả năng tạo, lên lịch và quản lý các thông báo hệ thống.
              </p>
            </div>

            <!-- Notification Types -->
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-3">
                <h4 class="font-semibold">Loại thông báo</h4>
                <div class="space-y-2">
                  <div class="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                    <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span class="text-sm">Info - Thông tin</span>
                  </div>
                  <div class="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                    <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span class="text-sm">Warning - Cảnh báo</span>
                  </div>
                  <div class="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/20 rounded">
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span class="text-sm">Error - Lỗi</span>
                  </div>
                  <div class="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span class="text-sm">Success - Thành công</span>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <h4 class="font-semibold">Trạng thái</h4>
                <div class="space-y-2">
                  <div class="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span class="text-sm">Active - Hoạt động</span>
                  </div>
                  <div class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-950/20 rounded">
                    <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span class="text-sm">Inactive - Tạm dừng</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notification Features -->
            <div class="space-y-4">
              <h4 class="font-semibold">Tính năng thông báo</h4>
              <div class="grid gap-4 md:grid-cols-2">
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">CRUD Operations</h5>
                      <p class="text-xs text-muted-foreground">Tạo, đọc, cập nhật, xóa thông báo</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Date Scheduling</h5>
                      <p class="text-xs text-muted-foreground">Lên lịch thông báo với start_at/end_at</p>
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Filter & Search</h5>
                      <p class="text-xs text-muted-foreground">Tìm kiếm theo tiêu đề, nội dung, loại, trạng thái</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Status Management</h5>
                      <p class="text-xs text-muted-foreground">Quản lý trạng thái hoạt động</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Database Schema -->
            <div class="space-y-4">
              <h4 class="font-semibold">Database Schema</h4>
              <div class="bg-muted/50 p-4 rounded-lg">
                <pre class="text-xs overflow-x-auto"><code>CREATE TABLE system_notifications (
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
);</code></pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Menu Structure -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Menu class="w-5 h-5" />
            Cấu trúc menu hệ thống
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-6">
            <!-- Menu Overview -->
            <div>
              <h4 class="font-semibold mb-3">Tổng quan menu</h4>
              <p class="text-sm text-muted-foreground mb-4">
                Hệ thống sử dụng cấu trúc menu đa cấp (4 cấp) với sidebar có thể thu gọn và mở rộng.
              </p>
            </div>

            <!-- Menu Levels -->
            <div class="grid gap-6 md:grid-cols-2">
              <div class="space-y-4">
                <h4 class="font-semibold">Cấp 1 - Menu chính</h4>
                <div class="space-y-2">
                  <div class="flex items-center gap-2 p-2 bg-muted/30 rounded">
                    <LayoutDashboard class="w-4 h-4" />
                    <span class="text-sm">Dashboard</span>
                  </div>
                  <div class="flex items-center gap-2 p-2 bg-muted/30 rounded">
                    <Users class="w-4 h-4" />
                    <span class="text-sm">Quản lý</span>
                  </div>
                  <div class="flex items-center gap-2 p-2 bg-muted/30 rounded">
                    <BarChart3 class="w-4 h-4" />
                    <span class="text-sm">Báo cáo</span>
                  </div>
                  <div class="flex items-center gap-2 p-2 bg-muted/30 rounded">
                    <Settings class="w-4 h-4" />
                    <span class="text-sm">Hệ thống</span>
                  </div>
                  <div class="flex items-center gap-2 p-2 bg-muted/30 rounded">
                    <Info class="w-4 h-4" />
                    <span class="text-sm">Giới thiệu</span>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <h4 class="font-semibold">Cấp 2 - Submenu</h4>
                <div class="space-y-2">
                  <div class="ml-4 p-2 bg-muted/20 rounded">
                    <span class="text-sm">Người dùng</span>
                  </div>
                  <div class="ml-4 p-2 bg-muted/20 rounded">
                    <span class="text-sm">Tổ chức</span>
                  </div>
                  <div class="ml-4 p-2 bg-muted/20 rounded">
                    <span class="text-sm">Phân quyền</span>
                  </div>
                  <div class="ml-4 p-2 bg-muted/20 rounded">
                    <span class="text-sm">Báo cáo tổng quan</span>
                  </div>
                  <div class="ml-4 p-2 bg-muted/20 rounded">
                    <span class="text-sm">Thống kê</span>
                  </div>
                  <div class="ml-4 p-2 bg-muted/20 rounded">
                    <span class="text-sm">Dữ liệu</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Menu Features -->
            <div class="space-y-4">
              <h4 class="font-semibold">Tính năng menu</h4>
              <div class="grid gap-4 md:grid-cols-2">
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Thu gọn/Mở rộng</h5>
                      <p class="text-xs text-muted-foreground">Sidebar có thể thu gọn để tiết kiệm không gian</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Mặc định mở cấp 2</h5>
                      <p class="text-xs text-muted-foreground">Các menu chính mặc định mở sẵn submenu</p>
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Tooltip khi thu gọn</h5>
                      <p class="text-xs text-muted-foreground">Hiển thị tên menu khi hover vào icon</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Highlight thông minh</h5>
                      <p class="text-xs text-muted-foreground">Chỉ highlight menu đang active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Menu Structure Visual -->
            <div class="space-y-4">
              <h4 class="font-semibold">Cấu trúc menu chi tiết</h4>
              <div class="bg-muted/50 p-4 rounded-lg">
                <pre class="text-xs overflow-x-auto"><code>📊 Dashboard
📋 Giới thiệu
👥 Quản lý
  ├── 👤 Người dùng
  │   ├── ✅ Danh sách
  │   ├── ➕ Thêm mới
  │   └── ➖ Vô hiệu hóa
  ├── 🏢 Tổ chức
  │   ├── 🏢 Phòng ban
  │   └── 👤 Chức vụ
  └── 🛡️ Phân quyền
📈 Báo cáo
  ├── 📄 Báo cáo tổng quan
  │   ├── 📊 Hàng ngày
  │   ├── 🥧 Hàng tuần
  │   └── 📈 Hàng tháng
  ├── 📈 Thống kê
  └── 💾 Dữ liệu
    ├── 💾 Xuất dữ liệu
    └── 📥 Nhập dữ liệu
⚙️ Hệ thống
  ├── ⚙️ Cài đặt
  │   ├── 🔧 Cài đặt chung
  │   └── ⚙️ Cài đặt nâng cao
  ├── 🛡️ Bảo mật
  │   ├── 🔑 Mật khẩu
  │   ├── 🔒 Xác thực
  │   └── ⚠️ Cảnh báo
  └── 🔔 Thông báo</code></pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Error Handling & Performance -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Shield class="w-5 h-5" />
            Error Handling & Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-6">
            <!-- Error Handling -->
            <div>
              <h4 class="font-semibold mb-3">Error Handling</h4>
              <div class="grid gap-4 md:grid-cols-2">
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">ErrorBoundary Component</h5>
                      <p class="text-xs text-muted-foreground">Bắt và hiển thị lỗi gracefully</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">useErrorHandler Composable</h5>
                      <p class="text-xs text-muted-foreground">Xử lý lỗi tập trung</p>
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">API Error Handling</h5>
                      <p class="text-xs text-muted-foreground">Xử lý lỗi API với try-catch</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Form Validation</h5>
                      <p class="text-xs text-muted-foreground">Validation đầy đủ cho tất cả forms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Performance Optimizations -->
            <div>
              <h4 class="font-semibold mb-3">Performance Optimizations</h4>
              <div class="grid gap-4 md:grid-cols-2">
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Lazy Loading</h5>
                      <p class="text-xs text-muted-foreground">Sử dụng useLazyComponent cho components lớn</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Code Splitting</h5>
                      <p class="text-xs text-muted-foreground">Tự động split code theo routes</p>
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Caching</h5>
                      <p class="text-xs text-muted-foreground">Cache API responses và static assets</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Bundle Optimization</h5>
                      <p class="text-xs text-muted-foreground">Tối ưu bundle size</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Security Features -->
            <div>
              <h4 class="font-semibold mb-3">Security Features</h4>
              <div class="grid gap-4 md:grid-cols-2">
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Row Level Security</h5>
                      <p class="text-xs text-muted-foreground">Bảo mật dữ liệu với Row Level Security</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Input Validation</h5>
                      <p class="text-xs text-muted-foreground">Validation tất cả inputs</p>
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">XSS Protection</h5>
                      <p class="text-xs text-muted-foreground">Bảo vệ khỏi XSS attacks</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-medium text-sm">Environment Variables</h5>
                      <p class="text-xs text-muted-foreground">Bảo mật sensitive data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Contact Info -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Mail class="w-5 h-5" />
            Thông tin liên hệ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Mail class="w-4 h-4 text-muted-foreground" />
              <span class="text-sm">Email: khuongnv@live.com</span>
            </div>
            <div class="flex items-center gap-3">
              <Copyright class="w-4 h-4 text-muted-foreground" />
              <span class="text-sm">© 2024 KhuongNV. All rights reserved.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Info, 
  Zap, 
  Wrench, 
  FolderTree, 
  Mail, 
  Copyright,
  Menu,
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Github,
  Database,
  Bell,
  Shield
} from 'lucide-vue-next'

// Import UI components
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardContent from '~/components/ui/CardContent.vue'

// Set page title
useHead({
  title: 'Giới thiệu - HNI Dashboard'
})
</script>
