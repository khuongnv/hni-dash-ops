export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { user, ssoUser } = body
    
    if (!user || !ssoUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User and SSO user data are required'
      })
    }
    
    // Mock SSO user data - luôn trả về thành công
    const mockSSOUser = {
      id: 1,
      username: ssoUser.userName || 'khuongnv',
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
      gender: { name: 'Nam' },
      ssoSession: true,
      ssoSessionId: ssoUser.sessionId || 'mock-session-123',
      lastLogin: new Date().toISOString()
    }
    
    return {
      success: true,
      user: mockSSOUser
    }
    
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `SSO login error: ${error.message}`
    })
  }
})
