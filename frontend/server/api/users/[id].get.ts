export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID người dùng không hợp lệ'
      })
    }

    // Đọc dữ liệu từ file JSON
    const users = await $fetch('/data/demo-users.ts')
    
    // Tìm user theo ID
    const user = users.find((u: any) => u.id === parseInt(id))

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy người dùng'
      })
    }

    return {
      success: true,
      data: user
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi lấy thông tin người dùng'
    })
  }
})
