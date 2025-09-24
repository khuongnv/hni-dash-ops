<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader 
      title="Đã xảy ra lỗi"
    />

    <!-- Error Content -->
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <!-- Error Icon -->
      <div class="mb-8">
        <div class="w-32 h-32 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle class="w-16 h-16 text-destructive" />
        </div>
      </div>

      <!-- Error Message -->
      <div class="max-w-md mx-auto space-y-4">
        <h1 class="text-2xl font-bold text-foreground">
          Đã xảy ra lỗi không mong muốn
        </h1>
        <p class="text-muted-foreground">
          Hệ thống đang gặp sự cố. Vui lòng thử lại sau hoặc liên hệ với quản trị viên.
        </p>
      </div>

      <!-- Error Details (if available) -->
      <div v-if="error?.message" class="mt-6 p-4 bg-muted/50 rounded-lg max-w-lg">
        <h3 class="text-sm font-semibold mb-2">Chi tiết lỗi:</h3>
        <p class="text-sm text-muted-foreground font-mono">{{ error.message }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 mt-8">
        <Button @click="refresh" variant="outline">
          <RefreshCw class="w-4 h-4 mr-2" />
          Thử lại
        </Button>
        <Button @click="goHome">
          <Home class="w-4 h-4 mr-2" />
          Về trang chủ
        </Button>
      </div>

      <!-- Help Section -->
      <div class="mt-12 p-6 bg-muted/50 rounded-lg max-w-lg">
        <h3 class="text-lg font-semibold mb-3">Cần hỗ trợ?</h3>
        <p class="text-sm text-muted-foreground mb-4">
          Nếu lỗi vẫn tiếp tục xảy ra, vui lòng liên hệ với quản trị viên hệ thống.
        </p>
        <div class="flex flex-col sm:flex-row gap-2 text-sm">
          <span class="text-muted-foreground">Email:</span>
          <span class="font-medium">admin@hni.com</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle, RefreshCw, Home } from 'lucide-vue-next'

// Import UI components
import Button from '~/components/ui/Button.vue'

// Get error from props
const props = defineProps<{
  error: {
    message?: string
    statusCode?: number
  }
}>()

// Set page title
useHead({
  title: 'Lỗi - Hệ thống gặp sự cố'
})

// Navigation functions
const refresh = () => {
  window.location.reload()
}

const goHome = () => {
  navigateTo('/dashboard')
}
</script>
