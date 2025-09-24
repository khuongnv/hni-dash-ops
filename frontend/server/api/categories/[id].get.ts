export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID category không hợp lệ'
      })
    }

    // Đọc dữ liệu từ file JSON
    const categories = await $fetch('/data/demo-categories.ts')
    
    // Tìm category theo ID
    const category = categories.find((c: any) => c.id === parseInt(id))

    if (!category) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy category'
      })
    }

    return {
      success: true,
      data: category
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi lấy thông tin category'
    })
  }
})