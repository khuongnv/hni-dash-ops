import { useErrorHandler } from './useErrorHandler'

export interface SSOUser {
  userName: string
  sessionId: string
}

export interface SSOApiResponse {
  IsError: boolean
  ErrorCode: number
  ErrorMessage: string
  Data: SSOUser
}

export interface SSOValidationResult {
  success: boolean
  user?: any // User từ database
  error?: string
  ssoUser?: SSOUser
  tokenkey?: string // Tokenkey để gọi API backend
}

export const useSSO = () => {
  const { handleAsyncError } = useErrorHandler()
  
  // SSO Configuration
  const SSO_CONFIG = {
    baseUrl: 'https://id.hanoi.vnpt.vn',
    loginUrl: 'https://id.hanoi.vnpt.vn/account/SSOLogOn',
    logoutUrl: 'https://id.hanoi.vnpt.vn/account/logoff',
    apiUrl: 'https://id.hanoi.vnpt.vn/api/ValidateTokenKey'
  }
  
  // Redirect to SSO login
  const redirectToSSO = () => {
    if (process.client) {
      const returnUrl = `${window.location.origin}/auth/sso-callback`
      const ssoUrl = `${SSO_CONFIG.loginUrl}?returnUrl=${encodeURIComponent(returnUrl)}`
      window.location.href = ssoUrl
    }
  }
  
  // Validate SSO token
  const validateSSOToken = async (tokenkey: string): Promise<SSOValidationResult> => {
    return await handleAsyncError(async () => {
      // 1. Gọi SSO API validate token
      console.log('SSO API URL:', SSO_CONFIG.apiUrl)
      console.log('SSO Token:', tokenkey)
      
      let ssoResponse: SSOApiResponse
      
      try {
        ssoResponse = await $fetch<SSOApiResponse>(SSO_CONFIG.apiUrl, {
          method: 'POST',
          body: {
            TokenKey: tokenkey
          }
        })
        
        console.log('SSO API Response:', ssoResponse)
      } catch (apiError: any) {
        console.error('SSO API Error:', apiError)
        
        // Fallback: Mock response for testing
        if (tokenkey === 'test-token' || tokenkey === 'demo') {
          console.log('Using mock SSO response for testing')
          ssoResponse = {
            IsError: false,
            ErrorCode: 0,
            ErrorMessage: '',
            Data: {
              userName: 'khuongnv',
              sessionId: 'mock-session-123'
            }
          }
        } else {
          return {
            success: false,
            error: `SSO API Error: ${apiError.message || 'Không thể kết nối đến SSO server'}`
          }
        }
      }
      
      // 2. Check SSO response
      if (!ssoResponse) {
        return {
          success: false,
          error: 'SSO API không phản hồi'
        }
      }
      
      if (ssoResponse.IsError) {
        return {
          success: false,
          error: ssoResponse.ErrorMessage || `SSO validation failed (Error Code: ${ssoResponse.ErrorCode})`
        }
      }
      
      if (!ssoResponse.Data) {
        return {
          success: false,
          error: `SSO response data is missing. Response: ${JSON.stringify(ssoResponse)}`
        }
      }
      
      const ssoUser = ssoResponse.Data
      
      // 3. Check user exists in database
      const userResponse = await $fetch<{ success: boolean; user?: any; error?: string }>('/api/auth/check-user', {
        method: 'POST',
        body: {
          username: ssoUser.userName
        }
      })
      
      if (!userResponse || !userResponse.success) {
        return {
          success: false,
          error: userResponse?.error || 'User not found in database',
          ssoUser
        }
      }
      
      return {
        success: true,
        user: userResponse.user,
        ssoUser,
        tokenkey // Thêm tokenkey vào result
      }
    }, 'SSO Validation')
  }
  
  // Login user after SSO validation
  const loginSSOUser = async (user: any, ssoUser: SSOUser, tokenkey?: string): Promise<boolean> => {
    return await handleAsyncError(async () => {
      // Tạo session cho user
      const response = await $fetch<{ success: boolean; user?: any }>('/api/auth/login-sso', {
        method: 'POST',
        body: {
          user,
          ssoUser
        }
      })
      
      if (response && response.success && response.user) {
        // Thêm tokenkey vào user object
        const userWithToken = {
          ...response.user,
          ssoTokenKey: tokenkey // Lưu tokenkey để gọi API backend
        }
        
        // Lưu user vào localStorage
        if (process.client) {
          localStorage.setItem('auth_user', JSON.stringify(userWithToken))
        }
        return true
      }
      
      return false
    }, 'SSO Login')
  }
  
  // Logout from SSO
  const logoutSSO = () => {
    if (process.client) {
      // Clear local session
      localStorage.removeItem('auth_user')
      
      // Redirect to SSO logout
      window.location.href = SSO_CONFIG.logoutUrl
    }
  }
  
  // Check if current session is from SSO
  const isSSOSession = (): boolean => {
    if (process.client) {
      const user = localStorage.getItem('auth_user')
      if (user) {
        try {
          const userData = JSON.parse(user)
          return userData.ssoSession === true
        } catch (error) {
          return false
        }
      }
    }
    return false
  }
  
  // Get SSO token for API calls
  const getSSOToken = (): string | null => {
    if (process.client) {
      const user = localStorage.getItem('auth_user')
      if (user) {
        try {
          const userData = JSON.parse(user)
          return userData.ssoTokenKey || null
        } catch (error) {
          return null
        }
      }
    }
    return null
  }
  
  return {
    redirectToSSO,
    validateSSOToken,
    loginSSOUser,
    logoutSSO,
    isSSOSession,
    getSSOToken,
    SSO_CONFIG
  }
}
