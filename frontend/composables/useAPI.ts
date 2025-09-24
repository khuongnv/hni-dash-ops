import { useRuntimeConfig } from 'nuxt/app'

export interface ApiResponse<T> {
  Status: string
  Data?: T
  Message?: string
  Count?: number
  Timestamp?: string
}

export interface ApiError {
  Status: string
  Message: string
  Timestamp: string
}

export const useAPI = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl || 'http://localhost:64707'

  const apiCall = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const url = `${baseURL}${endpoint}`
    
    // Get token from localStorage if available
    let authToken = ''
    if (typeof window !== 'undefined') {
      authToken = localStorage.getItem('auth_token') || ''
    }
    
    console.log('API Request:', {
      url,
      hasToken: !!authToken,
      token: authToken ? `${authToken.substring(0, 20)}...` : 'none'
    })
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
        ...options.headers,
      },
    }

    try {
      const response = await $fetch<ApiResponse<T>>(url, {
        ...defaultOptions,
        ...options,
      } as any)

      if (response.Status === 'Success') {
        return response.Data as T
      } else {
        throw new Error(response.Message || 'API call failed')
      }
    } catch (error: any) {
      console.error(`API Error for ${endpoint}:`, error)
      console.error('Error details:', {
        status: error.status,
        statusText: error.statusText,
        data: error.data,
        message: error.message
      })
      throw error
    }
  }

  const get = async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    const searchParams = params ? new URLSearchParams(params).toString() : ''
    const url = searchParams ? `${endpoint}?${searchParams}` : endpoint
    
    return apiCall<T>(url, {
      method: 'GET',
    })
  }

  const post = async <T>(endpoint: string, data?: any): Promise<T> => {
    return apiCall<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  const put = async <T>(endpoint: string, data?: any): Promise<T> => {
    return apiCall<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  const del = async <T>(endpoint: string): Promise<T> => {
    return apiCall<T>(endpoint, {
      method: 'DELETE',
    })
  }

  return {
    get,
    post,
    put,
    delete: del,
  }
}
