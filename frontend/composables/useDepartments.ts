import { useErrorHandler } from './useErrorHandler'
import { demoDepartments, Department } from '~/data/demo-departments'

export interface Department {
  id: number
  code: string
  name: string
  parent_id: number | null
  map_id: number | null
  level: number
  note: string | null
  created_at: string
  updated_at: string
}

export const useDepartments = () => {
  const { handleAsyncError } = useErrorHandler()

  const getDepartments = async (): Promise<Department[]> => {
    return await handleAsyncError(async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200))
      return demoDepartments
    }, 'Lấy danh sách departments')
  }

  const getDepartmentById = async (id: number): Promise<Department> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      const department = demoDepartments.find(dept => dept.id === id)
      if (!department) {
        throw new Error('Department not found')
      }
      return department
    }, 'Lấy thông tin department')
  }

  const createDepartment = async (departmentData: Partial<Department>): Promise<Department> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      const newDepartment: Department = {
        id: Math.max(...demoDepartments.map(d => d.id)) + 1,
        code: departmentData.code || '',
        name: departmentData.name || '',
        parent_id: departmentData.parent_id || null,
        map_id: departmentData.map_id || null,
        level: departmentData.level || 1,
        note: departmentData.note || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      demoDepartments.push(newDepartment)
      return newDepartment
    }, 'Tạo department')
  }

  const updateDepartment = async (id: number, departmentData: Partial<Department>): Promise<Department> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      const index = demoDepartments.findIndex(dept => dept.id === id)
      if (index === -1) {
        throw new Error('Department not found')
      }
      demoDepartments[index] = {
        ...demoDepartments[index],
        ...departmentData,
        updated_at: new Date().toISOString()
      }
      return demoDepartments[index]
    }, 'Cập nhật department')
  }

  const deleteDepartment = async (id: number): Promise<void> => {
    return await handleAsyncError(async () => {
      await new Promise(resolve => setTimeout(resolve, 200))
      const index = demoDepartments.findIndex(dept => dept.id === id)
      if (index === -1) {
        throw new Error('Department not found')
      }
      demoDepartments.splice(index, 1)
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
