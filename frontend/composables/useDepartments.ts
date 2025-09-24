import { useErrorHandler } from './useErrorHandler'

export interface Department {
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
  children?: Department[]
  children_count?: number
}

export const useDepartments = () => {
  const { handleAsyncError } = useErrorHandler()
  const { get, post, put, delete: del } = useAPI()

  const getDepartments = async (): Promise<Department[]> => {
    return await handleAsyncError(async () => {
      return await get<Department[]>('/api/departments')
    }, 'Lấy danh sách departments')
  }

  const getDepartmentById = async (id: number): Promise<Department> => {
    return await handleAsyncError(async () => {
      return await get<Department>(`/api/departments/${id}`)
    }, 'Lấy thông tin department')
  }

  const createDepartment = async (departmentData: Partial<Department>): Promise<Department> => {
    return await handleAsyncError(async () => {
      return await post<Department>('/api/departments', departmentData)
    }, 'Tạo department')
  }

  const updateDepartment = async (id: number, departmentData: Partial<Department>): Promise<Department> => {
    return await handleAsyncError(async () => {
      return await put<Department>(`/api/departments/${id}`, departmentData)
    }, 'Cập nhật department')
  }

  const deleteDepartment = async (id: number): Promise<void> => {
    return await handleAsyncError(async () => {
      await del(`/api/departments/${id}`)
    }, 'Xóa department')
  }

  // Helper function to build department tree
  const buildDepartmentTree = (departments: Department[]): Department[] => {
    const departmentMap = new Map<number, Department & { children?: Department[] }>()
    const rootDepartments: Department[] = []

    // First pass: create map
    departments.forEach(department => {
      departmentMap.set(department.id, { ...department, children: [] })
    })

    // Second pass: build tree
    departments.forEach(department => {
      const departmentWithChildren = departmentMap.get(department.id)!
      if (department.parent_id) {
        const parent = departmentMap.get(department.parent_id)
        if (parent) {
          parent.children!.push(departmentWithChildren)
        }
      } else {
        rootDepartments.push(departmentWithChildren)
      }
    })

    return rootDepartments
  }

  // Helper function to get parent departments (for dropdown)
  const getParentDepartments = (departments: Department[], excludeId?: number): Department[] => {
    return departments.filter(dept => dept.id !== excludeId)
  }

  // Helper function to get departments by level
  const getDepartmentsByLevel = (departments: Department[], level: number): Department[] => {
    return departments.filter(dept => dept.level === level)
  }

  return {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    buildDepartmentTree,
    getParentDepartments,
    getDepartmentsByLevel
  }
}
