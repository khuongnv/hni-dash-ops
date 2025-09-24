<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng nhập hệ thống
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sử dụng tài khoản của bạn để truy cập
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Tên đăng nhập</label>
            <input
              id="username"
              v-model="form.username"
              name="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Tên đăng nhập"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Mật khẩu</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Mật khẩu"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm text-center">
          {{ errorMessage }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            </span>
            {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
          </button>
        </div>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500">Hoặc</span>
          </div>
        </div>

        <div>
          <button
            type="button"
            @click="handleSSOLogin"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <Shield class="h-4 w-4 text-gray-400 group-hover:text-gray-500" />
            </span>
            Đăng nhập SSO
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Sử dụng tài khoản đã được tạo trong hệ thống
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Shield } from 'lucide-vue-next'
import { useAuth } from '~/composables/useAuth'
import { useSSO } from '~/composables/useSSO'

definePageMeta({
  layout: false // Không sử dụng layout mặc định
})

const { login } = useAuth()
const { redirectToSSO } = useSSO()
const router = useRouter()

// Form state
const form = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!form.value.username || !form.value.password) {
    errorMessage.value = 'Vui lòng nhập đầy đủ thông tin'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const success = await login(form.value.username, form.value.password)
    
    if (success) {
      // Redirect to dashboard
      await router.push('/main/dashboard')
    } else {
      errorMessage.value = 'Tên đăng nhập hoặc mật khẩu không đúng'
    }
  } catch (error: any) {
    console.error('Login error:', error)
    errorMessage.value = error.message || 'Có lỗi xảy ra khi đăng nhập'
  } finally {
    loading.value = false
  }
}

const handleSSOLogin = () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    redirectToSSO()
  } catch (error) {
    console.error('SSO redirect error:', error)
    errorMessage.value = 'Có lỗi xảy ra khi chuyển hướng SSO'
    loading.value = false
  }
}
</script>
