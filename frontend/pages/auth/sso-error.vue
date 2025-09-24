<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
          <XCircle class="h-8 w-8 text-red-600" />
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Lỗi xác thực SSO
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ errorMessage }}
        </p>
      </div>
      
      <div class="mt-8">
        <div class="bg-red-50 border border-red-200 rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircle class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                Thông tin lỗi
              </h3>
              <div class="mt-2 text-sm text-red-700">
                <p>{{ errorMessage }}</p>
                <p class="mt-2">
                  Vui lòng liên hệ quản trị viên để được hỗ trợ.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 space-y-3">
          <Button @click="goToLogin" variant="default" class="w-full">
            Quay lại đăng nhập
          </Button>
          <Button @click="trySSOAgain" variant="outline" class="w-full">
            Thử lại SSO
          </Button>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <p class="text-xs text-gray-500">
          Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ bộ phận IT
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { XCircle } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'
import { useSSO } from '~/composables/useSSO'

// Page meta
definePageMeta({
  layout: false
})

// Composables
const route = useRoute()
const router = useRouter()
const { redirectToSSO } = useSSO()

// State
const errorMessage = ref('Có lỗi xảy ra trong quá trình xác thực SSO')

// Methods
const goToLogin = () => {
  router.push('/login')
}

const trySSOAgain = () => {
  redirectToSSO()
}

// Lifecycle
onMounted(() => {
  // Get error message from query params
  const error = route.query.error as string
  if (error) {
    errorMessage.value = decodeURIComponent(error)
  }
})
</script>
