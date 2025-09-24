export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id || isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID menu không hợp lệ'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const menus = await $fetch('/data/demo-menus.ts')
    
    // Tìm menu theo ID
    const menuIndex = menus.findIndex((m: any) => m.id === parseInt(id))
    
    if (menuIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy menu'
      })
    }

    // Xóa menu khỏi mảng
    menus.splice(menuIndex, 1)

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)

    return { 
      success: true, 
      message: 'Xóa menu thành công' 
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Lỗi khi xóa menu'
    })
  }
})