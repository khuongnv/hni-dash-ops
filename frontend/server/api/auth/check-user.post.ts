export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username } = body
    
    if (!username) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username is required'
      })
    }
    
    // Mock user data - luôn trả về user tồn tại
    const mockUser = {
      id: 1,
      username: username,
      full_name: 'Nguyễn Văn Khương',
      email: 'khuongnv@live.com',
      status: 'active',
      department_id: 1,
      role_id: 1,
      position_id: 1,
      gender_id: 1,
      dob: '1990-01-01',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      department: { name: 'IT Department' },
      role: { name: 'Admin' },
      position: { name: 'Developer' },
      gender: { name: 'Nam' }
    }
    
    return {
      success: true,
      user: mockUser
    }
    
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Check user error: ${error.message}`
    })
  }
})
