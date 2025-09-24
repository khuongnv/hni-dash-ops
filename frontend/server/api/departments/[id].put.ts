export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID department không hợp lệ'
      })
    }

    // Validation
    if (!body.name || !body.code) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Vui lòng điền đầy đủ thông tin bắt buộc'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const departments = await $fetch('/data/demo-departments.ts')
    
    // Tìm department theo ID
    const departmentIndex = departments.findIndex((d: any) => d.id === parseInt(id))
    
    if (departmentIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy department'
      })
    }

    // Cập nhật thông tin department
    const updateData = {
      code: body.code.trim(),
      name: body.name.trim(),
      parent_id: body.parent_id || departments[departmentIndex].parent_id,
      map_id: body.map_id || departments[departmentIndex].map_id,
      level: body.level || departments[departmentIndex].level,
      note: body.note || departments[departmentIndex].note,
      updated_at: new Date().toISOString()
    }

    // Cập nhật department trong mảng
    departments[departmentIndex] = { ...departments[departmentIndex], ...updateData }

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)

    return {
      success: true,
      data: departments[departmentIndex],
      message: 'Cập nhật department thành công'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi cập nhật department'
    })
  }
})