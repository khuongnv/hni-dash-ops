<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-12 w-12 flex items-center justify-center">
          <div v-if="loading" class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <div v-else-if="error" class="h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
            <XCircle class="h-8 w-8 text-red-600" />
          </div>
          <div v-else class="h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <CheckCircle class="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          {{ getTitle() }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ getMessage() }}
        </p>
      </div>
      
      <div v-if="error" class="mt-8">
        <div class="bg-red-50 border border-red-200 rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircle class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                Lỗi xác thực SSO
              </h3>
              <div class="mt-2 text-sm text-red-700">
                <p>{{ error }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-center">
          <Button @click="goToLogin" variant="outline">
            Quay lại đăng nhập
          </Button>
        </div>
      </div>
      
      <div v-else-if="success" class="mt-8">
        <div class="bg-green-50 border border-green-200 rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircle class="h-5 w-5 text-green-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                Đăng nhập thành công
              </h3>
              <div class="mt-2 text-sm text-green-700">
                <p>Chào mừng {{ user?.full_name || user?.username }}!</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-center">
          <Button @click="goToDashboard" variant="default">
            Vào hệ thống
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CheckCircle, XCircle } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'
import { useSSO } from '~/composables/useSSO'

// Page meta
definePageMeta({
  layout: false
})

// Composables
const route = useRoute()
const router = useRouter()
const { validateSSOToken, loginSSOUser } = useSSO()

// State
const loading = ref(true)
const error = ref<string | null>(null)
const success = ref(false)
const user = ref<any>(null)

// Methods
const getTitle = (): string => {
  if (loading.value) return 'Đang xác thực...'
  if (error.value) return 'Xác thực thất bại'
  if (success.value) return 'Đăng nhập thành công'
  return 'Xác thực SSO'
}

const getMessage = (): string => {
  if (loading.value) return 'Vui lòng chờ trong giây lát...'
  if (error.value) return 'Có lỗi xảy ra trong quá trình xác thực'
  if (success.value) return 'Bạn đã đăng nhập thành công'
  return 'Đang xử lý...'
}

const goToLogin = () => {
  router.push('/login')
}

const goToDashboard = () => {
  router.push('/main/dashboard')
}

const processSSOCallback = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Get tokenkey from URL
    const tokenkey = route.query.tokenkey as string
    console.log('SSO Callback - Tokenkey:', tokenkey)
    
    if (!tokenkey) {
      error.value = 'Không tìm thấy token xác thực'
      return
    }
    
    // Validate SSO token
    console.log('SSO Callback - Validating token...')
    const result = await validateSSOToken(tokenkey)
    console.log('SSO Callback - Validation result:', result)
    
    if (!result || !result.success) {
      error.value = result?.error || 'Xác thực SSO thất bại'
      return
    }
    
    if (!result.user) {
      error.value = 'Không tìm thấy thông tin người dùng'
      return
    }
    
    // Login user
    console.log('SSO Callback - Logging in user...')
    const loginSuccess = await loginSSOUser(result.user, result.ssoUser!, result.tokenkey)
    console.log('SSO Callback - Login success:', loginSuccess)
    
    if (!loginSuccess) {
      error.value = 'Đăng nhập thất bại'
      return
    }
    
    user.value = result.user
    success.value = true
    
    // Auto redirect to dashboard after 2 seconds
    setTimeout(() => {
      goToDashboard()
    }, 2000)
    
  } catch (err: any) {
    console.error('SSO Callback Error:', err)
    error.value = err.message || 'Có lỗi xảy ra trong quá trình xác thực'
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  processSSOCallback()
})
</script>
