export interface Menu {
  id: number
  name: string
  path: string
  icon: string
  parent_id: number | null
  order: number
  is_active: boolean
  is_public: boolean
  created_at: string
  updated_at: string
}

export const demoMenus: Menu[] = [
  // Cấp 1 - Menu chính (chỉ giữ lại các menu có file Vue)
  {
    id: 1,
    name: 'Dashboard',
    path: '/main/dashboard',
    icon: 'LayoutDashboard',
    parent_id: null,
    order: 1,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Giới thiệu',
    path: '/main/about',
    icon: 'Info',
    parent_id: null,
    order: 2,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Quản lý',
    path: '#',
    icon: 'Users',
    parent_id: null,
    order: 3,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Báo cáo',
    path: '#',
    icon: 'BarChart3',
    parent_id: null,
    order: 4,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Hệ thống',
    path: '#',
    icon: 'Settings',
    parent_id: null,
    order: 5,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 2 - Menu con của Quản lý
  {
    id: 6,
    name: 'Người dùng',
    path: '/admin/users',
    icon: 'User',
    parent_id: 3,
    order: 1,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 7,
    name: 'Menu',
    path: '/admin/menus',
    icon: 'Menu',
    parent_id: 3,
    order: 2,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 8,
    name: 'Thông báo',
    path: '/admin/system-notifications',
    icon: 'Bell',
    parent_id: 3,
    order: 3,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 9,
    name: 'Phòng ban',
    path: '/admin/departments',
    icon: 'Building',
    parent_id: 3,
    order: 4,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 10,
    name: 'Danh mục',
    path: '/admin/categories',
    icon: 'Tag',
    parent_id: 3,
    order: 5,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 11,
    name: 'Git Log',
    path: '/admin/git-log',
    icon: 'CodeBracket',
    parent_id: 3,
    order: 6,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 2 - Menu con của Báo cáo
  {
    id: 12,
    name: 'Báo cáo tổng quan',
    path: '/system/reports',
    icon: 'FileText',
    parent_id: 4,
    order: 1,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 2 - Menu con của Hệ thống
  {
    id: 13,
    name: 'Cài đặt',
    path: '/system/settings',
    icon: 'Settings',
    parent_id: 5,
    order: 1,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 3 - Menu con của Báo cáo tổng quan
  {
    id: 14,
    name: 'Báo cáo doanh thu',
    path: '/system/reports/revenue',
    icon: 'DollarSign',
    parent_id: 12,
    order: 1,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 15,
    name: 'Báo cáo người dùng',
    path: '/system/reports/users',
    icon: 'Users',
    parent_id: 12,
    order: 2,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 3 - Menu con của Cài đặt
  {
    id: 16,
    name: 'Cài đặt chung',
    path: '/system/settings/general',
    icon: 'Settings',
    parent_id: 13,
    order: 1,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 17,
    name: 'Bảo mật',
    path: '/system/settings/security',
    icon: 'Shield',
    parent_id: 13,
    order: 2,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 4 - Menu con của Bảo mật
  {
    id: 18,
    name: 'Xác thực 2FA',
    path: '/system/settings/security/2fa',
    icon: 'Shield',
    parent_id: 17,
    order: 1,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 19,
    name: 'Mật khẩu',
    path: '/system/settings/security/password',
    icon: 'Key',
    parent_id: 17,
    order: 2,
    is_active: true,
    is_public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]
