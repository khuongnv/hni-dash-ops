export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID category không hợp lệ'
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

    // Xóa category khỏi mảng
    categories.splice(categoryIndex, 1)

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)

    return { 
      success: true, 
      message: 'Xóa category thành công' 
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi xóa category'
    })
  }
})