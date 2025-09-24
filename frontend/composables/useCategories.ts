import { useErrorHandler } from './useErrorHandler'
import { demoCategories, Category } from '~/data/demo-categories'

export interface Category {
  id: number
  code: string
  name: string
  parent_id: number | null
  map_id: number | null
  note: string | null
  created_at: string
  updated_at: string
}

export const useCategories = () => {
  const { handleAsyncError } = useErrorHandler()

  const getCategories = async (): Promise<Category[]> => {
    return await handleAsyncError(async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200))
      return demoCategories
    }, 'Lấy danh sách categories')
  }

  const getCategoryById = async (id: number): Promise<Category> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      const category = demoCategories.find(cat => cat.id === id)
      if (!category) {
        throw new Error('Category not found')
      }
      return category
    }, 'Lấy thông tin category')
  }

  const createCategory = async (categoryData: Partial<Category>): Promise<Category> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      const newCategory: Category = {
        id: Math.max(...demoCategories.map(c => c.id)) + 1,
        code: categoryData.code || '',
        name: categoryData.name || '',
        parent_id: categoryData.parent_id || null,
        map_id: categoryData.map_id || null,
        note: categoryData.note || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      demoCategories.push(newCategory)
      return newCategory
    }, 'Tạo category')
  }

  const updateCategory = async (id: number, categoryData: Partial<Category>): Promise<Category> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      const index = demoCategories.findIndex(cat => cat.id === id)
      if (index === -1) {
        throw new Error('Category not found')
      }
      demoCategories[index] = {
        ...demoCategories[index],
        ...categoryData,
        updated_at: new Date().toISOString()
      }
      return demoCategories[index]
    }, 'Cập nhật category')
  }

  const deleteCategory = async (id: number): Promise<void> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 200))
      const index = demoCategories.findIndex(cat => cat.id === id)
      if (index === -1) {
        throw new Error('Category not found')
      }
      demoCategories.splice(index, 1)
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
