<template>
  <header class="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
    <div class="flex h-16 items-center justify-between px-6">
      <!-- Left side -->
      <div class="flex items-center space-x-2">
        <!-- Hamburger menu toggle -->
        <Button
          variant="ghost"
          size="sm"
          class="h-18 w-18 p-0 hover:bg-accent/50 transition-colors"
          @click="$emit('toggle-sidebar')"
        >
          <Menu class="h-8 w-8" />
        </Button>
        
        <!-- System name -->
        <h1 class="text-lg font-semibold text-foreground">HỆ THỐNG QUẢN LÝ NHIỆM VỤ</h1>
      </div>

      <!-- Right side -->
      <div class="flex items-center space-x-4">
        <!-- Theme toggle -->
        <Button
          variant="ghost"
          size="sm"
          class="h-9 w-9 p-0 hover:bg-accent/50 transition-colors"
          @click="toggleColorMode"
        >
          <component :is="isDark ? Sun : Moon" class="h-4 w-4 transition-transform duration-200" />
        </Button>

        <!-- User menu -->
        <ClientOnly>
          <template v-if="isInitialized">
            <DropdownMenu v-if="isAuthenticated">
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="relative h-9 w-9 rounded-full hover:bg-accent/50 transition-colors p-0">
                  <Avatar class="h-8 w-8">
                    <AvatarFallback>{{ getUserInitials() }}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-64" align="end">
                <DropdownMenuLabel class="font-normal">
                  <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium leading-none">{{ getUserDisplayName() }}</p>
                    <p class="text-xs leading-none text-muted-foreground">
                      {{ getCurrentUser()?.email }}
                    </p>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span v-if="getRole()" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {{ getRole() }}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User class="mr-2 h-4 w-4" />
                  <span>Hồ sơ</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings class="mr-2 h-4 w-4" />
                  <span>Cài đặt</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="handleLogout">
                  <LogOut class="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <!-- Login button when not authenticated -->
            <Button v-else @click="goToLogin" variant="outline" size="sm">
              Đăng nhập
            </Button>
          </template>
          
          <!-- Loading state -->
          <div v-else class="h-9 w-9 flex items-center justify-center">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { 
  Menu, 
  Sun, 
  Moon, 
  User, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

// Import UI components explicitly
import Button from '~/components/ui/Button.vue'
import DropdownMenu from '~/components/ui/DropdownMenu.vue'
import DropdownMenuTrigger from '~/components/ui/DropdownMenuTrigger.vue'
import DropdownMenuContent from '~/components/ui/DropdownMenuContent.vue'
import DropdownMenuLabel from '~/components/ui/DropdownMenuLabel.vue'
import DropdownMenuSeparator from '~/components/ui/DropdownMenuSeparator.vue'
import DropdownMenuItem from '~/components/ui/DropdownMenuItem.vue'
import Avatar from '~/components/ui/Avatar.vue'
import AvatarFallback from '~/components/ui/AvatarFallback.vue'
import { useAuth } from '~/composables/useAuth'
import { useSSO } from '~/composables/useSSO'

interface Props {
  collapsed: boolean
}

defineProps<Props>()
defineEmits<{
  'toggle-sidebar': []
}>()

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const router = useRouter()

// Auth
const { 
  isAuthenticated, 
  isInitialized,
  getCurrentUser, 
  getUserDisplayName, 
  getRole, 
  logout 
} = useAuth()

// SSO
const { isSSOSession } = useSSO()

// Toggle color mode
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Get user initials for avatar
const getUserInitials = () => {
  const user = getCurrentUser()
  if (!user) return 'U'
  
  // Use firstName and lastName if available, otherwise use username
  const name = (user.firstName && user.lastName) 
    ? `${user.firstName} ${user.lastName}` 
    : user.username || 'User'
  
  const words = name.split(' ')
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

// Handle logout
const handleLogout = () => {
  logout()
  router.push('/login')
}

// Go to login
const goToLogin = () => {
  router.push('/login')
}
</script>
