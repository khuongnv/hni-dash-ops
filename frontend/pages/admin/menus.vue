<template>
  <div class="h-full flex flex-col space-y-6">
    <!-- Page Header -->
    <PageHeader 
      title="Quản lý Menu hệ thống"
      description="Quản lý cấu trúc menu và điều hướng của hệ thống"
    />

    <!-- Actions Bar -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <Button @click="openCreateModal" class="flex items-center gap-2">
          <Plus class="w-4 h-4" />
          Thêm menu mới
        </Button>
        <Button variant="outline" @click="loadMenus" :disabled="loading">
          <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Làm mới
        </Button>
      </div>
      
      <div class="flex items-center gap-2">
        <Input 
          :value="searchQuery"
          @input="searchQuery = $event.target.value"
          placeholder="Tìm kiếm menu..." 
          class="w-64"
        />
      </div>
    </div>

    <!-- Menu Table -->
    <Card>
      <CardHeader>
        <CardTitle>Danh sách Menu</CardTitle>
        <CardDescription>
          Tổng cộng {{ filteredMenus.length }} menu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-12">#</TableHead>
                <TableHead>Tên menu</TableHead>
                <TableHead>Đường dẫn</TableHead>
                <TableHead>Menu cha</TableHead>
                <TableHead>Thứ tự</TableHead>
                <TableHead>Cấp</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead class="w-32">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell colspan="8" class="text-center py-8">
                  <div class="flex items-center justify-center gap-2">
                    <RefreshCw class="w-4 h-4 animate-spin" />
                    Đang tải...
                  </div>
                </TableCell>
              </TableRow>
              <TableRow v-else-if="filteredMenus.length === 0">
                <TableCell colspan="8" class="text-center py-8 text-muted-foreground">
                  Không có menu nào
                </TableCell>
              </TableRow>
              <TableRow v-else v-for="menu in filteredMenus" :key="menu.Id" 
                :class="{
                  'bg-primary/5 border-l-4 border-l-primary': menu.Level === 1,
                  'bg-blue-50/50 border-l-4 border-l-blue-500': menu.Level === 2,
                  'bg-green-50/50 border-l-4 border-l-green-500': menu.Level === 3,
                  'bg-orange-50/50 border-l-4 border-l-orange-500': menu.Level >= 4
                }"
              >
                <TableCell class="font-medium">{{ menu.Id }}</TableCell>
                <TableCell>
                  <div class="flex items-center gap-2">
                    <!-- Tree structure indicators -->
                    <div class="flex items-center">
                      <template v-for="i in menu.Level - 1" :key="i">
                        <div class="w-4 h-4 flex items-center justify-center">
                          <div v-if="i === menu.Level - 1" class="w-3 h-3 flex items-center justify-center">
                            <!-- Last level indicator -->
                            <div class="w-4 h-4 border-l-2 border-b-2 border-muted-foreground/60 rounded-bl-sm"></div>
                          </div>
                          <div v-else class="w-3 h-3 flex items-center justify-center">
                            <!-- Middle level indicator -->
                            <div class="w-px h-3 bg-border"></div>
                          </div>
                        </div>
                      </template>
                    </div>
                    
                    <div :class="[
                      'flex items-center justify-center rounded-md',
                      menu.Level === 1 ? 'w-8 h-8 bg-primary/10 border border-primary/20' : 
                      menu.Level === 2 ? 'w-6 h-6 bg-blue-50 border border-blue-200' :
                      menu.Level === 3 ? 'w-6 h-6 bg-green-50 border border-green-200' :
                      'w-6 h-6 bg-orange-50 border border-orange-200'
                    ]">
                      <component 
                        :is="getIconComponent(menu.Icon)" 
                        :class="[
                          'w-4 h-4',
                          menu.Level === 1 ? 'text-primary' : 
                          menu.Level === 2 ? 'text-blue-600' : 
                          menu.Level === 3 ? 'text-green-600' : 'text-orange-600'
                        ]" 
                      />
                    </div>
                    
                    <!-- Collapse/Expand button using ChevronRight -->
                    <button 
                      v-if="hasChildren(menu.Id)"
                      @click="toggleMenuCollapse(menu.Id)"
                      class="flex items-center justify-center w-4 h-4 rounded hover:bg-muted transition-colors cursor-pointer"
                      :title="isMenuCollapsed(menu.Id) ? 'Mở rộng' : 'Thu gọn'"
                    >
                      <ChevronRight 
                        :class="[
                          'w-3 h-3 transition-transform duration-200 text-muted-foreground',
                          isMenuCollapsed(menu.Id) ? 'rotate-0' : 'rotate-90'
                        ]"
                      />
                    </button>
                    <div v-else class="w-4 h-4"></div>
                    
                    <span :class="{ 
                      'font-semibold text-foreground': menu.Level === 1,
                      'font-medium text-blue-700': menu.Level === 2,
                      'text-green-700': menu.Level === 3,
                      'text-orange-700': menu.Level >= 4
                    }">
                      {{ menu.Name }}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <code class="text-xs bg-muted px-1 rounded">
                    {{ menu.Href === '#parent' ? '#' : menu.Href }}
                  </code>
                </TableCell>
                <TableCell>
                  <span v-if="menu.ParentId" class="text-sm text-muted-foreground">
                    {{ getParentName(menu.ParentId) }}
                  </span>
                  <span v-else class="text-sm text-muted-foreground">-</span>
                </TableCell>
                <TableCell>{{ menu.Order }}</TableCell>
                <TableCell>
                  <Badge :variant="
                    menu.Level === 1 ? 'secondary' : 
                    menu.Level === 2 ? 'secondary' : 
                    menu.Level === 3 ? 'outline' : 'secondary'
                  " :class="{
                    'bg-red-100 text-red-800 font-medium': menu.Level === 1,
                    'bg-blue-100 text-blue-800 font-medium': menu.Level === 2,
                    'bg-green-100 text-green-800 font-medium': menu.Level === 3,
                    'bg-orange-100 text-orange-800 font-medium': menu.Level >= 4
                  }">
                    <span :class="{
                      'text-red-800': menu.Level === 1,
                      'text-blue-800': menu.Level === 2,
                      'text-green-800': menu.Level === 3,
                      'text-orange-800': menu.Level >= 4
                    }">
                      Cấp {{ menu.Level }}
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge :variant="menu.IsActive ? 'default' : 'destructive'">
                    {{ menu.IsActive ? 'Hoạt động' : 'Tạm dừng' }}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      @click="openEditModal(menu)"
                    >
                      <Edit class="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      @click="confirmDelete(menu)"
                      class="text-destructive hover:text-destructive"
                    >
                      <Trash2 class="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black/50" @click="closeModal"></div>
      <Card class="relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>
            {{ isEditing ? 'Chỉnh sửa Menu' : 'Thêm Menu Mới' }}
          </CardTitle>
          <CardDescription>
            {{ isEditing ? 'Cập nhật thông tin menu' : 'Tạo menu mới cho hệ thống' }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          
          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="name">Tên menu *</Label>
                <Input 
                  id="name"
                  :value="form.name"
                  @input="form.name = $event.target.value"
                  placeholder="Nhập tên menu"
                  required
                />
              </div>
              
              <div class="space-y-2">
                <Label for="href">Đường dẫn</Label>
                <Input 
                  id="href"
                  :value="form.href"
                  @input="form.href = $event.target.value"
                  placeholder="/path/to/page (dùng # cho menu cha)"
                />
                <p class="text-xs text-muted-foreground">
                  Dùng "#" nếu menu này chỉ dùng để phân tầng (có menu con)
                </p>
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="icon">Icon</Label>
                <select 
                  id="icon"
                  :value="form.icon"
                  @change="form.icon = $event.target.value"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option 
                    v-for="icon in availableIcons" 
                    :key="icon" 
                    :value="icon"
                  >
                    {{ icon }}
                  </option>
                </select>
              </div>
              
              <div class="space-y-2">
                <Label for="order">Thứ tự</Label>
                <Input 
                  id="order"
                  :value="form.order"
                  @input="form.order = parseInt(($event.target as HTMLInputElement).value) || 1"
                  type="number"
                  min="1"
                  placeholder="1"
                />
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="parent">Menu cha</Label>
                <select 
                  id="parent"
                  :value="form.parent_id"
                  @change="updateParentAndLevel(($event.target as HTMLSelectElement).value)"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option :value="null">Không có menu cha</option>
                  <option 
                    v-for="parent in parentMenus" 
                    :key="parent.id" 
                    :value="parent.id"
                  >
                    {{ '  '.repeat(parent.level - 1) }}{{ parent.name }}
                  </option>
                </select>
              </div>
              
              <div class="space-y-2">
                <Label>Cấp menu</Label>
                <div class="flex h-10 w-full items-center rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
                  {{ form.level }}
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <input 
                id="is_active"
                :checked="form.is_active"
                @change="form.is_active = ($event.target as HTMLInputElement).checked"
                type="checkbox"
                class="rounded"
              />
              <Label for="is_active">Menu hoạt động</Label>
            </div>

            <div class="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" @click="closeModal">
                Hủy
              </Button>
              <Button type="submit" :disabled="submitting">
                <RefreshCw v-if="submitting" class="w-4 h-4 animate-spin mr-2" />
                {{ isEditing ? 'Cập nhật' : 'Tạo mới' }}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black/50" @click="closeDeleteModal"></div>
      <Card class="relative w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle class="text-destructive">Xác nhận xóa</CardTitle>
          <CardDescription>
            Bạn có chắc chắn muốn xóa menu này không?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <p><strong>Tên:</strong> {{ menuToDelete?.name }}</p>
            <p><strong>Đường dẫn:</strong> {{ menuToDelete?.href }}</p>
            <p class="text-sm text-muted-foreground">
              Hành động này không thể hoàn tác.
            </p>
          </div>
          <div class="flex justify-end gap-2 pt-4">
            <Button variant="outline" @click="closeDeleteModal">
              Hủy
            </Button>
            <Button variant="destructive" @click="deleteMenu" :disabled="deleting">
              <RefreshCw v-if="deleting" class="w-4 h-4 animate-spin mr-2" />
              Xóa
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue'
import { 
  Plus, 
  RefreshCw, 
  Edit, 
  Trash2,
  ChevronRight
} from 'lucide-vue-next'

// Import composables
import { useMenus } from '~/composables/useMenus'

// Import UI components
import PageHeader from '~/components/PageHeader.vue'
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardDescription from '~/components/ui/CardDescription.vue'
import CardContent from '~/components/ui/CardContent.vue'
import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'
import Label from '~/components/ui/Label.vue'
import Select from '~/components/ui/Select.vue'
import SelectContent from '~/components/ui/SelectContent.vue'
import SelectItem from '~/components/ui/SelectItem.vue'
import SelectTrigger from '~/components/ui/SelectTrigger.vue'
import SelectValue from '~/components/ui/SelectValue.vue'
import Table from '~/components/ui/Table.vue'
import TableBody from '~/components/ui/TableBody.vue'
import TableCell from '~/components/ui/TableCell.vue'
import TableHead from '~/components/ui/TableHead.vue'
import TableHeader from '~/components/ui/TableHeader.vue'
import TableRow from '~/components/ui/TableRow.vue'
import Badge from '~/components/ui/Badge.vue'

// Set page meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Set page title
useHead({
  title: 'Quản lý Menu - HNI Dashboard'
})

// Types
interface Menu {
  Id: number
  Name: string
  Href: string
  Icon: string
  Order: number
  ParentId: number | null
  Level: number
  IsActive: boolean
  ParentName?: string
  Description?: string
  IsVisible: boolean
  Target?: string
  CssClass?: string
  DataAttributes?: string
  CreatedAt: string
  UpdatedAt?: string
}

// Reactive data
const menus = ref<Menu[]>([])
const loading = ref(false)
const submitting = ref(false)
const deleting = ref(false)
const searchQuery = ref('')
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const menuToDelete = ref<Menu | null>(null)
const collapsedMenus = ref<Set<number>>(new Set())

// Inject sidebar refresh function
const refreshSidebar = inject('refreshSidebar', () => {})

// Helper function to trigger sidebar refresh
const triggerSidebarRefresh = () => {
  refreshSidebar()
  // Trigger storage event for other tabs/windows
  localStorage.setItem('menus-updated', Date.now().toString())
}

// Helper function to check if menu has children
const hasChildren = (menuId: number): boolean => {
  return menus.value.some(menu => menu.ParentId === menuId)
}

// Helper function to toggle menu collapse
const toggleMenuCollapse = (menuId: number) => {
  if (collapsedMenus.value.has(menuId)) {
    collapsedMenus.value.delete(menuId)
  } else {
    collapsedMenus.value.add(menuId)
  }
}

// Helper function to check if menu is collapsed
const isMenuCollapsed = (menuId: number): boolean => {
  return collapsedMenus.value.has(menuId)
}

// Helper function to check if any parent is collapsed
const isAnyParentCollapsed = (menu: Menu): boolean => {
  if (!menu.parent_id) return false
  
  const parent = menus.value.find(m => m.id === menu.parent_id)
  if (!parent) return false
  
  if (isMenuCollapsed(parent.id)) return true
  
  return isAnyParentCollapsed(parent)
}

// Form data
const form = ref<Partial<Menu> & { id: number | null }>({
  id: null,
  name: '',
  href: '',
  icon: 'Menu',
  order: 1,
  parent_id: null,
  level: 1,
  is_active: true
})

// Use icons composable
const { availableIcons, getIconComponent } = useIcons()

// Helper function to build tree structure
const buildTreeStructure = (menus: Menu[]) => {
  const result: Menu[] = []
  const processed = new Set<number>()
  
  // First, add all level 1 menus (root menus)
  const rootMenus = menus.filter(menu => menu.Level === 1).sort((a, b) => a.Order - b.Order)
  
  const addMenuAndChildren = (menu: Menu) => {
    if (processed.has(menu.Id)) return
    
    // Only add menu if no parent is collapsed
    if (!isAnyParentCollapsed(menu)) {
      result.push(menu)
      processed.add(menu.Id)
      
      // Only add children if current menu is not collapsed
      if (!isMenuCollapsed(menu.Id)) {
        const children = menus
          .filter(child => child.ParentId === menu.Id)
          .sort((a, b) => a.Order - b.Order)
        
        children.forEach(child => addMenuAndChildren(child))
      }
    }
  }
  
  // Process all root menus and their descendants
  rootMenus.forEach(rootMenu => addMenuAndChildren(rootMenu))
  
  // Add any remaining menus that weren't processed (orphaned menus)
  menus.forEach(menu => {
    if (!processed.has(menu.Id) && !isAnyParentCollapsed(menu)) {
      result.push(menu)
    }
  })
  
  return result
}

// Helper function to remove Vietnamese diacritics
const removeDiacritics = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}

// Helper function to get all parent menus
const getAllParentMenus = (menu: Menu): Menu[] => {
  const parents: Menu[] = []
  let currentParent = menu.ParentId
  
  while (currentParent) {
    const parent = menus.value.find(m => m.Id === currentParent)
    if (parent) {
      parents.unshift(parent) // Add to beginning to maintain order
      currentParent = parent.ParentId
    } else {
      break
    }
  }
  
  return parents
}

// Computed properties
const filteredMenus = computed(() => {
  let result = menus.value
  
  // Apply search filter if needed
  if (searchQuery.value) {
    const searchTerm = searchQuery.value.toLowerCase()
    const searchTermNoDiacritics = removeDiacritics(searchTerm)
    
    const matchingMenus = result.filter(menu => {
      const menuName = menu.Name.toLowerCase()
      const menuNameNoDiacritics = removeDiacritics(menuName)
      const menuHref = menu.Href.toLowerCase()
      const menuHrefNoDiacritics = removeDiacritics(menuHref)
      
      return menuName.includes(searchTerm) ||
             menuNameNoDiacritics.includes(searchTermNoDiacritics) ||
             menuHref.includes(searchTerm) ||
             menuHrefNoDiacritics.includes(searchTermNoDiacritics)
    })
    
    // Include all parent menus for matching menus
    const allMenusToShow = new Set<number>()
    
    matchingMenus.forEach(menu => {
      // Add the matching menu itself
      allMenusToShow.add(menu.Id)
      
      // Add all its parent menus
      const parents = getAllParentMenus(menu)
      parents.forEach(parent => allMenusToShow.add(parent.Id))
    })
    
    // Filter to only show menus that should be displayed
    result = result.filter(menu => allMenusToShow.has(menu.Id))
  }
  
  // Build tree structure for proper hierarchy display
  return buildTreeStructure(result)
})

const parentMenus = computed(() => {
  return menus.value.filter(menu => menu.Level < 4)
})

// Methods

const getParentName = (parentId) => {
  const parent = menus.value.find(m => m.Id === parentId)
  return parent ? parent.Name : 'Không tìm thấy'
}

const loadMenus = async () => {
  try {
    loading.value = true
    const { getMenus } = useMenus()
    const menuData = await getMenus()
    menus.value = menuData || []
  } catch (error) {
    console.error('Error loading menus:', error)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    id: null,
    name: '',
    href: '',
    icon: 'Menu',
    order: 1,
    parent_id: null,
    level: 1,
    is_active: true
  }
}

const updateParentAndLevel = (parentId: string) => {
  form.value.parent_id = parentId ? parseInt(parentId) : null
  
  if (parentId) {
    const parent = menus.value.find(m => m.id === parseInt(parentId))
    form.value.level = parent ? parent.level + 1 : 1
  } else {
    form.value.level = 1
  }
}

const openCreateModal = () => {
  isEditing.value = false
  resetForm()
  showModal.value = true
}

const openEditModal = (menu: Menu) => {
  isEditing.value = true
  showModal.value = true
  
  // Assign values directly without resetForm to preserve data
  form.value.id = menu.id
  form.value.name = menu.name
  form.value.href = menu.href
  form.value.icon = menu.icon
  form.value.order = menu.order
  form.value.parent_id = menu.parent_id
  form.value.is_active = menu.is_active
  
  // Calculate level based on parent
  if (menu.parent_id) {
    const parent = menus.value.find(m => m.id === menu.parent_id)
    form.value.level = parent ? parent.level + 1 : 1
  } else {
    form.value.level = 1
  }
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const submitForm = async () => {
  try {
    submitting.value = true
    
    if (isEditing.value) {
      // Update existing menu
      const menuData = {
        name: form.value.name,
        href: form.value.href,
        icon: form.value.icon,
        order: form.value.order,
        parent_id: form.value.parent_id,
        level: form.value.level,
        is_active: form.value.is_active
      }
      
      
      const response = await $fetch(`/api/menus/${form.value.id}`, {
        method: 'PUT',
        body: menuData
      })
      
      if (response.success) {
        await loadMenus()
        triggerSidebarRefresh() // Refresh sidebar
        closeModal()
      }
    } else {
      // Create new menu
      const menuData = {
        name: form.value.name,
        href: form.value.href,
        icon: form.value.icon,
        order: form.value.order,
        parent_id: form.value.parent_id,
        level: form.value.level,
        is_active: form.value.is_active
      }
      
      
      const response = await $fetch('/api/menus', {
        method: 'POST',
        body: menuData
      })
      
      if (response.success) {
        await loadMenus()
        triggerSidebarRefresh() // Refresh sidebar
        closeModal()
      }
    }
  } catch (error) {
    console.error('Error saving menu:', error)
  } finally {
    submitting.value = false
  }
}

const confirmDelete = (menu: Menu) => {
  menuToDelete.value = menu
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  menuToDelete.value = null
}

const deleteMenu = async () => {
  if (!menuToDelete.value) return
  
  try {
    deleting.value = true
    const response = await $fetch(`/api/menus/${menuToDelete.value.id}`, {
      method: 'DELETE'
    })
    
    if (response.success) {
      await loadMenus()
      triggerSidebarRefresh() // Refresh sidebar
      closeDeleteModal()
    }
  } catch (error) {
    console.error('Error deleting menu:', error)
  } finally {
    deleting.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadMenus()
  
  // Force refresh sidebar when page loads
  refreshSidebar()
})
</script>