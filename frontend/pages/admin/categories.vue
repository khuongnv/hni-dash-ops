<template>
  <div class="h-full flex flex-col space-y-4">
    <!-- Page Header -->
    <PageHeader 
      title="Quản lý Danh mục" 
      description="Quản lý các danh mục sản phẩm và dịch vụ"
    />

    <!-- Actions Bar -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <Button @click="openCreateModal" class="flex items-center gap-2">
          <Plus class="w-4 h-4" />
          Thêm danh mục mới
        </Button>
        <Button variant="outline" @click="loadCategories" :disabled="loading">
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
          <option value="root">Danh mục gốc</option>
          <option value="child">Danh mục con</option>
        </select>
        
        <input 
          :value="searchQuery"
          @input="searchQuery = ($event.target as HTMLInputElement).value"
          placeholder="Tìm kiếm danh mục..." 
          class="w-64 h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
      </div>
    </div>

    <!-- Categories Table -->
    <Card class="-mt-2">
      <CardHeader>
        <CardTitle>Danh sách Danh mục</CardTitle>
        <CardDescription>
          Tổng cộng {{ filteredCategories.length }} danh mục
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
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Danh mục cha</TableHead>
                <TableHead>Cấp</TableHead>
                <TableHead>Map ID</TableHead>
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
              <TableRow v-else-if="filteredCategories.length === 0">
                <TableCell colspan="9" class="text-center py-8 text-muted-foreground">
                  Không có danh mục nào
                </TableCell>
              </TableRow>
              <TableRow v-else v-for="category in filteredCategories" :key="category.id" class="table-row-fixed">
                <TableCell class="font-medium align-middle">{{ category.id }}</TableCell>
                <TableCell class="align-middle">
                  <Badge variant="outline">{{ category.code }}</Badge>
                </TableCell>
                <TableCell class="align-middle">
                  <div class="flex items-center gap-2">
                    <!-- Tree structure indicators -->
                    <div class="flex items-center">
                      <template v-for="i in getCategoryLevel(category) - 1" :key="i">
                        <div class="w-4 h-4 flex items-center justify-center">
                          <div v-if="i === getCategoryLevel(category) - 1" class="w-3 h-3 flex items-center justify-center">
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
                      v-if="hasChildren(category.id)"
                      @click="toggleCategoryCollapse(category.id)"
                      class="flex items-center justify-center w-4 h-4 rounded hover:bg-muted transition-colors cursor-pointer"
                      :title="isCategoryCollapsed(category.id) ? 'Mở rộng' : 'Thu gọn'"
                    >
                      <ChevronRight 
                        :class="[
                          'w-3 h-3 transition-transform duration-200 text-muted-foreground',
                          isCategoryCollapsed(category.id) ? 'rotate-0' : 'rotate-90'
                        ]"
                      />
                    </button>
                    <div v-else class="w-4 h-4"></div>
                    
                    <div class="font-medium text-foreground">
                      {{ category.name }}
                    </div>
                  </div>
                </TableCell>
                <TableCell class="align-middle">
                  <span v-if="category.parent_id" class="text-sm text-muted-foreground">
                    {{ getParentName(category.parent_id) }}
                  </span>
                  <span v-else class="text-sm text-muted-foreground">Danh mục gốc</span>
                </TableCell>
                <TableCell class="align-middle">
                  <Badge variant="outline" class="text-xs">
                    Cấp {{ getCategoryLevel(category) }}
                  </Badge>
                </TableCell>
                <TableCell class="align-middle">
                  <span v-if="category.map_id" class="text-sm">{{ category.map_id }}</span>
                  <span v-else class="text-sm text-muted-foreground">-</span>
                </TableCell>
                <TableCell class="align-middle">
                  <span v-if="category.note" class="text-sm text-muted-foreground max-w-xs truncate">
                    {{ category.note }}
                  </span>
                  <span v-else class="text-sm text-muted-foreground">-</span>
                </TableCell>
                <TableCell class="text-sm text-muted-foreground">
                  {{ formatDate(category.created_at) }}
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="openEditModal(category)"
                    >
                      <Edit class="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="confirmDelete(category)"
                      :disabled="hasChildren(category.id)"
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
          {{ isEditing ? 'Sửa danh mục' : 'Thêm danh mục mới' }}
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
              placeholder="Nhập code danh mục"
            />
          </div>

          <!-- Name -->
          <div>
            <Label for="name">Tên danh mục *</Label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tên danh mục"
            />
          </div>

          <!-- Parent Category -->
          <div>
            <Label for="parent_id">Danh mục cha</Label>
            <select
              id="parent_id"
              v-model="form.parent_id"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn danh mục cha (tùy chọn)</option>
              <option
                v-for="parent in availableParents"
                :key="parent.id"
                :value="parent.id"
              >
                {{ parent.name }} ({{ parent.code }})
              </option>
            </select>
          </div>

          <!-- Map ID -->
          <div>
            <Label for="map_id">Map ID</Label>
            <input
              id="map_id"
              v-model.number="form.map_id"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập Map ID (tùy chọn)"
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
          Bạn có chắc chắn muốn xóa danh mục 
          <strong>"{{ categoryToDelete?.name }}"</strong>?
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
            @click="deleteCategory"
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
import { useCategories, type Category } from '~/composables/useCategories'
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
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory: deleteCategoryApi,
  getParentCategories 
} = useCategories()

// Reactive data
const categories = ref<Category[]>([])
const loading = ref(false)
const searchQuery = ref('')
const parentFilter = ref('all')
const collapsedCategories = ref<Set<number>>(new Set())

// Modal states
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const submitting = ref(false)
const deleting = ref(false)
const categoryToDelete = ref<Category | null>(null)

// Form data
const form = ref({
  id: null as number | null,
  code: '',
  name: '',
  parent_id: null as number | null,
  map_id: null as number | null,
  note: ''
})

// Helper functions for tree structure
const hasChildren = (categoryId: number): boolean => {
  return categories.value.some(cat => cat.parent_id === categoryId)
}

const toggleCategoryCollapse = (categoryId: number) => {
  if (collapsedCategories.value.has(categoryId)) {
    collapsedCategories.value.delete(categoryId)
  } else {
    collapsedCategories.value.add(categoryId)
  }
}

const isCategoryCollapsed = (categoryId: number): boolean => {
  return collapsedCategories.value.has(categoryId)
}

const isAnyParentCollapsed = (category: Category): boolean => {
  if (!category.parent_id) return false
  
  const parent = categories.value.find(c => c.id === category.parent_id)
  if (!parent) return false
  
  if (isCategoryCollapsed(parent.id)) return true
  
  return isAnyParentCollapsed(parent)
}

// Helper function to build tree structure
const buildTreeStructure = (categories: Category[]) => {
  const result: Category[] = []
  const processed = new Set<number>()
  
  // First, add all root categories (categories without parent)
  const rootCategories = categories.filter(cat => !cat.parent_id).sort((a, b) => a.id - b.id)
  
  const addCategoryAndChildren = (category: Category) => {
    if (processed.has(category.id)) return
    
    // Only add category if no parent is collapsed
    if (!isAnyParentCollapsed(category)) {
      result.push(category)
      processed.add(category.id)
      
      // Only add children if current category is not collapsed
      if (!isCategoryCollapsed(category.id)) {
        const children = categories
          .filter(child => child.parent_id === category.id)
          .sort((a, b) => a.id - b.id)
        
        children.forEach(child => addCategoryAndChildren(child))
      }
    }
  }
  
  // Process all root categories and their descendants
  rootCategories.forEach(rootCategory => addCategoryAndChildren(rootCategory))
  
  // Add any remaining categories that weren't processed (orphaned categories)
  categories.forEach(category => {
    if (!processed.has(category.id) && !isAnyParentCollapsed(category)) {
      result.push(category)
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

// Helper function to get all parent categories
const getAllParentCategories = (category: Category): Category[] => {
  const parents: Category[] = []
  let currentParent = category.parent_id
  
  while (currentParent) {
    const parent = categories.value.find(c => c.id === currentParent)
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
const filteredCategories = computed(() => {
  let result = categories.value
  
  // Apply search filter if needed
  if (searchQuery.value && searchQuery.value.trim()) {
    const searchTerm = searchQuery.value.toLowerCase().trim()
    const searchTermNoDiacritics = removeDiacritics(searchTerm)
    
    const matchingCategories = result.filter(category => {
      const categoryName = category.name.toLowerCase()
      const categoryNameNoDiacritics = removeDiacritics(categoryName)
      const categoryCode = category.code.toLowerCase()
      const categoryCodeNoDiacritics = removeDiacritics(categoryCode)
      
      return categoryName.includes(searchTerm) ||
             categoryNameNoDiacritics.includes(searchTermNoDiacritics) ||
             categoryCode.includes(searchTerm) ||
             categoryCodeNoDiacritics.includes(searchTermNoDiacritics)
    })
    
    // Include all parent categories for matching categories
    const allCategoriesToShow = new Set<number>()
    
    matchingCategories.forEach(category => {
      // Add the matching category itself
      allCategoriesToShow.add(category.id)
      
      // Add all its parent categories
      const parents = getAllParentCategories(category)
      parents.forEach(parent => allCategoriesToShow.add(parent.id))
    })
    
    // Filter to only show categories that should be displayed
    result = result.filter(category => allCategoriesToShow.has(category.id))
  }

  // Parent filter
  if (parentFilter.value === 'root') {
    result = result.filter(cat => !cat.parent_id)
  } else if (parentFilter.value === 'child') {
    result = result.filter(cat => cat.parent_id)
  }
  
  // Build tree structure for proper hierarchy display
  return buildTreeStructure(result)
})

const availableParents = computed(() => {
  if (isEditing.value) {
    // When editing, exclude current category and its children
    return getParentCategories(categories.value, form.value.id)
  }
  return getParentCategories(categories.value)
})

// Methods
const loadCategories = async () => {
  loading.value = true
  try {
    categories.value = await getCategories()
  } catch (error) {
    console.error('Error loading categories:', error)
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  // Filters are applied automatically through computed property
}

const getParentName = (parentId: number): string => {
  const parent = categories.value.find(cat => cat.id === parentId)
  return parent ? `${parent.name} (${parent.code})` : 'Không xác định'
}

const getCategoryLevel = (category: Category): number => {
  let level = 1
  let currentParent = category.parent_id
  
  while (currentParent) {
    level++
    const parent = categories.value.find(c => c.id === currentParent)
    if (parent) {
      currentParent = parent.parent_id
    } else {
      break
    }
  }
  
  return level
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
    note: ''
  }
}

const openCreateModal = () => {
  isEditing.value = false
  resetForm()
  showModal.value = true
}

const openEditModal = (category: Category) => {
  isEditing.value = true
  form.value = {
    id: category.id,
    code: category.code,
    name: category.name,
    parent_id: category.parent_id,
    map_id: category.map_id,
    note: category.note || ''
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
      await updateCategory(form.value.id!, {
        code: form.value.code,
        name: form.value.name,
        parent_id: form.value.parent_id,
        map_id: form.value.map_id,
        note: form.value.note || null
      })
    } else {
      await createCategory({
        code: form.value.code,
        name: form.value.name,
        parent_id: form.value.parent_id,
        map_id: form.value.map_id,
        note: form.value.note || null
      })
    }
    
    await loadCategories()
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    submitting.value = false
  }
}

const confirmDelete = (category: Category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  categoryToDelete.value = null
}

const deleteCategory = async () => {
  if (!categoryToDelete.value) return

  deleting.value = true
  try {
    await deleteCategoryApi(categoryToDelete.value.id)
    await loadCategories()
    closeDeleteModal()
  } catch (error) {
    console.error('Error deleting category:', error)
  } finally {
    deleting.value = false
  }
}


// Lifecycle
onMounted(() => {
  loadCategories()
})
</script>
