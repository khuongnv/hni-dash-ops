<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader title="Xác thực 2FA" />
    
    <!-- Content -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">Cài đặt xác thực 2 yếu tố</h2>
        <p class="text-muted-foreground">
          Đây là trang test cho menu tầng 3 - Xác thực 2FA
        </p>
        <div class="mt-4 p-4 bg-muted/50 rounded-lg">
          <p class="text-sm">
            <strong>Đường dẫn:</strong> /system/settings/security/2fa<br>
            <strong>Cấp độ:</strong> Menu tầng 3<br>
            <strong>Mục đích:</strong> Test tính năng menu phân tầng của sidebar
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '~/components/PageHeader.vue'

// Set page meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Set page title
useHead({
  title: 'Xác thực 2FA - HNI Operations'
})
</script>
