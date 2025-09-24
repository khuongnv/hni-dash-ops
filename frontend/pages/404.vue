<template>
  <!-- Simple 404 Content -->
  <div class="text-center py-12">
    <h1 class="text-6xl font-bold text-muted-foreground mb-4">404</h1>
    <p class="text-lg text-muted-foreground mb-6">
      Trang bạn tìm kiếm không tồn tại.
    </p>
    <Button @click="goHome">
      Về trang chủ
    </Button>
  </div>
</template>

<script setup lang="ts">
// Import UI components
import Button from '~/components/ui/Button.vue'

// Set page title
useHead({
  title: '404 - Trang không tìm thấy'
})

// Navigation function
const goHome = () => {
  navigateTo('/main/dashboard')
}
</script>
