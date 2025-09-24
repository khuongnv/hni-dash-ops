export default defineEventHandler(async (event) => {
  try {
    // Đọc dữ liệu từ file JSON
    const categories = await $fetch('/data/demo-categories.ts')

    return {
      success: true,
      data: categories || []
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi lấy danh sách categories'
    })
  }
})