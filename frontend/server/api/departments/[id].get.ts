export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID department không hợp lệ'
      })
    }

    // Đọc dữ liệu từ file JSON
    const departments = await $fetch('/data/demo-departments.ts')
    
    // Tìm department theo ID
    const department = departments.find((d: any) => d.id === parseInt(id))

    if (!department) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy department'
      })
    }

    return {
      success: true,
      data: department
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi lấy thông tin department'
    })
  }
})