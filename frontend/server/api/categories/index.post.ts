export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validation
    if (!body.name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Vui lòng điền đầy đủ thông tin bắt buộc'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const categories = await $fetch('/data/demo-categories.ts')
    
    // Tạo ID mới
    const newId = Math.max(...categories.map((c: any) => c.id)) + 1
    
    // Tạo category mới
    const newCategory = {
      id: newId,
      name: body.name.trim(),
      description: body.description || null,
      type: body.type || 'general',
      is_active: body.is_active !== undefined ? body.is_active : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Thêm category mới vào danh sách
    categories.push(newCategory)

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)
    
    return {
      success: true,
      data: newCategory,
      message: 'Tạo category thành công'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi tạo category'
    })
  }
})