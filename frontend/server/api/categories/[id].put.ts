export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID category không hợp lệ'
      })
    }

    // Validation
    if (!body.name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Vui lòng điền đầy đủ thông tin bắt buộc'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const categories = await $fetch('/data/demo-categories.ts')
    
    // Tìm category theo ID
    const categoryIndex = categories.findIndex((c: any) => c.id === parseInt(id))
    
    if (categoryIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy category'
      })
    }

    // Cập nhật thông tin category
    const updateData = {
      name: body.name.trim(),
      description: body.description || categories[categoryIndex].description,
      type: body.type || categories[categoryIndex].type,
      is_active: body.is_active !== undefined ? body.is_active : categories[categoryIndex].is_active,
      updated_at: new Date().toISOString()
    }

    // Cập nhật category trong mảng
    categories[categoryIndex] = { ...categories[categoryIndex], ...updateData }

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)

    return {
      success: true,
      data: categories[categoryIndex],
      message: 'Cập nhật category thành công'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi cập nhật category'
    })
  }
})