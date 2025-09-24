export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID thông báo không hợp lệ'
      })
    }

    // Đọc dữ liệu từ file JSON
    const notifications = await $fetch('/data/demo-system-notifications.ts')
    
    // Tìm notification theo ID
    const notification = notifications.find((n: any) => n.id === parseInt(id))

    if (!notification) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy thông báo'
      })
    }

    return {
      success: true,
      data: notification
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi lấy thông tin thông báo'
    })
  }
})