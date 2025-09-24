<template>
  <div v-if="hasError" class="p-4 border border-red-200 rounded-lg bg-red-50">
    <h3 class="text-red-800 font-medium">Đã xảy ra lỗi</h3>
    <p class="text-red-600 text-sm mt-1">{{ errorMessage }}</p>
    <button 
      @click="resetError" 
      class="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
    >
      Thử lại
    </button>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const hasError = ref(false)
const errorMessage = ref('')

const resetError = () => {
  hasError.value = false
  errorMessage.value = ''
}

onErrorCaptured((error) => {
  hasError.value = true
  errorMessage.value = error.message || 'Có lỗi không xác định'
  console.error('Error caught by boundary:', error)
  return false // Prevent error from propagating
})
</script>
