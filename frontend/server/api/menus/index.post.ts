export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.name || !body.icon) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Thiếu thông tin bắt buộc: name, icon'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const menus = await $fetch('/data/demo-menus.ts')
    
    // Tạo ID mới
    const newId = Math.max(...menus.map((m: any) => m.id)) + 1
    
    // Tạo menu mới
    const newMenu = {
      id: newId,
      name: body.name.trim(),
      path: body.path ? body.path.trim() : '#',
      icon: body.icon.trim(),
      order: body.order || 1,
      is_active: body.is_active !== undefined ? body.is_active : true,
      parent_id: body.parent_id || null,
      level: body.level || 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Thêm menu mới vào danh sách
    menus.push(newMenu)

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)
    
    return {
      success: true,
      message: 'Thêm menu hệ thống thành công',
      data: newMenu
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Lỗi khi thêm menu hệ thống mới'
    })
  }
})