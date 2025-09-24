export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID người dùng không hợp lệ'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const users = await $fetch('/data/demo-users.ts')
    
    // Tìm user theo ID
    const userIndex = users.findIndex((u: any) => u.id === parseInt(id))
    
    if (userIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy người dùng'
      })
    }

    // Xóa user khỏi mảng
    users.splice(userIndex, 1)

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)

    return { 
      success: true, 
      message: 'Xóa người dùng thành công' 
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi xóa người dùng'
    })
  }
})
