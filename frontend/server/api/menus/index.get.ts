export default defineEventHandler(async (event) => {
  try {
    // Mock menu data - chỉ giữ lại các menu có file Vue tương ứng
    const mockMenus = [
      // Cấp 1 - Menu chính
      {
        id: 1,
        name: 'Dashboard',
        path: '/main/dashboard',
        icon: 'LayoutDashboard',
        level: 1,
        parent_id: null,
        order: 1,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Giới thiệu',
        path: '/main/about',
        icon: 'Info',
        level: 1,
        parent_id: null,
        order: 2,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 3,
        name: 'Quản lý',
        path: '#',
        icon: 'Users',
        level: 1,
        parent_id: null,
        order: 3,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 4,
        name: 'Báo cáo',
        path: '#',
        icon: 'BarChart3',
        level: 1,
        parent_id: null,
        order: 4,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 5,
        name: 'Hệ thống',
        path: '#',
        icon: 'Settings',
        level: 1,
        parent_id: null,
        order: 5,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      
      // Cấp 2 - Menu con của Quản lý
      {
        id: 6,
        name: 'Người dùng',
        path: '/admin/users',
        icon: 'User',
        level: 2,
        parent_id: 3,
        order: 1,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 7,
        name: 'Menu',
        path: '/admin/menus',
        icon: 'Menu',
        level: 2,
        parent_id: 3,
        order: 2,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 8,
        name: 'Thông báo',
        path: '/admin/system-notifications',
        icon: 'Bell',
        level: 2,
        parent_id: 3,
        order: 3,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 9,
        name: 'Phòng ban',
        path: '/admin/departments',
        icon: 'Building',
        level: 2,
        parent_id: 3,
        order: 4,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 10,
        name: 'Danh mục',
        path: '/admin/categories',
        icon: 'Tag',
        level: 2,
        parent_id: 3,
        order: 5,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      
      // Cấp 2 - Menu con của Báo cáo
      {
        id: 11,
        name: 'Báo cáo tổng quan',
        path: '/system/reports',
        icon: 'FileText',
        level: 2,
        parent_id: 4,
        order: 1,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      
      // Cấp 2 - Menu con của Hệ thống
      {
        id: 12,
        name: 'Cài đặt',
        path: '/system/settings',
        icon: 'Settings',
        level: 2,
        parent_id: 5,
        order: 1,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      
      // Cấp 3 - Menu con của Báo cáo tổng quan
      {
        id: 13,
        name: 'Báo cáo doanh thu',
        path: '/system/reports/revenue',
        icon: 'DollarSign',
        level: 3,
        parent_id: 11,
        order: 1,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 14,
        name: 'Báo cáo người dùng',
        path: '/system/reports/users',
        icon: 'Users',
        level: 3,
        parent_id: 11,
        order: 2,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      
      // Cấp 3 - Menu con của Cài đặt
      {
        id: 15,
        name: 'Cài đặt chung',
        path: '/system/settings/general',
        icon: 'Settings',
        level: 3,
        parent_id: 12,
        order: 1,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 16,
        name: 'Bảo mật',
        path: '/system/settings/security',
        icon: 'Shield',
        level: 3,
        parent_id: 12,
        order: 2,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      
      // Cấp 4 - Menu con của Bảo mật
      {
        id: 17,
        name: 'Xác thực 2FA',
        path: '/system/settings/security/2fa',
        icon: 'Shield',
        level: 4,
        parent_id: 16,
        order: 1,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 18,
        name: 'Mật khẩu',
        path: '/system/settings/security/password',
        icon: 'Key',
        level: 4,
        parent_id: 16,
        order: 2,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ]
    
    return {
      success: true,
      data: mockMenus
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Lỗi khi đọc dữ liệu menu'
    })
  }
})