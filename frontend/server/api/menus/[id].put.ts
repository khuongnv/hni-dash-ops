export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    if (!id || isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID menu không hợp lệ'
      })
    }

    // Validate required fields
    if (!body.name || !body.icon) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Thiếu thông tin bắt buộc: name, icon'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const menus = await $fetch('/data/demo-menus.ts')
    
    // Tìm menu theo ID
    const menuIndex = menus.findIndex((m: any) => m.id === parseInt(id))
    
    if (menuIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy menu'
      })
    }

    // Cập nhật thông tin menu
    const updateData = {
      name: body.name.trim(),
      path: body.path ? body.path.trim() : '#',
      icon: body.icon.trim(),
      order: body.order || menus[menuIndex].order,
      is_active: body.is_active !== undefined ? body.is_active : menus[menuIndex].is_active,
      parent_id: body.parent_id || menus[menuIndex].parent_id,
      level: body.level || menus[menuIndex].level,
      updated_at: new Date().toISOString()
    }

    // Cập nhật menu trong mảng
    menus[menuIndex] = { ...menus[menuIndex], ...updateData }

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)

    return {
      success: true,
      data: menus[menuIndex],
      message: 'Cập nhật menu thành công'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Lỗi khi cập nhật menu'
    })
  }
})