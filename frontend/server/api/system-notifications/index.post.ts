export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validation
    if (!body.title || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Vui lòng điền đầy đủ thông tin bắt buộc'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const notifications = await $fetch('/data/demo-system-notifications.ts')
    
    // Tạo ID mới
    const newId = Math.max(...notifications.map((n: any) => n.id)) + 1
    
    // Tạo notification mới
    const newNotification = {
      id: newId,
      title: body.title.trim(),
      content: body.content.trim(),
      type: body.type || 'info',
      priority: body.priority || 'normal',
      is_active: body.is_active !== undefined ? body.is_active : true,
      start_date: body.start_date || new Date().toISOString(),
      end_date: body.end_date || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Thêm notification mới vào danh sách
    notifications.push(newNotification)

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)
    
    return {
      success: true,
      data: newNotification,
      message: 'Tạo thông báo thành công'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi tạo thông báo'
    })
  }
})