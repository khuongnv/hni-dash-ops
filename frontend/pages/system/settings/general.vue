<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader title="Cấu hình chung" />
    
    <!-- Content -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">Cấu hình chung hệ thống</h2>
        <p class="text-muted-foreground">
          Đây là trang test cho menu tầng 2 - Cấu hình chung
        </p>
        <div class="mt-4 p-4 bg-muted/50 rounded-lg">
          <p class="text-sm">
            <strong>Đường dẫn:</strong> /system/settings/general<br>
            <strong>Cấp độ:</strong> Menu tầng 2<br>
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
  title: 'Cấu hình chung - HNI Operations'
})
</script>
