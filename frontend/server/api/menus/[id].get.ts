export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id || isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID menu không hợp lệ'
      })
    }

    // Đọc dữ liệu từ file JSON
    const menus = await $fetch('/data/demo-menus.ts')
    
    // Tìm menu theo ID
    const menu = menus.find((m: any) => m.id === parseInt(id))

    if (!menu) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy menu'
      })
    }
    
    return {
      success: true,
      data: menu
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Lỗi khi lấy thông tin menu'
    })
  }
})

