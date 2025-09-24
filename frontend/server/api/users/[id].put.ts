export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { full_name, username, password, email, department_id, role_id, position_id, gender_id, dob, status } = body

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID người dùng không hợp lệ'
      })
    }

    // Validation
    if (!full_name || !username || !email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Vui lòng điền đầy đủ thông tin bắt buộc'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const users = await $fetch('/data/demo-users.ts')
    
    // Tìm user theo ID
    const userIndex = users.findIndex((u: any) => u.id === parseInt(id))
    
    if (userIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy người dùng'
      })
    }

    // Cập nhật thông tin user
    const updateData: any = {
      full_name,
      username,
      email,
      department_id: department_id || null,
      role_id: role_id || null,
      position_id: position_id || null,
      gender_id: gender_id || null,
      dob: dob || null,
      status: status || 'active',
      updated_at: new Date().toISOString()
    }

    // Only update password if provided
    if (password) {
      updateData.password = password
    }

    // Cập nhật user trong mảng
    users[userIndex] = { ...users[userIndex], ...updateData }

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)

    return {
      success: true,
      data: users[userIndex],
      message: 'Cập nhật người dùng thành công'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi cập nhật người dùng'
    })
  }
})
