export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validation
    if (!body.name || !body.code) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Vui lòng điền đầy đủ thông tin bắt buộc'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const departments = await $fetch('/data/demo-departments.ts')
    
    // Tạo ID mới
    const newId = Math.max(...departments.map((d: any) => d.id)) + 1
    
    // Tạo department mới
    const newDepartment = {
      id: newId,
      code: body.code.trim(),
      name: body.name.trim(),
      parent_id: body.parent_id || null,
      map_id: body.map_id || null,
      level: body.level || 1,
      note: body.note || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Thêm department mới vào danh sách
    departments.push(newDepartment)

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)
    
    return {
      success: true,
      data: newDepartment,
      message: 'Tạo department thành công'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi tạo department'
    })
  }
})