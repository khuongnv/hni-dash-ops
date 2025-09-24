export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username, password } = body

    // Validation
    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Vui lòng nhập đầy đủ thông tin'
      })
    }

    // Mock user data - không cần kiểm tra thực tế
    const mockUser = {
      id: 1,
      full_name: 'Nguyễn Văn Khương',
      username: username,
      email: 'khuongnv@live.com',
      department_id: 1,
      role_id: 1,
      position_id: 1,
      gender_id: 1,
      dob: '1990-01-01',
      status: 'active',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      department: { name: 'IT Department' },
      role: { name: 'Admin' },
      position: { name: 'Developer' },
      gender: { name: 'Nam' }
    }

    // Luôn trả về thành công với dữ liệu ảo
    return {
      success: true,
      user: mockUser,
      message: 'Đăng nhập thành công'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Có lỗi xảy ra khi đăng nhập'
    })
  }
})
