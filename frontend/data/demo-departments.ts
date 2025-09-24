import { Department } from '~/composables/useDepartments'

export const demoDepartments: Department[] = [
  // Cấp 1 - Công ty
  {
    id: 1,
    code: 'COMPANY',
    name: 'Công ty TNHH VNPT',
    parent_id: null,
    map_id: null,
    level: 1,
    note: 'Công ty mẹ',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 2 - Ban giám đốc
  {
    id: 2,
    code: 'BGD',
    name: 'Ban Giám đốc',
    parent_id: 1,
    map_id: null,
    level: 2,
    note: 'Ban giám đốc điều hành',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    code: 'IT',
    name: 'Phòng Công nghệ thông tin',
    parent_id: 1,
    map_id: null,
    level: 2,
    note: 'Phòng IT chính',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    code: 'HR',
    name: 'Phòng Nhân sự',
    parent_id: 1,
    map_id: null,
    level: 2,
    note: 'Phòng quản lý nhân sự',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    code: 'FIN',
    name: 'Phòng Tài chính',
    parent_id: 1,
    map_id: null,
    level: 2,
    note: 'Phòng tài chính kế toán',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 6,
    code: 'MKT',
    name: 'Phòng Marketing',
    parent_id: 1,
    map_id: null,
    level: 2,
    note: 'Phòng marketing và bán hàng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 7,
    code: 'OPS',
    name: 'Phòng Vận hành',
    parent_id: 1,
    map_id: null,
    level: 2,
    note: 'Phòng vận hành và sản xuất',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 3 - Các bộ phận trong Phòng IT
  {
    id: 8,
    code: 'DEV',
    name: 'Bộ phận Phát triển',
    parent_id: 3,
    map_id: null,
    level: 3,
    note: 'Phát triển phần mềm',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 9,
    code: 'SYS',
    name: 'Bộ phận Hệ thống',
    parent_id: 3,
    map_id: null,
    level: 3,
    note: 'Quản trị hệ thống',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 10,
    code: 'DATA',
    name: 'Bộ phận Dữ liệu',
    parent_id: 3,
    map_id: null,
    level: 3,
    note: 'Quản lý dữ liệu',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 11,
    code: 'SEC',
    name: 'Bộ phận Bảo mật',
    parent_id: 3,
    map_id: null,
    level: 3,
    note: 'An ninh mạng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 3 - Các bộ phận trong Phòng Nhân sự
  {
    id: 12,
    code: 'REC',
    name: 'Bộ phận Tuyển dụng',
    parent_id: 4,
    map_id: null,
    level: 3,
    note: 'Tuyển dụng nhân sự',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 13,
    code: 'TRAIN',
    name: 'Bộ phận Đào tạo',
    parent_id: 4,
    map_id: null,
    level: 3,
    note: 'Đào tạo nhân viên',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 14,
    code: 'PAY',
    name: 'Bộ phận Lương thưởng',
    parent_id: 4,
    map_id: null,
    level: 3,
    note: 'Quản lý lương thưởng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 3 - Các bộ phận trong Phòng Tài chính
  {
    id: 15,
    code: 'ACC',
    name: 'Bộ phận Kế toán',
    parent_id: 5,
    map_id: null,
    level: 3,
    note: 'Kế toán tài chính',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 16,
    code: 'BUD',
    name: 'Bộ phận Ngân sách',
    parent_id: 5,
    map_id: null,
    level: 3,
    note: 'Lập kế hoạch ngân sách',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 17,
    code: 'AUD',
    name: 'Bộ phận Kiểm toán',
    parent_id: 5,
    map_id: null,
    level: 3,
    note: 'Kiểm toán nội bộ',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 3 - Các bộ phận trong Phòng Marketing
  {
    id: 18,
    code: 'DIG',
    name: 'Bộ phận Marketing số',
    parent_id: 6,
    map_id: null,
    level: 3,
    note: 'Marketing online',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 19,
    code: 'BRAND',
    name: 'Bộ phận Thương hiệu',
    parent_id: 6,
    map_id: null,
    level: 3,
    note: 'Xây dựng thương hiệu',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 20,
    code: 'SALES',
    name: 'Bộ phận Bán hàng',
    parent_id: 6,
    map_id: null,
    level: 3,
    note: 'Bán hàng và chăm sóc khách hàng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 3 - Các bộ phận trong Phòng Vận hành
  {
    id: 21,
    code: 'PROD',
    name: 'Bộ phận Sản xuất',
    parent_id: 7,
    map_id: null,
    level: 3,
    note: 'Sản xuất sản phẩm',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 22,
    code: 'LOG',
    name: 'Bộ phận Logistics',
    parent_id: 7,
    map_id: null,
    level: 3,
    note: 'Vận chuyển và logistics',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 23,
    code: 'QUAL',
    name: 'Bộ phận Chất lượng',
    parent_id: 7,
    map_id: null,
    level: 3,
    note: 'Quản lý chất lượng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 4 - Các nhóm trong Bộ phận Phát triển
  {
    id: 24,
    code: 'FRONT',
    name: 'Nhóm Frontend',
    parent_id: 8,
    map_id: null,
    level: 4,
    note: 'Phát triển giao diện',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 25,
    code: 'BACK',
    name: 'Nhóm Backend',
    parent_id: 8,
    map_id: null,
    level: 4,
    note: 'Phát triển backend',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 26,
    code: 'MOBILE',
    name: 'Nhóm Mobile',
    parent_id: 8,
    map_id: null,
    level: 4,
    note: 'Phát triển mobile',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 4 - Các nhóm trong Bộ phận Hệ thống
  {
    id: 27,
    code: 'NET',
    name: 'Nhóm Mạng',
    parent_id: 9,
    map_id: null,
    level: 4,
    note: 'Quản trị mạng',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 28,
    code: 'SERVER',
    name: 'Nhóm Server',
    parent_id: 9,
    map_id: null,
    level: 4,
    note: 'Quản trị server',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 29,
    code: 'CLOUD',
    name: 'Nhóm Cloud',
    parent_id: 9,
    map_id: null,
    level: 4,
    note: 'Dịch vụ đám mây',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Cấp 4 - Các nhóm trong Bộ phận Dữ liệu
  {
    id: 30,
    code: 'DB',
    name: 'Nhóm Database',
    parent_id: 10,
    map_id: null,
    level: 4,
    note: 'Quản lý database',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 31,
    code: 'BI',
    name: 'Nhóm BI',
    parent_id: 10,
    map_id: null,
    level: 4,
    note: 'Business Intelligence',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 32,
    code: 'AI',
    name: 'Nhóm AI',
    parent_id: 10,
    map_id: null,
    level: 4,
    note: 'Trí tuệ nhân tạo',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]
