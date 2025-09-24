export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { full_name, username, password, email, department_id, role_id, position_id, gender_id, dob, status } = body

    // Validation
    if (!full_name || !username || !password || !email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Vui lòng điền đầy đủ thông tin bắt buộc'
      })
    }

    // Đọc dữ liệu hiện tại từ file JSON
    const users = await $fetch('/data/demo-users.ts')
    
    // Tạo ID mới
    const newId = Math.max(...users.map((u: any) => u.id)) + 1
    
    // Tạo user mới
    const newUser = {
      id: newId,
      full_name,
      username,
      password,
      email,
      department_id: department_id || null,
      role_id: role_id || null,
      position_id: position_id || null,
      gender_id: gender_id || null,
      dob: dob || null,
      status: status || 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Thêm user mới vào danh sách
    users.push(newUser)

    // TODO: Ghi lại vào file JSON (cần implement file writing logic)
    
    return {
      success: true,
      data: newUser,
      message: 'Tạo người dùng thành công'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi khi tạo người dùng'
    })
  }
})
