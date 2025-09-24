<template>
  <nav class="flex items-center space-x-2 text-sm text-muted-foreground">
    <NuxtLink 
      to="/main/dashboard" 
      class="hover:text-foreground transition-colors"
    >
      Trang chủ
    </NuxtLink>
    
    <template v-for="(item, index) in breadcrumbs" :key="item.path">
      <ChevronRight class="h-4 w-4" />
      <NuxtLink 
        v-if="index < breadcrumbs.length - 1"
        :to="item.path" 
        class="hover:text-foreground transition-colors"
      >
        {{ item.name }}
      </NuxtLink>
      <span v-else class="text-foreground font-medium">
        {{ item.name }}
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

interface BreadcrumbItem {
  name: string
  path: string
}

interface Props {
  items?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

const route = useRoute()

// Generate breadcrumbs based on current route
const breadcrumbs = computed(() => {
  if (props.items.length > 0) {
    return props.items
  }
  
  // Auto-generate breadcrumbs from route
  const pathSegments = route.path.split('/').filter(Boolean)
  const breadcrumbItems: BreadcrumbItem[] = []
  
  // Vietnamese page names mapping
  const pageNames: Record<string, string> = {
    'main': 'Trang chính',
    'admin': 'Quản trị',
    'system': 'Hệ thống',
    'dashboard': 'Dashboard',
    'users': 'Người dùng',
  'git-log': 'Git Log',
    'reports': 'Báo cáo & Thống kê',
    'settings': 'Cài đặt hệ thống',
    'menu-management': 'Quản lý Menu hệ thống',
    'categories': 'Danh mục',
    'departments': 'Đơn vị',
    'system-notifications': 'Thông báo hệ thống',
    'about': 'Giới thiệu',
    'list': 'Danh sách',
    'add': 'Thêm mới',
    'roles': 'Phân quyền',
    'revenue': 'Báo cáo doanh thu',
    'general': 'Cấu hình chung',
    'security': 'Bảo mật',
    'password': 'Đổi mật khẩu',
    '2fa': 'Xác thực 2 yếu tố',
    'admin-role': 'Quyền quản trị',
    'user-role': 'Quyền người dùng'
  }
  
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // Use Vietnamese name if available, otherwise convert to readable name
    let name = pageNames[segment]
    
    if (!name) {
      // Handle special cases
      if (segment === 'index' || segment === '') {
        return // Skip index segments
      }
      
      // Convert kebab-case to readable name
      name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
    
    // Skip adding if it's the same as previous item (for nested routes)
    if (breadcrumbItems.length > 0 && breadcrumbItems[breadcrumbItems.length - 1].name === name) {
      return
    }
    
    breadcrumbItems.push({
      name,
      path: currentPath
    })
  })
  
  // Special handling for specific routes
  if (route.path === '/main/dashboard') {
    return [] // Dashboard doesn't need breadcrumb
  }
  
  // Remove "Trang chính" from breadcrumb if it's the first item and we're in main section
  if (breadcrumbItems.length > 0 && breadcrumbItems[0].name === 'Trang chính') {
    breadcrumbItems.shift()
  }
  
  return breadcrumbItems
})
</script>
