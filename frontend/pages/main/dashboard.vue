<template>
  <div class="h-full flex flex-col space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p class="text-muted-foreground">Tổng quan hệ thống HNI Operations</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">Tổng người dùng</h3>
          <div class="h-4 w-4 text-muted-foreground">👥</div>
        </div>
        <div class="text-2xl font-bold">2,350</div>
        <p class="text-xs text-muted-foreground">
          <span class="text-green-600">+20.1%</span> so với tháng trước
        </p>
      </div>

      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">Người dùng mới</h3>
          <div class="h-4 w-4 text-muted-foreground">👤</div>
        </div>
        <div class="text-2xl font-bold">180</div>
        <p class="text-xs text-muted-foreground">
          <span class="text-green-600">+5.2%</span> so với tháng trước
        </p>
      </div>

      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">Doanh thu</h3>
          <div class="h-4 w-4 text-muted-foreground">💰</div>
        </div>
        <div class="text-2xl font-bold">45,231,000</div>
        <p class="text-xs text-muted-foreground">
          <span class="text-red-600">-2.3%</span> so với tháng trước
        </p>
      </div>

      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium">Hoạt động</h3>
          <div class="h-4 w-4 text-muted-foreground">📈</div>
        </div>
        <div class="text-2xl font-bold">12,234</div>
        <p class="text-xs text-muted-foreground">
          <span class="text-green-600">+19.0%</span> so với tháng trước
        </p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">Thao tác nhanh</h3>
        <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <button class="h-20 flex flex-col items-center justify-center space-y-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md">
            <div class="h-6 w-6">👥</div>
            <span class="text-sm">Thêm người dùng</span>
          </button>
          <button class="h-20 flex flex-col items-center justify-center space-y-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md">
            <div class="h-6 w-6">📊</div>
            <span class="text-sm">Tạo báo cáo</span>
          </button>
          <button class="h-20 flex flex-col items-center justify-center space-y-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md">
            <div class="h-6 w-6">⚙️</div>
            <span class="text-sm">Cài đặt hệ thống</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <div class="h-2 w-2 bg-primary rounded-full" />
            <div class="flex-1 space-y-1">
              <p class="text-sm font-medium leading-none">Người dùng mới đăng ký</p>
              <p class="text-sm text-muted-foreground">john.doe@example.com đã tạo tài khoản</p>
            </div>
            <div class="text-xs text-muted-foreground">2 phút trước</div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="h-2 w-2 bg-primary rounded-full" />
            <div class="flex-1 space-y-1">
              <p class="text-sm font-medium leading-none">Báo cáo được tạo</p>
              <p class="text-sm text-muted-foreground">Báo cáo tháng 12/2024 đã được tạo</p>
            </div>
            <div class="text-xs text-muted-foreground">1 giờ trước</div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="h-2 w-2 bg-primary rounded-full" />
            <div class="flex-1 space-y-1">
              <p class="text-sm font-medium leading-none">Cập nhật hệ thống</p>
              <p class="text-sm text-muted-foreground">Phiên bản 2.1.0 đã được triển khai</p>
            </div>
            <div class="text-xs text-muted-foreground">3 giờ trước</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Set page title
useHead({
  title: 'Dashboard - HNI Operations'
})
</script>