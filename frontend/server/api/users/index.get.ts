export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const search = query.search as string || ''
    const status = query.status as string || ''

    // Đọc dữ liệu từ file JSON
    const users = await $fetch('/data/demo-users.ts')
    
    let filteredUsers = users

    // Apply search filter
    if (search) {
      filteredUsers = users.filter((user: any) => 
        user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        user.username?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Apply status filter
    if (status && status !== 'all') {
      filteredUsers = filteredUsers.filter((user: any) => user.status === status)
    }

    // Apply pagination
    const offset = (page - 1) * limit
    const paginatedUsers = filteredUsers.slice(offset, offset + limit)

    return {
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit)
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi lấy danh sách người dùng'
    })
  }
})
