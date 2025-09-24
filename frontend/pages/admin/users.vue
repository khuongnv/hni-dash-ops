<template>
  <div class="space-y-4">
    <PageHeader
      title="Quản lý Người dùng"
      description="Quản lý thông tin người dùng trong hệ thống"
    />

    <!-- Actions Bar -->
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm người dùng..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="flex gap-3">
        <select
          v-model="statusFilter"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
        </select>
        <Button @click="openCreateModal" class="flex items-center gap-2">
          <Plus class="w-4 h-4" />
          Thêm người dùng
        </Button>
      </div>
    </div>

    <!-- Users Table -->
    <Card class="-mt-2">
      <CardHeader>
        <div class="flex justify-between items-start">
          <div>
            <CardTitle>Danh sách Người dùng</CardTitle>
          </div>
          <div class="text-sm text-gray-600">
            Tổng số bản ghi: {{ paginationInfo.total }}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-2 text-gray-600">Đang tải...</p>
        </div>

        <div v-else-if="users.length === 0" class="text-center py-8">
          <p class="text-gray-600">Không có người dùng nào</p>
        </div>

        <div v-else>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ tên</TableHead>
              <TableHead>Tên đăng nhập</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Đơn vị</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Chức vụ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead class="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="user in users" :key="user.id" class="table-row-fixed">
              <TableCell class="align-middle">
                <div class="font-medium text-foreground">{{ user.full_name }}</div>
              </TableCell>
              <TableCell class="align-middle">{{ user.username }}</TableCell>
              <TableCell class="align-middle">{{ user.email }}</TableCell>
              <TableCell class="align-middle">
                <Badge v-if="user.department" variant="outline" class="text-xs">
                  {{ user.department.name }}
                </Badge>
                <span v-else class="text-gray-500">-</span>
              </TableCell>
              <TableCell class="align-middle">
                <Badge v-if="user.role" variant="outline" class="text-xs">
                  {{ user.role.name }}
                </Badge>
                <span v-else class="text-gray-500">-</span>
              </TableCell>
              <TableCell class="align-middle">
                <Badge v-if="user.position" variant="outline" class="text-xs">
                  {{ user.position.name }}
                </Badge>
                <span v-else class="text-gray-500">-</span>
              </TableCell>
              <TableCell class="align-middle">
                <Badge :variant="user.status === 'active' ? 'default' : 'secondary'" class="text-xs">
                  {{ user.status === 'active' ? 'Hoạt động' : 'Không hoạt động' }}
                </Badge>
              </TableCell>
              <TableCell class="align-middle text-right">
                <div class="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    @click="openEditModal(user)"
                    class="flex items-center gap-1"
                  >
                    <Edit class="w-3 h-3" />
                    Sửa
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    @click="confirmDelete(user)"
                    class="flex items-center gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 class="w-3 h-3" />
                    Xóa
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <!-- Pagination -->
        <div v-if="pagination.totalPages > 1" class="flex items-center justify-between mt-6">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Hiển thị:</span>
            <select
              :value="pageSize"
              @change="changePageSize(parseInt(($event.target as HTMLSelectElement).value))"
              class="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span class="text-sm text-gray-600">bản ghi/trang</span>
          </div>

          <div class="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              :disabled="currentPage <= 1"
              @click="changePage(currentPage - 1)"
            >
              Trước
            </Button>
            
            <div class="flex items-center gap-1">
              <template v-for="page in getVisiblePages()" :key="page">
                <Button
                  v-if="page !== '...'"
                  :variant="page === currentPage ? 'default' : 'outline'"
                  size="sm"
                  @click="changePage(page as number)"
                  class="w-8 h-8 p-0"
                >
                  {{ page }}
                </Button>
                <span v-else class="px-2 text-gray-500">...</span>
              </template>
            </div>

            <Button
              variant="outline"
              size="sm"
              :disabled="currentPage >= pagination.totalPages"
              @click="changePage(currentPage + 1)"
            >
              Sau
            </Button>
          </div>
        </div>
        </div>
      </CardContent>
    </Card>

    <!-- Create/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <h3 class="text-lg font-semibold mb-4">
          {{ isEditing ? 'Sửa người dùng' : 'Thêm người dùng mới' }}
        </h3>

        <form @submit.prevent="submitForm" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label for="full_name">Họ và tên *</Label>
              <input
                id="full_name"
                v-model="form.full_name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div>
              <Label for="username">Tên đăng nhập *</Label>
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên đăng nhập"
              />
            </div>

            <div>
              <Label for="email">Email *</Label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"
              />
            </div>

            <div>
              <Label for="password">{{ isEditing ? 'Mật khẩu mới (để trống nếu không đổi)' : 'Mật khẩu *' }}</Label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                :required="!isEditing"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu"
              />
            </div>

            <div>
              <Label for="department_id">Đơn vị</Label>
              <select
                id="department_id"
                v-model="form.department_id"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn đơn vị</option>
                <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                  {{ dept.name }}
                </option>
              </select>
            </div>

            <div>
              <Label for="role_id">Vai trò</Label>
              <select
                id="role_id"
                v-model="form.role_id"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn vai trò</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.name }}
                </option>
              </select>
            </div>

            <div>
              <Label for="position_id">Chức vụ</Label>
              <select
                id="position_id"
                v-model="form.position_id"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn chức vụ</option>
                <option v-for="position in positions" :key="position.id" :value="position.id">
                  {{ position.name }}
                </option>
              </select>
            </div>

            <div>
              <Label for="gender_id">Giới tính</Label>
              <select
                id="gender_id"
                v-model="form.gender_id"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn giới tính</option>
                <option v-for="gender in genders" :key="gender.id" :value="gender.id">
                  {{ gender.name }}
                </option>
              </select>
            </div>

            <div>
              <Label for="dob">Ngày sinh</Label>
              <input
                id="dob"
                v-model="form.dob"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label for="status">Trạng thái</Label>
              <select
                id="status"
                v-model="form.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" @click="closeModal">
              Hủy
            </Button>
            <Button type="submit" :disabled="submitting">
              {{ submitting ? 'Đang xử lý...' : (isEditing ? 'Cập nhật' : 'Tạo mới') }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Plus, Edit, Trash2 } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardDescription from '~/components/ui/CardDescription.vue'
import CardContent from '~/components/ui/CardContent.vue'
import Table from '~/components/ui/Table.vue'
import TableHeader from '~/components/ui/TableHeader.vue'
import TableBody from '~/components/ui/TableBody.vue'
import TableHead from '~/components/ui/TableHead.vue'
import TableRow from '~/components/ui/TableRow.vue'
import TableCell from '~/components/ui/TableCell.vue'
import Badge from '~/components/ui/Badge.vue'
import Label from '~/components/ui/Label.vue'
import PageHeader from '~/components/PageHeader.vue'
import { useUsers, type User, type PaginationInfo } from '~/composables/useUsers'
import { useDepartments } from '~/composables/useDepartments'
import { useCategories } from '~/composables/useCategories'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const { getUsers, createUser, updateUser, deleteUser } = useUsers()
const { getDepartments } = useDepartments()
const { getCategories } = useCategories()

// State
const users = ref<User[]>([])
const departments = ref<any[]>([])
const roles = ref<any[]>([])
const positions = ref<any[]>([])
const genders = ref<any[]>([])
const loading = ref(false)
const showModal = ref(false)
const isEditing = ref(false)
const submitting = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')

// Pagination
const currentPage = ref(1)
const pageSize = ref(10)
const pagination = ref<PaginationInfo>({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0
})

// Form
const form = ref({
  id: null as number | null,
  full_name: '',
  username: '',
  password: '',
  email: '',
  department_id: null as number | null,
  role_id: null as number | null,
  position_id: null as number | null,
  gender_id: null as number | null,
  dob: '',
  status: 'active'
})

// Computed - Không cần client-side filtering nữa vì đã chuyển sang server-side

const paginationInfo = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.limit + 1
  const end = Math.min(pagination.value.page * pagination.value.limit, pagination.value.total)
  return {
    start,
    end,
    total: pagination.value.total
  }
})

// Methods
const loadData = async () => {
  loading.value = true
  try {
    const [usersResponse, departmentsData, categoriesData] = await Promise.all([
      getUsers(currentPage.value, pageSize.value, searchQuery.value.trim(), statusFilter.value),
      getDepartments(),
      getCategories()
    ])
    
    users.value = usersResponse.data
    pagination.value = usersResponse.pagination
    departments.value = departmentsData
    
    // Filter categories by parent_id
    roles.value = categoriesData.filter(cat => cat.parent_id === 11)
    positions.value = categoriesData.filter(cat => cat.parent_id === 16)
    genders.value = categoriesData.filter(cat => cat.parent_id === 17)
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

const changePage = async (page: number) => {
  currentPage.value = page
  await loadData()
}

const changePageSize = async (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  await loadData()
}

// Debounce search
let searchTimeout: NodeJS.Timeout | null = null
const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(async () => {
    currentPage.value = 1
    await loadData()
  }, 500)
}

// Watch for search and status changes
watch(searchQuery, debouncedSearch)
watch(statusFilter, async () => {
  currentPage.value = 1
  await loadData()
})

const getVisiblePages = () => {
  const totalPages = pagination.value.totalPages
  const current = currentPage.value
  const pages: (number | string)[] = []

  if (totalPages <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    if (current > 4) {
      pages.push('...')
    }

    // Show pages around current page
    const start = Math.max(2, current - 1)
    const end = Math.min(totalPages - 1, current + 1)

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i)
      }
    }

    if (current < totalPages - 3) {
      pages.push('...')
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }
  }

  return pages
}

const resetForm = () => {
  form.value = {
    id: null,
    full_name: '',
    username: '',
    password: '',
    email: '',
    department_id: null,
    role_id: null,
    position_id: null,
    gender_id: null,
    dob: '',
    status: 'active'
  }
}

const openCreateModal = () => {
  resetForm()
  isEditing.value = false
  showModal.value = true
}

const openEditModal = (user: User) => {
  form.value = {
    id: user.id,
    full_name: user.full_name,
    username: user.username,
    password: '',
    email: user.email,
    department_id: user.department_id || null,
    role_id: user.role_id || null,
    position_id: user.position_id || null,
    gender_id: user.gender_id || null,
    dob: user.dob || '',
    status: user.status
  }
  isEditing.value = true
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const submitForm = async () => {
  if (!form.value.full_name || !form.value.username || !form.value.email) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc')
    return
  }

  if (!isEditing.value && !form.value.password) {
    alert('Vui lòng nhập mật khẩu')
    return
  }

  submitting.value = true
  try {
    const formData = { ...form.value }
    
    // Remove password if empty when editing
    if (isEditing.value && !formData.password) {
      delete (formData as any).password
    }

    if (isEditing.value && formData.id) {
      await updateUser(formData.id, formData)
    } else {
      await createUser(formData)
    }

    await loadData()
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Có lỗi xảy ra khi lưu dữ liệu')
  } finally {
    submitting.value = false
  }
}

const confirmDelete = async (user: User) => {
  if (confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.full_name}"?`)) {
    try {
      await deleteUser(user.id)
      await loadData()
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Có lỗi xảy ra khi xóa người dùng')
    }
  }
}

// Lifecycle
onMounted(() => {
  loadData()
})
</script>
