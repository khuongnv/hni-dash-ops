import { ref, computed, readonly } from 'vue'
import { useErrorHandler } from './useErrorHandler'
import { useRuntimeConfig } from '#app'

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  emailConfirmed: boolean
  lastLoginAt?: string
  createdAt: string
}

export interface AuthResponse {
  Status: string
  Message: string
  Timestamp: string
  Token: string
  User: AuthUser
  Role: string
  MenuIds: number[]
}

export const useAuth = () => {
  const { handleAsyncError } = useErrorHandler()
  const config = useRuntimeConfig()
  
  // State
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(null)
  const role = ref<string>('')
  const menuIds = ref<number[]>([])
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isInitialized = ref(false)

  // Initialize from localStorage on client side
  const initializeAuth = () => {
    if (typeof window !== 'undefined' && !isInitialized.value) {
      const savedUser = localStorage.getItem('auth_user')
      const savedToken = localStorage.getItem('auth_token')
      const savedRole = localStorage.getItem('auth_role')
      const savedMenuIds = localStorage.getItem('auth_menu_ids')
      
      if (savedUser && savedToken) {
        try {
          user.value = JSON.parse(savedUser)
          token.value = savedToken
          role.value = savedRole || ''
          menuIds.value = savedMenuIds ? JSON.parse(savedMenuIds) : []
        } catch (error) {
          console.error('Error parsing saved auth data:', error)
          clearAuthData()
        }
      }
      isInitialized.value = true
    }
  }

  // Initialize on mount
  if (typeof window !== 'undefined') {
    initializeAuth()
  }

  const login = async (usernameOrEmail: string, password: string): Promise<boolean> => {
    const result = await handleAsyncError(async (): Promise<boolean> => {
      console.log('Login request:', {
        url: `${config.public.apiBaseUrl}/api/Auth/login`,
        body: {
          UsernameOrEmail: usernameOrEmail,
          Password: password
        }
      })
      
      const response = await $fetch<AuthResponse>(`${config.public.apiBaseUrl}/api/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          UsernameOrEmail: usernameOrEmail,
          Password: password
        }
      })
      
      console.log('Login response:', response)
      console.log('Response Status:', response.Status)
      console.log('Response User:', response.User)
      console.log('Response Token:', response.Token)

      if (response.Status === 'Success' && response.User && response.Token) {
        console.log('Login successful, setting user data...')
        user.value = response.User
        token.value = response.Token
        role.value = response.Role
        menuIds.value = response.MenuIds
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_user', JSON.stringify(response.User))
          localStorage.setItem('auth_token', response.Token)
          localStorage.setItem('auth_role', response.Role)
          localStorage.setItem('auth_menu_ids', JSON.stringify(response.MenuIds))
        }
        
        return true
      }
      
      return false
    }, 'Đăng nhập')
    
    return result || false
  }

  // Clear auth data helper
  const clearAuthData = () => {
    user.value = null
    token.value = null
    role.value = ''
    menuIds.value = []
    
    // Remove from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_role')
      localStorage.removeItem('auth_menu_ids')
    }
  }

  const logout = () => {
    clearAuthData()
  }

  const getCurrentUser = (): AuthUser | null => {
    return user.value
  }

  const getToken = (): string | null => {
    return token.value
  }

  const getRole = (): string => {
    return role.value
  }

  const getMenuIds = (): number[] => {
    return menuIds.value
  }

  const getUserDisplayName = (): string => {
    if (!user.value) return ''
    const fullName = `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim()
    return fullName || user.value.username
  }

  return {
    user: readonly(user),
    token: readonly(token),
    role: readonly(role),
    menuIds: readonly(menuIds),
    isAuthenticated,
    isInitialized: readonly(isInitialized),
    login,
    logout,
    getCurrentUser,
    getToken,
    getRole,
    getMenuIds,
    getUserDisplayName,
    initializeAuth,
    clearAuthData
  }
}
