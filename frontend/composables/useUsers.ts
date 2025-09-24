import { useErrorHandler } from './useErrorHandler'

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
  const { get, post, put, delete: del } = useAPI()

  const getUsers = async (page: number = 1, limit: number = 10, search: string = '', status: string = ''): Promise<UsersResponse> => {
    return await handleAsyncError(async () => {
      const params: Record<string, any> = { page, limit }
      if (search) params.search = search
      if (status) params.status = status
      
      return await get<UsersResponse>('/api/users', params)
    }, 'Lấy danh sách người dùng')
  }

  const getUserById = async (id: number): Promise<User> => {
    return await handleAsyncError(async () => {
      return await get<User>(`/api/users/${id}`)
    }, 'Lấy thông tin người dùng')
  }

  const createUser = async (userData: Partial<User>): Promise<User> => {
    return await handleAsyncError(async () => {
      return await post<User>('/api/users', userData)
    }, 'Tạo người dùng')
  }

  const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
    return await handleAsyncError(async () => {
      return await put<User>(`/api/users/${id}`, userData)
    }, 'Cập nhật người dùng')
  }

  const deleteUser = async (id: number): Promise<void> => {
    return await handleAsyncError(async () => {
      await del(`/api/users/${id}`)
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
