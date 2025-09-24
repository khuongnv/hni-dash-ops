import { Category } from '~/composables/useCategories'

export const demoCategories: Category[] = [
  // Danh mục gốc
  {
    id: 1,
    code: 'TECH',
    name: 'Công nghệ thông tin',
    parent_id: null,
    map_id: null,
    note: 'Danh mục chính về công nghệ thông tin',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    code: 'HR',
    name: 'Nhân sự',
    parent_id: null,
    map_id: null,
    note: 'Danh mục quản lý nhân sự',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    code: 'FIN',
    name: 'Tài chính',
    parent_id: null,
    map_id: null,
    note: 'Danh mục tài chính kế toán',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    code: 'MKT',
    name: 'Marketing',
    parent_id: null,
    map_id: null,
    note: 'Danh mục marketing và quảng cáo',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    code: 'OPS',
    name: 'Vận hành',
    parent_id: null,
    map_id: null,
    note: 'Danh mục vận hành và sản xuất',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Sub-categories của Công nghệ thông tin
  {
    id: 6,
    code: 'DEV',
    name: 'Phát triển phần mềm',
    parent_id: 1,
    map_id: null,
    note: 'Lập trình và phát triển ứng dụng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 7,
    code: 'SYS',
    name: 'Hệ thống',
    parent_id: 1,
    map_id: null,
    note: 'Quản trị hệ thống và mạng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 8,
    code: 'DATA',
    name: 'Dữ liệu',
    parent_id: 1,
    map_id: null,
    note: 'Quản lý và phân tích dữ liệu',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 9,
    code: 'SEC',
    name: 'Bảo mật',
    parent_id: 1,
    map_id: null,
    note: 'An ninh mạng và bảo mật thông tin',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Sub-categories của Nhân sự
  {
    id: 10,
    code: 'REC',
    name: 'Tuyển dụng',
    parent_id: 2,
    map_id: null,
    note: 'Tuyển dụng và phỏng vấn',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 11,
    code: 'TRAIN',
    name: 'Đào tạo',
    parent_id: 2,
    map_id: null,
    note: 'Đào tạo và phát triển nhân viên',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 12,
    code: 'PAY',
    name: 'Lương thưởng',
    parent_id: 2,
    map_id: null,
    note: 'Quản lý lương và thưởng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Sub-categories của Tài chính
  {
    id: 13,
    code: 'ACC',
    name: 'Kế toán',
    parent_id: 3,
    map_id: null,
    note: 'Kế toán và báo cáo tài chính',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 14,
    code: 'BUD',
    name: 'Ngân sách',
    parent_id: 3,
    map_id: null,
    note: 'Lập kế hoạch và quản lý ngân sách',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 15,
    code: 'AUD',
    name: 'Kiểm toán',
    parent_id: 3,
    map_id: null,
    note: 'Kiểm toán nội bộ và bên ngoài',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Sub-categories của Marketing
  {
    id: 16,
    code: 'DIG',
    name: 'Marketing số',
    parent_id: 4,
    map_id: null,
    note: 'Marketing online và digital',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 17,
    code: 'BRAND',
    name: 'Thương hiệu',
    parent_id: 4,
    map_id: null,
    note: 'Xây dựng và quản lý thương hiệu',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 18,
    code: 'SALES',
    name: 'Bán hàng',
    parent_id: 4,
    map_id: null,
    note: 'Bán hàng và chăm sóc khách hàng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Sub-categories của Vận hành
  {
    id: 19,
    code: 'PROD',
    name: 'Sản xuất',
    parent_id: 5,
    map_id: null,
    note: 'Sản xuất và chế tạo',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 20,
    code: 'LOG',
    name: 'Logistics',
    parent_id: 5,
    map_id: null,
    note: 'Vận chuyển và logistics',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 21,
    code: 'QUAL',
    name: 'Chất lượng',
    parent_id: 5,
    map_id: null,
    note: 'Quản lý chất lượng sản phẩm',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Sub-categories của Phát triển phần mềm
  {
    id: 22,
    code: 'FRONT',
    name: 'Frontend',
    parent_id: 6,
    map_id: null,
    note: 'Phát triển giao diện người dùng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 23,
    code: 'BACK',
    name: 'Backend',
    parent_id: 6,
    map_id: null,
    note: 'Phát triển phía server',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 24,
    code: 'MOBILE',
    name: 'Mobile',
    parent_id: 6,
    map_id: null,
    note: 'Phát triển ứng dụng di động',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Sub-categories của Hệ thống
  {
    id: 25,
    code: 'NET',
    name: 'Mạng',
    parent_id: 7,
    map_id: null,
    note: 'Quản trị mạng và bảo mật',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 26,
    code: 'SERVER',
    name: 'Server',
    parent_id: 7,
    map_id: null,
    note: 'Quản trị server và hạ tầng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 27,
    code: 'CLOUD',
    name: 'Cloud',
    parent_id: 7,
    map_id: null,
    note: 'Dịch vụ đám mây và container',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Sub-categories của Dữ liệu
  {
    id: 28,
    code: 'DB',
    name: 'Cơ sở dữ liệu',
    parent_id: 8,
    map_id: null,
    note: 'Quản lý cơ sở dữ liệu',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 29,
    code: 'BI',
    name: 'Business Intelligence',
    parent_id: 8,
    map_id: null,
    note: 'Phân tích kinh doanh và báo cáo',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 30,
    code: 'AI',
    name: 'Trí tuệ nhân tạo',
    parent_id: 8,
    map_id: null,
    note: 'Machine Learning và AI',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]
