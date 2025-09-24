export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID thông báo không hợp lệ'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const notifications = await $fetch('/data/demo-system-notifications.ts')
    
    // Tìm notification theo ID
    const notificationIndex = notifications.findIndex((n: any) => n.id === parseInt(id))
    
    if (notificationIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy thông báo'
      })
    }

    // Xóa notification khỏi mảng
    notifications.splice(notificationIndex, 1)

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)

    return { 
      success: true, 
      message: 'Xóa thông báo thành công' 
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi xóa thông báo'
    })
  }
})