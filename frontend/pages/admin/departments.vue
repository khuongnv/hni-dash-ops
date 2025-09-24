<template>
  <div class="h-full flex flex-col space-y-4">
    <!-- Page Header -->
    <PageHeader 
      title="Quản lý Đơn vị" 
      description="Quản lý cấu trúc tổ chức và đơn vị"
    />

    <!-- Actions Bar -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <Button @click="openCreateModal" class="flex items-center gap-2">
          <Plus class="w-4 h-4" />
          Thêm đơn vị mới
        </Button>
        <Button variant="outline" @click="loadDepartments" :disabled="loading">
          <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Làm mới
        </Button>
      </div>
      
      <div class="flex items-center gap-2">
        <select 
          v-model="parentFilter" 
          @change="applyFilters"
          class="w-40 h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="all">Tất cả</option>
          <option value="root">Đơn vị gốc</option>
          <option value="child">Đơn vị con</option>
        </select>
        
        <input 
          :value="searchQuery"
          @input="searchQuery = ($event.target as HTMLInputElement).value"
          placeholder="Tìm kiếm đơn vị..." 
          class="w-64 h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
      </div>
    </div>

    <!-- Departments Table -->
    <Card class="-mt-2">
      <CardHeader>
        <CardTitle>Danh sách Đơn vị</CardTitle>
        <CardDescription>
          Tổng cộng {{ filteredDepartments.length }} đơn vị
          <span v-if="searchQuery" class="text-blue-600">
            (Tìm kiếm: "{{ searchQuery }}")
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-12">#</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Tên đơn vị</TableHead>
                <TableHead>Đơn vị cha</TableHead>
                <TableHead>Cấp</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead>Ghi chú</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead class="w-32">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell colspan="9" class="text-center py-8">
                  <div class="flex items-center justify-center gap-2">
                    <RefreshCw class="w-4 h-4 animate-spin" />
                    Đang tải...
                  </div>
                </TableCell>
              </TableRow>
              <TableRow v-else-if="filteredDepartments.length === 0">
                <TableCell colspan="9" class="text-center py-8 text-muted-foreground">
                  Không có đơn vị nào
                </TableCell>
              </TableRow>
              <TableRow v-else v-for="department in filteredDepartments" :key="department.id" class="table-row-fixed">
                <TableCell class="font-medium align-middle">{{ department.id }}</TableCell>
                <TableCell class="align-middle">
                  <Badge variant="outline">{{ department.code }}</Badge>
                </TableCell>
                <TableCell class="align-middle">
                  <div class="flex items-center gap-2">
                    <!-- Tree structure indicators -->
                    <div class="flex items-center">
                      <template v-for="i in department.level - 1" :key="i">
                        <div class="w-4 h-4 flex items-center justify-center">
                          <div v-if="i === department.level - 1" class="w-3 h-3 flex items-center justify-center">
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
                    
                    <!-- Collapse/Expand button -->
                    <button 
                      v-if="hasChildren(department.id)"
                      @click="toggleDepartmentCollapse(department.id)"
                      class="flex items-center justify-center w-4 h-4 rounded hover:bg-muted transition-colors cursor-pointer"
                      :title="isDepartmentCollapsed(department.id) ? 'Mở rộng' : 'Thu gọn'"
                    >
                      <ChevronRight 
                        :class="[
                          'w-3 h-3 transition-transform duration-200 text-muted-foreground',
                          isDepartmentCollapsed(department.id) ? 'rotate-0' : 'rotate-90'
                        ]"
                      />
                    </button>
                    <div v-else class="w-4 h-4"></div>
                    
                    <div class="font-medium text-foreground">
                      {{ department.name }}
                    </div>
                  </div>
                </TableCell>
                <TableCell class="align-middle">
                  <span v-if="department.parent_id" class="text-sm text-muted-foreground">
                    {{ getParentName(department.parent_id) }}
                  </span>
                  <span v-else class="text-sm text-muted-foreground">Đơn vị gốc</span>
                </TableCell>
                <TableCell class="align-middle">
                  <Badge variant="outline" class="text-xs">
                    Cấp {{ department.level }}
                  </Badge>
                </TableCell>
                <TableCell class="align-middle">
                  <span v-if="department.map_id" class="text-sm">{{ department.map_id }}</span>
                  <span v-else class="text-sm text-muted-foreground">-</span>
                </TableCell>
                <TableCell class="align-middle">
                  <span v-if="department.note" class="text-sm text-muted-foreground max-w-xs truncate">
                    {{ department.note }}
                  </span>
                  <span v-else class="text-sm text-muted-foreground">-</span>
                </TableCell>
                <TableCell class="text-sm text-muted-foreground">
                  {{ formatDate(department.created_at) }}
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="openEditModal(department)"
                    >
                      <Edit class="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="confirmDelete(department)"
                      :disabled="hasChildren(department.id)"
                      class="text-destructive hover:text-destructive"
                    >
                      <Trash2 class="h-4 w-4" />
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
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-md mx-4"
        @click.stop
      >
        <h3 class="text-lg font-semibold mb-4">
          {{ isEditing ? 'Sửa đơn vị' : 'Thêm đơn vị mới' }}
        </h3>

        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Code -->
          <div>
            <Label for="code">Code *</Label>
            <input
              id="code"
              v-model="form.code"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập code đơn vị"
            />
          </div>

          <!-- Name -->
          <div>
            <Label for="name">Tên đơn vị *</Label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tên đơn vị"
            />
          </div>

          <!-- Parent Department -->
          <div>
            <Label for="parent_id">Đơn vị cha</Label>
            <select
              id="parent_id"
              v-model="form.parent_id"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn đơn vị cha (tùy chọn)</option>
              <option
                v-for="parent in availableParents"
                :key="parent.id"
                :value="parent.id"
              >
                {{ parent.name }} ({{ parent.code }})
              </option>
            </select>
          </div>

          <!-- Level -->
          <div>
            <Label for="level">Cấp tổ chức *</Label>
            <input
              id="level"
              v-model.number="form.level"
              type="number"
              min="1"
              max="10"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập cấp tổ chức (1-10)"
            />
          </div>

          <!-- Map ID -->
          <div>
            <Label for="map_id">Đơn vị</Label>
            <input
              id="map_id"
              v-model.number="form.map_id"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập ID đơn vị (tùy chọn)"
            />
          </div>

          <!-- Note -->
          <div>
            <Label for="note">Ghi chú</Label>
            <textarea
              id="note"
              v-model="form.note"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập ghi chú (tùy chọn)"
            ></textarea>
          </div>

          <!-- Form Actions -->
          <div class="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              @click="closeModal"
              class="flex-1"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              :disabled="submitting"
              class="flex-1"
            >
              {{ submitting ? 'Đang xử lý...' : (isEditing ? 'Cập nhật' : 'Tạo mới') }}
            </Button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeDeleteModal"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-md mx-4"
        @click.stop
      >
        <h3 class="text-lg font-semibold mb-4 text-red-600">Xác nhận xóa</h3>
        <p class="text-gray-600 mb-6">
          Bạn có chắc chắn muốn xóa đơn vị 
          <strong>"{{ departmentToDelete?.name }}"</strong>?
          <br>
          <span class="text-sm text-red-500">Hành động này không thể hoàn tác.</span>
        </p>
        <div class="flex gap-3">
          <Button
            variant="outline"
            @click="closeDeleteModal"
            class="flex-1"
          >
            Hủy
          </Button>
          <Button
            variant="destructive"
            @click="deleteDepartment"
            :disabled="deleting"
            class="flex-1"
          >
            {{ deleting ? 'Đang xóa...' : 'Xóa' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, Edit, Trash2, RefreshCw, ChevronRight } from 'lucide-vue-next'
import { useDepartments, type Department } from '~/composables/useDepartments'
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

// Meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Composables
const { 
  getDepartments, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment: deleteDepartmentApi,
  getParentDepartments 
} = useDepartments()

// Reactive data
const departments = ref<Department[]>([])
const loading = ref(false)
const searchQuery = ref('')
const parentFilter = ref('all')
const collapsedDepartments = ref<Set<number>>(new Set())

// Modal states
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const submitting = ref(false)
const deleting = ref(false)
const departmentToDelete = ref<Department | null>(null)

// Form data
const form = ref({
  id: null as number | null,
  code: '',
  name: '',
  parent_id: null as number | null,
  map_id: null as number | null,
  level: 1,
  note: ''
})

// Helper functions for tree structure
const hasChildren = (departmentId: number): boolean => {
  return departments.value.some(dept => dept.parent_id === departmentId)
}

const toggleDepartmentCollapse = (departmentId: number) => {
  if (collapsedDepartments.value.has(departmentId)) {
    collapsedDepartments.value.delete(departmentId)
  } else {
    collapsedDepartments.value.add(departmentId)
  }
}

const isDepartmentCollapsed = (departmentId: number): boolean => {
  return collapsedDepartments.value.has(departmentId)
}

const isAnyParentCollapsed = (department: Department): boolean => {
  if (!department.parent_id) return false
  
  const parent = departments.value.find(d => d.id === department.parent_id)
  if (!parent) return false
  
  if (isDepartmentCollapsed(parent.id)) return true
  
  return isAnyParentCollapsed(parent)
}

// Helper function to build tree structure
const buildTreeStructure = (departments: Department[]) => {
  const result: Department[] = []
  const processed = new Set<number>()
  
  // First, add all level 1 departments (root departments)
  const rootDepartments = departments.filter(dept => dept.level === 1).sort((a, b) => a.id - b.id)
  
  const addDepartmentAndChildren = (department: Department) => {
    if (processed.has(department.id)) return
    
    // Only add department if no parent is collapsed
    if (!isAnyParentCollapsed(department)) {
      result.push(department)
      processed.add(department.id)
      
      // Only add children if current department is not collapsed
      if (!isDepartmentCollapsed(department.id)) {
        const children = departments
          .filter(child => child.parent_id === department.id)
          .sort((a, b) => a.id - b.id)
        
        children.forEach(child => addDepartmentAndChildren(child))
      }
    }
  }
  
  // Process all root departments and their descendants
  rootDepartments.forEach(rootDepartment => addDepartmentAndChildren(rootDepartment))
  
  // Add any remaining departments that weren't processed (orphaned departments)
  departments.forEach(department => {
    if (!processed.has(department.id) && !isAnyParentCollapsed(department)) {
      result.push(department)
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

// Helper function to get all parent departments
const getAllParentDepartments = (department: Department): Department[] => {
  const parents: Department[] = []
  let currentParent = department.parent_id
  
  while (currentParent) {
    const parent = departments.value.find(d => d.id === currentParent)
    if (parent) {
      parents.unshift(parent) // Add to beginning to maintain order
      currentParent = parent.parent_id
    } else {
      break
    }
  }
  
  return parents
}

// Computed
const filteredDepartments = computed(() => {
  let result = departments.value
  
  // Apply search filter if needed
  if (searchQuery.value && searchQuery.value.trim()) {
    const searchTerm = searchQuery.value.toLowerCase().trim()
    const searchTermNoDiacritics = removeDiacritics(searchTerm)
    
    const matchingDepartments = result.filter(department => {
      const departmentName = department.name.toLowerCase()
      const departmentNameNoDiacritics = removeDiacritics(departmentName)
      const departmentCode = department.code.toLowerCase()
      const departmentCodeNoDiacritics = removeDiacritics(departmentCode)
      
      return departmentName.includes(searchTerm) ||
             departmentNameNoDiacritics.includes(searchTermNoDiacritics) ||
             departmentCode.includes(searchTerm) ||
             departmentCodeNoDiacritics.includes(searchTermNoDiacritics)
    })
    
    // Include all parent departments for matching departments
    const allDepartmentsToShow = new Set<number>()
    
    matchingDepartments.forEach(department => {
      // Add the matching department itself
      allDepartmentsToShow.add(department.id)
      
      // Add all its parent departments
      const parents = getAllParentDepartments(department)
      parents.forEach(parent => allDepartmentsToShow.add(parent.id))
    })
    
    // Filter to only show departments that should be displayed
    result = result.filter(department => allDepartmentsToShow.has(department.id))
  }

  // Parent filter
  if (parentFilter.value === 'root') {
    result = result.filter(dept => !dept.parent_id)
  } else if (parentFilter.value === 'child') {
    result = result.filter(dept => dept.parent_id)
  }
  
  // Build tree structure for proper hierarchy display
  return buildTreeStructure(result)
})

const availableParents = computed(() => {
  if (isEditing.value) {
    // When editing, exclude current department and its children
    return getParentDepartments(departments.value, form.value.id)
  }
  return getParentDepartments(departments.value)
})

// Methods
const loadDepartments = async () => {
  loading.value = true
  try {
    departments.value = await getDepartments()
  } catch (error) {
    console.error('Error loading departments:', error)
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  // Filters are applied automatically through computed property
}

const getParentName = (parentId: number): string => {
  const parent = departments.value.find(dept => dept.id === parentId)
  return parent ? `${parent.name} (${parent.code})` : 'Không xác định'
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const resetForm = () => {
  form.value = {
    id: null,
    code: '',
    name: '',
    parent_id: null,
    map_id: null,
    level: 1,
    note: ''
  }
}

const openCreateModal = () => {
  isEditing.value = false
  resetForm()
  showModal.value = true
}

const openEditModal = (department: Department) => {
  isEditing.value = true
  form.value = {
    id: department.id,
    code: department.code,
    name: department.name,
    parent_id: department.parent_id,
    map_id: department.map_id,
    level: department.level,
    note: department.note || ''
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const submitForm = async () => {
  if (!form.value.code.trim() || !form.value.name.trim()) {
    alert('Vui lòng nhập đầy đủ thông tin bắt buộc')
    return
  }

  submitting.value = true
  try {
    if (isEditing.value) {
      await updateDepartment(form.value.id!, {
        code: form.value.code,
        name: form.value.name,
        parent_id: form.value.parent_id,
        map_id: form.value.map_id,
        level: form.value.level,
        note: form.value.note || null
      })
    } else {
      await createDepartment({
        code: form.value.code,
        name: form.value.name,
        parent_id: form.value.parent_id,
        map_id: form.value.map_id,
        level: form.value.level,
        note: form.value.note || null
      })
    }
    
    await loadDepartments()
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    submitting.value = false
  }
}

const confirmDelete = (department: Department) => {
  departmentToDelete.value = department
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  departmentToDelete.value = null
}

const deleteDepartment = async () => {
  if (!departmentToDelete.value) return

  deleting.value = true
  try {
    await deleteDepartmentApi(departmentToDelete.value.id)
    await loadDepartments()
    closeDeleteModal()
  } catch (error) {
    console.error('Error deleting department:', error)
  } finally {
    deleting.value = false
  }
}


// Lifecycle
onMounted(() => {
  loadDepartments()
})
</script>
