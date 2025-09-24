<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader title="Báo cáo doanh thu" />
    
    <!-- Content -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">Báo cáo doanh thu</h2>
        <p class="text-muted-foreground">
          Đây là trang test cho menu tầng 2 - Báo cáo doanh thu
        </p>
        <div class="mt-4 p-4 bg-muted/50 rounded-lg">
          <p class="text-sm">
            <strong>Đường dẫn:</strong> /system/reports/revenue<br>
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
  title: 'Báo cáo Doanh thu - HNI Operations'
})
</script>
