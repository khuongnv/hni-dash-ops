export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID thông báo không hợp lệ'
      })
    }

    // Validation
    if (!body.title || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Vui lòng điền đầy đủ thông tin bắt buộc'
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

    // Cập nhật thông tin notification
    const updateData = {
      title: body.title.trim(),
      content: body.content.trim(),
      type: body.type || notifications[notificationIndex].type,
      priority: body.priority || notifications[notificationIndex].priority,
      is_active: body.is_active !== undefined ? body.is_active : notifications[notificationIndex].is_active,
      start_date: body.start_date || notifications[notificationIndex].start_date,
      end_date: body.end_date || notifications[notificationIndex].end_date,
      updated_at: new Date().toISOString()
    }

    // Cập nhật notification trong mảng
    notifications[notificationIndex] = { ...notifications[notificationIndex], ...updateData }

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)

    return {
      success: true,
      data: notifications[notificationIndex],
      message: 'Cập nhật thông báo thành công'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi cập nhật thông báo'
    })
  }
})