export default defineEventHandler(async (event) => {
  try {
    // Đọc dữ liệu từ file JSON
    const departments = await $fetch('/data/demo-departments.ts')

    return {
      success: true,
      data: departments || []
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi lấy danh sách departments'
    })
  }
})
