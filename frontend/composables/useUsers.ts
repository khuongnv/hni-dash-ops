import { useErrorHandler } from './useErrorHandler'
import { demoUsers, User } from '~/data/demo-users'

export interface User {
  id: number
  full_name: string
  username: string
  password?: string
  email: string
  department_id?: number
  role_id?: number
  position_id?: number
  gender_id?: number
  dob?: string
  status: string
  created_at: string
  updated_at: string
  department?: { name: string }
  role?: { name: string }
  position?: { name: string }
  gender?: { name: string }
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface UsersResponse {
  data: User[]
  pagination: PaginationInfo
}

export const useUsers = () => {
  const { handleAsyncError } = useErrorHandler()

  const getUsers = async (page: number = 1, limit: number = 10, search: string = '', status: string = ''): Promise<UsersResponse> => {
    return await handleAsyncError(async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      let filteredUsers = [...demoUsers]
      
      // Filter by search
      if (search) {
        const searchLower = search.toLowerCase()
        filteredUsers = filteredUsers.filter(user => 
          user.full_name.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        )
      }
      
      // Filter by status
      if (status) {
        filteredUsers = filteredUsers.filter(user => user.status === status)
      }
      
      // Pagination
      const total = filteredUsers.length
      const totalPages = Math.ceil(total / limit)
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const data = filteredUsers.slice(startIndex, endIndex)
      
      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      }
    }, 'Lấy danh sách người dùng')
  }

  const getUserById = async (id: number): Promise<User> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      const user = demoUsers.find(u => u.id === id)
      if (!user) {
        throw new Error('User not found')
      }
      return user
    }, 'Lấy thông tin người dùng')
  }

  const createUser = async (userData: Partial<User>): Promise<User> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 400))
      const newUser: User = {
        id: Math.max(...demoUsers.map(u => u.id)) + 1,
        full_name: userData.full_name || '',
        username: userData.username || '',
        email: userData.email || '',
        department_id: userData.department_id || null,
        role_id: userData.role_id || null,
        position_id: userData.position_id || null,
        gender_id: userData.gender_id || null,
        dob: userData.dob || null,
        status: userData.status || 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        department: userData.department || null,
        role: userData.role || null,
        position: userData.position || null,
        gender: userData.gender || null
      }
      demoUsers.push(newUser)
      return newUser
    }, 'Tạo người dùng')
  }

  const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 400))
      const index = demoUsers.findIndex(u => u.id === id)
      if (index === -1) {
        throw new Error('User not found')
      }
      demoUsers[index] = {
        ...demoUsers[index],
        ...userData,
        updated_at: new Date().toISOString()
      }
      return demoUsers[index]
    }, 'Cập nhật người dùng')
  }

  const deleteUser = async (id: number): Promise<void> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 200))
      const index = demoUsers.findIndex(u => u.id === id)
      if (index === -1) {
        throw new Error('User not found')
      }
      demoUsers.splice(index, 1)
    }, 'Xóa người dùng')
  }

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  }
}
