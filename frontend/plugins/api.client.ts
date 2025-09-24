export default defineNuxtPlugin(() => {
  // Tạo $fetch instance với base URL cho API
  const apiClient = $fetch.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    },
    onRequest({ request, options }) {
      // Thêm token nếu có
      const token = process.client ? localStorage.getItem('auth_token') : null
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      }
    },
    onResponseError({ response }) {
      // Xử lý lỗi 401 - unauthorized
      if (response.status === 401) {
        if (process.client) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
          // Redirect to login
          navigateTo('/login')
        }
      }
    }
  })

  return {
    provide: {
      api: apiClient
    }
  }
})
