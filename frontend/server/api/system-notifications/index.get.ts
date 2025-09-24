export default defineEventHandler(async (event) => {
  try {
    // Đọc dữ liệu từ file JSON
    const notifications = await $fetch('/data/demo-system-notifications.ts')

    return {
      success: true,
      data: notifications || []
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi lấy danh sách thông báo'
    })
  }
})