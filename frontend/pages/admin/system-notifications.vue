<template>
  <div class="h-full flex flex-col space-y-6">
    <!-- Page Header -->
    <PageHeader 
      title="Quản lý Thông báo Hệ thống"
      description="Quản lý các thông báo và cảnh báo của hệ thống"
    />

    <!-- Actions Bar -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <Button @click="openCreateModal" class="flex items-center gap-2">
          <Plus class="w-4 h-4" />
          Thêm thông báo mới
        </Button>
        <Button variant="outline" @click="loadNotifications" :disabled="loading">
          <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Làm mới
        </Button>
      </div>
      
      <div class="flex items-center gap-2">
        <select 
          v-model="filterType" 
          @change="applyFilters"
          class="w-40 h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="all">Tất cả</option>
          <option value="info">Thông tin</option>
          <option value="warning">Cảnh báo</option>
          <option value="error">Lỗi</option>
          <option value="success">Thành công</option>
        </select>
        
        <select 
          v-model="filterStatus" 
          @change="applyFilters"
          class="w-40 h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="all">Tất cả</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Tạm dừng</option>
        </select>
        
        <Input 
          v-model="searchQuery"
          placeholder="Tìm kiếm thông báo..." 
          class="w-64"
        />
      </div>
    </div>

    <!-- Notifications Table -->
    <Card>
      <CardHeader>
        <CardTitle>Danh sách Thông báo</CardTitle>
        <CardDescription>
          Tổng cộng {{ filteredNotifications.length }} thông báo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-12">#</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead class="w-32">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell colspan="6" class="text-center py-8">
                  <div class="flex items-center justify-center gap-2">
                    <RefreshCw class="w-4 h-4 animate-spin" />
                    Đang tải...
                  </div>
                </TableCell>
              </TableRow>
              <TableRow v-else-if="filteredNotifications.length === 0">
                <TableCell colspan="6" class="text-center py-8 text-muted-foreground">
                  Không có thông báo nào
                </TableCell>
              </TableRow>
              <TableRow v-else v-for="notification in filteredNotifications" :key="notification.id"
                :class="{
                  'bg-blue-50/50': notification.type === 'info',
                  'bg-yellow-50/50': notification.type === 'warning',
                  'bg-red-50/50': notification.type === 'error',
                  'bg-green-50/50': notification.type === 'success'
                }"
              >
                <TableCell class="font-medium">{{ notification.id }}</TableCell>
                <TableCell>
                  <div class="space-y-1">
                    <div class="font-medium">{{ notification.title }}</div>
                    <div class="text-sm text-muted-foreground line-clamp-2">
                      {{ notification.message }}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge :variant="getTypeVariant(notification.type)" :class="getTypeClass(notification.type)">
                    {{ getTypeLabel(notification.type) }}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge :variant="notification.status === 'active' ? 'default' : 'destructive'">
                    {{ notification.status === 'active' ? 'Hoạt động' : 'Tạm dừng' }}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div class="text-sm">
                    {{ formatDate(notification.created_at) }}
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      @click="openEditModal(notification)"
                    >
                      <Edit class="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      @click="confirmDelete(notification)"
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
            {{ isEditing ? 'Chỉnh sửa Thông báo' : 'Thêm Thông báo Mới' }}
          </CardTitle>
          <CardDescription>
            {{ isEditing ? 'Cập nhật thông tin thông báo' : 'Tạo thông báo mới cho hệ thống' }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="space-y-2">
              <Label for="title">Tiêu đề *</Label>
              <input 
                id="title"
                v-model="form.title"
                placeholder="Nhập tiêu đề thông báo"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
            
            <div class="space-y-2">
              <Label for="message">Nội dung *</Label>
              <textarea 
                id="message"
                v-model="form.message"
                placeholder="Nhập nội dung thông báo"
                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="type">Loại thông báo</Label>
                <select 
                  v-model="form.type"
                  class="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="info">Thông tin</option>
                  <option value="warning">Cảnh báo</option>
                  <option value="error">Lỗi</option>
                  <option value="success">Thành công</option>
                </select>
              </div>
              
              <div class="space-y-2">
                <Label for="status">Trạng thái</Label>
                <select 
                  v-model="form.status"
                  class="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                </select>
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="start_at">Bắt đầu (tùy chọn)</Label>
                <input 
                  id="start_at"
                  v-model="form.start_at"
                  type="date"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="end_at">Kết thúc (tùy chọn)</Label>
                <input 
                  id="end_at"
                  v-model="form.end_at"
                  type="date"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
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
            Bạn có chắc chắn muốn xóa thông báo này không?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <p><strong>Tiêu đề:</strong> {{ notificationToDelete?.title }}</p>
            <p><strong>Loại:</strong> {{ getTypeLabel(notificationToDelete?.type) }}</p>
            <p class="text-sm text-muted-foreground">
              Hành động này không thể hoàn tác.
            </p>
          </div>
          <div class="flex justify-end gap-2 pt-4">
            <Button variant="outline" @click="closeDeleteModal">
              Hủy
            </Button>
            <Button variant="destructive" @click="deleteNotification" :disabled="deleting">
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
import { ref, computed, onMounted } from 'vue'
import { 
  Plus, 
  RefreshCw, 
  Edit, 
  Trash2,
  Check
} from 'lucide-vue-next'

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
  title: 'Quản lý Thông báo Hệ thống - HNI Dashboard'
})

// Types
interface SystemNotification {
  id: number
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  status: 'active' | 'inactive'
  created_by: number | null
  start_at: string | null
  end_at: string | null
  created_at: string
  updated_at: string
}

// Use composable
const { 
  getNotifications, 
  createNotification, 
  updateNotification, 
  deleteNotification: deleteNotificationAPI,
  markAsRead: markAsReadAPI
} = useSystemNotifications()

// Reactive data
const notifications = ref<SystemNotification[]>([])
const loading = ref(false)
const submitting = ref(false)
const deleting = ref(false)
const searchQuery = ref('')
const filterType = ref('all')
const filterStatus = ref('all')
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const notificationToDelete = ref<SystemNotification | null>(null)

// Form data
const form = ref<Partial<SystemNotification> & { id: number | null }>({
  id: null,
  title: '',
  message: '',
  type: 'info',
  status: 'active',
  start_at: null,
  end_at: null
})


// Computed properties
const filteredNotifications = computed(() => {
  let result = notifications.value
  
  // Apply search filter
  if (searchQuery.value) {
    const searchTerm = searchQuery.value.toLowerCase()
    result = result.filter(notification => 
      notification.title.toLowerCase().includes(searchTerm) ||
      notification.message.toLowerCase().includes(searchTerm)
    )
  }
  
  // Apply type filter
  if (filterType.value && filterType.value !== 'all') {
    result = result.filter(notification => notification.type === filterType.value)
  }
  
  // Apply status filter
  if (filterStatus.value && filterStatus.value !== 'all') {
    result = result.filter(notification => notification.status === filterStatus.value)
  }
  
  return result
})

// Helper functions
const getTypeLabel = (type: string) => {
  const labels = {
    info: 'Thông tin',
    warning: 'Cảnh báo',
    error: 'Lỗi',
    success: 'Thành công'
  }
  return labels[type] || type
}

const getTypeVariant = (type: string) => {
  const variants = {
    info: 'secondary',
    warning: 'secondary',
    error: 'destructive',
    success: 'default'
  }
  return variants[type] || 'secondary'
}

const getTypeClass = (type: string) => {
  const classes = {
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800'
  }
  return classes[type] || ''
}


const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('vi-VN')
}

const formatDateForInput = (dateString: string | null) => {
  if (!dateString) return null
  // Tạo date object mà không bị ảnh hưởng bởi timezone
  const date = new Date(dateString + 'T00:00:00')
  // Sử dụng local date thay vì UTC
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Methods
const loadNotifications = async () => {
  try {
    loading.value = true
    const data = await getNotifications()
    notifications.value = data || []
  } catch (error) {
    console.error('Error loading notifications:', error)
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  // Filters are applied automatically via computed property
}

const resetForm = () => {
  form.value = {
    id: null,
    title: '',
    message: '',
    type: 'info',
    status: 'active',
    start_at: null,
    end_at: null
  }
}

const openCreateModal = () => {
  isEditing.value = false
  resetForm()
  showModal.value = true
}

const openEditModal = (notification: SystemNotification) => {
  isEditing.value = true
  showModal.value = true
  
  form.value = {
    id: notification.id,
    title: notification.title,
    message: notification.message,
    type: notification.type,
    status: notification.status,
    start_at: formatDateForInput(notification.start_at),
    end_at: formatDateForInput(notification.end_at)
  }
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const submitForm = async () => {
  try {
    submitting.value = true
    
    
    // Validation
    if (!form.value.title || !form.value.title.trim()) {
      alert('Vui lòng nhập tiêu đề thông báo')
      return
    }
    
    if (!form.value.message || !form.value.message.trim()) {
      alert('Vui lòng nhập nội dung thông báo')
      return
    }
    
    const notificationData = {
      title: form.value.title.trim(),
      message: form.value.message.trim(),
      type: form.value.type,
      status: form.value.status,
      start_at: form.value.start_at,
      end_at: form.value.end_at
    }
    
    
    if (isEditing.value) {
      await updateNotification(form.value.id!, notificationData)
    } else {
      await createNotification(notificationData)
    }
    
    await loadNotifications()
    closeModal()
  } catch (error) {
    console.error('Error saving notification:', error)
  } finally {
    submitting.value = false
  }
}

const confirmDelete = (notification: SystemNotification) => {
  notificationToDelete.value = notification
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  notificationToDelete.value = null
}

const deleteNotification = async () => {
  if (!notificationToDelete.value) return
  
  try {
    deleting.value = true
    await deleteNotificationAPI(notificationToDelete.value.id)
    await loadNotifications()
    closeDeleteModal()
  } catch (error) {
    console.error('Error deleting notification:', error)
  } finally {
    deleting.value = false
  }
}


// Lifecycle
onMounted(() => {
  loadNotifications()
})
</script>
