export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID department không hợp lệ'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const departments = await $fetch('/data/demo-departments.ts')
    
    // Tìm department theo ID
    const departmentIndex = departments.findIndex((d: any) => d.id === parseInt(id))
    
    if (departmentIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy department'
      })
    }

    // Xóa department khỏi mảng
    departments.splice(departmentIndex, 1)

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)

    return { 
      success: true, 
      message: 'Xóa department thành công' 
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi xóa department'
    })
  }
})