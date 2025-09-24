export interface SystemNotification {
  id: number
  title: string
  content: string
  type: string
  priority: string
  is_read: boolean
  created_at: string
  updated_at: string
  expires_at?: string
  user_id?: number
}

export const demoSystemNotifications: SystemNotification[] = [
  {
    id: 1,
    title: 'Hệ thống bảo trì định kỳ',
    content: 'Hệ thống sẽ được bảo trì từ 02:00 - 04:00 ngày mai. Vui lòng lưu công việc trước thời gian này.',
    type: 'maintenance',
    priority: 'high',
    is_read: false,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    expires_at: '2024-01-16T04:00:00Z'
  },
  {
    id: 2,
    title: 'Cập nhật bảo mật mới',
    content: 'Phiên bản bảo mật mới đã được cài đặt. Vui lòng đăng nhập lại để áp dụng các cải tiến.',
    type: 'security',
    priority: 'high',
    is_read: false,
    created_at: '2024-01-14T14:30:00Z',
    updated_at: '2024-01-14T14:30:00Z'
  },
  {
    id: 3,
    title: 'Thông báo nghỉ lễ',
    content: 'Công ty sẽ nghỉ lễ Tết Nguyên Đán từ 08/02/2024 đến 16/02/2024. Chúc mọi người năm mới vui vẻ!',
    type: 'holiday',
    priority: 'medium',
    is_read: true,
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z'
  },
  {
    id: 4,
    title: 'Họp phòng ban tuần tới',
    content: 'Cuộc họp phòng ban sẽ diễn ra vào thứ 2 tuần tới lúc 9:00 sáng tại phòng họp A.',
    type: 'meeting',
    priority: 'medium',
    is_read: false,
    created_at: '2024-01-12T16:00:00Z',
    updated_at: '2024-01-12T16:00:00Z'
  },
  {
    id: 5,
    title: 'Cập nhật chính sách công ty',
    content: 'Chính sách mới về làm việc từ xa đã được cập nhật. Vui lòng xem chi tiết trong tài liệu đính kèm.',
    type: 'policy',
    priority: 'medium',
    is_read: false,
    created_at: '2024-01-11T11:15:00Z',
    updated_at: '2024-01-11T11:15:00Z'
  },
  {
    id: 6,
    title: 'Khóa đào tạo mới',
    content: 'Khóa đào tạo "Kỹ năng lãnh đạo" sẽ bắt đầu vào tuần tới. Đăng ký tại phòng HR.',
    type: 'training',
    priority: 'low',
    is_read: true,
    created_at: '2024-01-09T13:45:00Z',
    updated_at: '2024-01-09T13:45:00Z'
  },
  {
    id: 7,
    title: 'Cảnh báo bảo mật',
    content: 'Phát hiện hoạt động đăng nhập bất thường từ IP lạ. Vui lòng kiểm tra và thay đổi mật khẩu nếu cần.',
    type: 'security',
    priority: 'high',
    is_read: false,
    created_at: '2024-01-13T08:30:00Z',
    updated_at: '2024-01-13T08:30:00Z'
  },
  {
    id: 8,
    title: 'Cập nhật phần mềm',
    content: 'Phiên bản mới của ứng dụng đã sẵn sàng. Cập nhật để trải nghiệm các tính năng mới.',
    type: 'update',
    priority: 'medium',
    is_read: false,
    created_at: '2024-01-08T15:20:00Z',
    updated_at: '2024-01-08T15:20:00Z'
  },
  {
    id: 9,
    title: 'Thông báo lương tháng 1',
    content: 'Lương tháng 1/2024 đã được chuyển vào tài khoản. Vui lòng kiểm tra và xác nhận.',
    type: 'salary',
    priority: 'medium',
    is_read: true,
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z'
  },
  {
    id: 10,
    title: 'Họp đánh giá hiệu suất',
    content: 'Cuộc họp đánh giá hiệu suất quý 1 sẽ diễn ra vào cuối tháng. Chuẩn bị báo cáo cá nhân.',
    type: 'performance',
    priority: 'medium',
    is_read: false,
    created_at: '2024-01-07T14:00:00Z',
    updated_at: '2024-01-07T14:00:00Z'
  },
  {
    id: 11,
    title: 'Sự kiện team building',
    content: 'Hoạt động team building sẽ được tổ chức vào cuối tuần này tại resort ABC. Đăng ký tham gia.',
    type: 'event',
    priority: 'low',
    is_read: true,
    created_at: '2024-01-06T12:30:00Z',
    updated_at: '2024-01-06T12:30:00Z'
  },
  {
    id: 12,
    title: 'Cảnh báo hết hạn hợp đồng',
    content: 'Hợp đồng lao động của bạn sẽ hết hạn trong 30 ngày tới. Liên hệ HR để gia hạn.',
    type: 'contract',
    priority: 'high',
    is_read: false,
    created_at: '2024-01-04T09:15:00Z',
    updated_at: '2024-01-04T09:15:00Z'
  },
  {
    id: 13,
    title: 'Thông báo nghỉ phép',
    content: 'Đơn nghỉ phép của bạn đã được phê duyệt. Nghỉ từ 20/01 đến 25/01/2024.',
    type: 'leave',
    priority: 'low',
    is_read: true,
    created_at: '2024-01-03T16:45:00Z',
    updated_at: '2024-01-03T16:45:00Z'
  },
  {
    id: 14,
    title: 'Cập nhật quy trình làm việc',
    content: 'Quy trình làm việc mới đã được cập nhật. Vui lòng đọc và tuân thủ theo quy trình mới.',
    type: 'process',
    priority: 'medium',
    is_read: false,
    created_at: '2024-01-02T11:00:00Z',
    updated_at: '2024-01-02T11:00:00Z'
  },
  {
    id: 15,
    title: 'Thông báo tăng lương',
    content: 'Chúc mừng! Bạn đã được tăng lương 10% từ tháng này. Chi tiết trong bảng lương.',
    type: 'salary',
    priority: 'high',
    is_read: true,
    created_at: '2024-01-01T08:00:00Z',
    updated_at: '2024-01-01T08:00:00Z'
  },
  {
    id: 16,
    title: 'Khóa học online miễn phí',
    content: 'Công ty cung cấp khóa học online miễn phí về kỹ năng mềm. Đăng ký tại portal học tập.',
    type: 'training',
    priority: 'low',
    is_read: false,
    created_at: '2023-12-28T14:30:00Z',
    updated_at: '2023-12-28T14:30:00Z'
  },
  {
    id: 17,
    title: 'Cảnh báo thời tiết',
    content: 'Dự báo có bão mạnh trong 2 ngày tới. Làm việc từ xa nếu cần thiết.',
    type: 'weather',
    priority: 'medium',
    is_read: false,
    created_at: '2023-12-27T07:00:00Z',
    updated_at: '2023-12-27T07:00:00Z'
  },
  {
    id: 18,
    title: 'Thông báo nghỉ lễ Giáng sinh',
    content: 'Công ty nghỉ lễ Giáng sinh từ 24/12 đến 26/12. Chúc mọi người lễ vui vẻ!',
    type: 'holiday',
    priority: 'medium',
    is_read: true,
    created_at: '2023-12-20T10:00:00Z',
    updated_at: '2023-12-20T10:00:00Z'
  },
  {
    id: 19,
    title: 'Cập nhật thông tin cá nhân',
    content: 'Vui lòng cập nhật thông tin cá nhân trong hệ thống. Kiểm tra và sửa đổi nếu cần.',
    type: 'profile',
    priority: 'low',
    is_read: false,
    created_at: '2023-12-18T15:30:00Z',
    updated_at: '2023-12-18T15:30:00Z'
  },
  {
    id: 20,
    title: 'Họp tổng kết năm',
    content: 'Cuộc họp tổng kết năm 2023 sẽ diễn ra vào 29/12. Chuẩn bị báo cáo cá nhân.',
    type: 'meeting',
    priority: 'high',
    is_read: true,
    created_at: '2023-12-15T09:00:00Z',
    updated_at: '2023-12-15T09:00:00Z'
  },
  {
    id: 21,
    title: 'Thông báo bonus cuối năm',
    content: 'Bonus cuối năm đã được tính toán và sẽ được chi trả vào cuối tháng 12.',
    type: 'bonus',
    priority: 'high',
    is_read: true,
    created_at: '2023-12-10T11:00:00Z',
    updated_at: '2023-12-10T11:00:00Z'
  },
  {
    id: 22,
    title: 'Cập nhật chính sách bảo hiểm',
    content: 'Chính sách bảo hiểm y tế đã được cập nhật. Thẻ bảo hiểm mới sẽ được gửi qua bưu điện.',
    type: 'insurance',
    priority: 'medium',
    is_read: false,
    created_at: '2023-12-08T13:45:00Z',
    updated_at: '2023-12-08T13:45:00Z'
  },
  {
    id: 23,
    title: 'Thông báo nghỉ lễ Tết Dương lịch',
    content: 'Công ty nghỉ lễ Tết Dương lịch từ 30/12/2023 đến 01/01/2024. Chúc năm mới hạnh phúc!',
    type: 'holiday',
    priority: 'medium',
    is_read: true,
    created_at: '2023-12-05T16:00:00Z',
    updated_at: '2023-12-05T16:00:00Z'
  },
  {
    id: 24,
    title: 'Cảnh báo hết hạn chứng chỉ',
    content: 'Chứng chỉ chuyên môn của bạn sẽ hết hạn trong 60 ngày. Đăng ký thi lại sớm.',
    type: 'certificate',
    priority: 'high',
    is_read: false,
    created_at: '2023-12-03T10:30:00Z',
    updated_at: '2023-12-03T10:30:00Z'
  },
  {
    id: 25,
    title: 'Thông báo thay đổi giờ làm việc',
    content: 'Từ tháng 1/2024, giờ làm việc sẽ thay đổi từ 8:00-17:00 thành 9:00-18:00.',
    type: 'schedule',
    priority: 'medium',
    is_read: true,
    created_at: '2023-11-30T14:15:00Z',
    updated_at: '2023-11-30T14:15:00Z'
  },
  {
    id: 26,
    title: 'Khóa học kỹ năng mới',
    content: 'Khóa học "Kỹ năng thuyết trình" sẽ bắt đầu vào tháng 1. Đăng ký tại phòng đào tạo.',
    type: 'training',
    priority: 'low',
    is_read: false,
    created_at: '2023-11-28T12:00:00Z',
    updated_at: '2023-11-28T12:00:00Z'
  },
  {
    id: 27,
    title: 'Thông báo nghỉ lễ Quốc khánh',
    content: 'Công ty nghỉ lễ Quốc khánh 2/9 từ 01/09 đến 03/09. Chúc mọi người lễ vui vẻ!',
    type: 'holiday',
    priority: 'medium',
    is_read: true,
    created_at: '2023-08-25T09:00:00Z',
    updated_at: '2023-08-25T09:00:00Z'
  },
  {
    id: 28,
    title: 'Cập nhật hệ thống email',
    content: 'Hệ thống email mới đã được triển khai. Vui lòng đăng nhập lại để sử dụng tính năng mới.',
    type: 'system',
    priority: 'medium',
    is_read: false,
    created_at: '2023-08-20T15:30:00Z',
    updated_at: '2023-08-20T15:30:00Z'
  },
  {
    id: 29,
    title: 'Thông báo nghỉ lễ 30/4',
    content: 'Công ty nghỉ lễ 30/4 và 1/5 từ 29/04 đến 02/05. Chúc mọi người lễ vui vẻ!',
    type: 'holiday',
    priority: 'medium',
    is_read: true,
    created_at: '2023-04-20T10:00:00Z',
    updated_at: '2023-04-20T10:00:00Z'
  },
  {
    id: 30,
    title: 'Cảnh báo bảo mật tài khoản',
    content: 'Tài khoản của bạn có hoạt động đăng nhập từ thiết bị mới. Nếu không phải bạn, hãy thay đổi mật khẩu ngay.',
    type: 'security',
    priority: 'high',
    is_read: false,
    created_at: '2023-04-15T08:45:00Z',
    updated_at: '2023-04-15T08:45:00Z'
  }
]
