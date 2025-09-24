import { useErrorHandler } from './useErrorHandler'

export interface Category {
  id: number
  code: string
  name: string
  parent_id: number | null
  parent_name?: string
  map_id: number | null
  level: number
  note: string | null
  order: number
  color?: string
  icon?: string
  is_visible: boolean
  type?: string
  metadata?: string
  is_active: boolean
  created_at: string
  updated_at: string
  children?: Category[]
  children_count?: number
}

export const useCategories = () => {
  const { handleAsyncError } = useErrorHandler()
  const { get, post, put, delete: del } = useAPI()

  const getCategories = async (): Promise<Category[]> => {
    return await handleAsyncError(async () => {
      return await get<Category[]>('/api/categories')
    }, 'Lấy danh sách categories')
  }

  const getCategoryById = async (id: number): Promise<Category> => {
    return await handleAsyncError(async () => {
      return await get<Category>(`/api/categories/${id}`)
    }, 'Lấy thông tin category')
  }

  const createCategory = async (categoryData: Partial<Category>): Promise<Category> => {
    return await handleAsyncError(async () => {
      return await post<Category>('/api/categories', categoryData)
    }, 'Tạo category')
  }

  const updateCategory = async (id: number, categoryData: Partial<Category>): Promise<Category> => {
    return await handleAsyncError(async () => {
      return await put<Category>(`/api/categories/${id}`, categoryData)
    }, 'Cập nhật category')
  }

  const deleteCategory = async (id: number): Promise<void> => {
    return await handleAsyncError(async () => {
      await del(`/api/categories/${id}`)
    }, 'Xóa category')
  }

  // Helper function to build category tree
  const buildCategoryTree = (categories: Category[]): Category[] => {
    const categoryMap = new Map<number, Category & { children?: Category[] }>()
    const rootCategories: Category[] = []

    // First pass: create map
    categories.forEach(category => {
      categoryMap.set(category.id, { ...category, children: [] })
    })

    // Second pass: build tree
    categories.forEach(category => {
      const categoryWithChildren = categoryMap.get(category.id)!
      if (category.parent_id) {
        const parent = categoryMap.get(category.parent_id)
        if (parent) {
          parent.children!.push(categoryWithChildren)
        }
      } else {
        rootCategories.push(categoryWithChildren)
      }
    })

    return rootCategories
  }

  // Helper function to get parent categories (for dropdown)
  const getParentCategories = (categories: Category[], excludeId?: number): Category[] => {
    return categories.filter(cat => cat.id !== excludeId)
  }

  return {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    buildCategoryTree,
    getParentCategories
  }
}
