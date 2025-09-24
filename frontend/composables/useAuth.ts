import { useErrorHandler } from './useErrorHandler'

export interface AuthUser {
  id: number
  full_name: string
  username: string
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

export const useAuth = () => {
  const { handleAsyncError } = useErrorHandler()
  
  // State
  const user = ref<AuthUser | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const isInitialized = ref(false)

  // Initialize from localStorage on client side
  const initializeAuth = () => {
    if (process.client && !isInitialized.value) {
      const savedUser = localStorage.getItem('auth_user')
      if (savedUser) {
        try {
          user.value = JSON.parse(savedUser)
        } catch (error) {
          console.error('Error parsing saved user:', error)
          localStorage.removeItem('auth_user')
        }
      }
      isInitialized.value = true
    }
  }

  // Initialize on mount
  if (process.client) {
    initializeAuth()
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    return await handleAsyncError(async () => {
      const response = await $fetch<{
        success: boolean
        user: AuthUser
        message: string
      }>('/api/auth/login', {
        method: 'POST',
        body: { username, password }
      })

      if (response.success && response.user) {
        user.value = response.user
        
        // Save to localStorage
        if (process.client) {
          localStorage.setItem('auth_user', JSON.stringify(response.user))
        }
        
        return true
      }
      
      return false
    }, 'Đăng nhập')
  }

  const logout = () => {
    user.value = null
    
    // Remove from localStorage
    if (process.client) {
      localStorage.removeItem('auth_user')
    }
  }

  const getCurrentUser = (): AuthUser | null => {
    return user.value
  }

  const getUserDisplayName = (): string => {
    if (!user.value) return ''
    return user.value.full_name || user.value.username
  }

  const getUserRole = (): string => {
    if (!user.value?.role) return ''
    return user.value.role.name
  }

  const getUserDepartment = (): string => {
    if (!user.value?.department) return ''
    return user.value.department.name
  }

  const getUserPosition = (): string => {
    if (!user.value?.position) return ''
    return user.value.position.name
  }

  return {
    user: readonly(user),
    isAuthenticated,
    isInitialized: readonly(isInitialized),
    login,
    logout,
    getCurrentUser,
    getUserDisplayName,
    getUserRole,
    getUserDepartment,
    getUserPosition,
    initializeAuth
  }
}
