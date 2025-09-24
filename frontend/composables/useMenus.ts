export interface Menu {
  id: number
  name: string
  href: string
  icon: string
  order: number
  parent_id: number | null
  parent_name?: string
  level: number
  description?: string
  is_visible: boolean
  target?: string
  css_class?: string
  data_attributes?: string
  is_active: boolean
  created_at: string
  updated_at: string
  children?: Menu[]
}

export const useMenus = () => {
  const { get } = useAPI()

  const getMenus = async (): Promise<Menu[]> => {
    return await get<Menu[]>('/api/menus')
  }

  const getMenuById = async (id: number): Promise<Menu | null> => {
    try {
      return await get<Menu>(`/api/menus/${id}`)
    } catch (error) {
      console.error('Error fetching menu:', error)
      return null
    }
  }

  const getPublicMenus = async (): Promise<Menu[]> => {
    return await get<Menu[]>('/api/menus/navigation')
  }

  const getActiveMenus = async (): Promise<Menu[]> => {
    const menus = await getMenus()
    return menus.filter(menu => menu.is_active)
  }

  const getMenusByParent = async (parentId: number | null): Promise<Menu[]> => {
    if (parentId === null) {
      return await get<Menu[]>('/api/menus/root')
    }
    return await get<Menu[]>(`/api/menus/parent/${parentId}/children`)
  }

  const buildMenuTree = (menus: Menu[]): Menu[] => {
    const menuMap = new Map<number, Menu & { children?: Menu[] }>()
    const rootMenus: Menu[] = []

    // First pass: create map
    menus.forEach(menu => {
      menuMap.set(menu.id, { ...menu, children: [] })
    })

    // Second pass: build tree
    menus.forEach(menu => {
      const menuWithChildren = menuMap.get(menu.id)!
      if (menu.parent_id) {
        const parent = menuMap.get(menu.parent_id)
        if (parent) {
          parent.children!.push(menuWithChildren)
        }
      } else {
        rootMenus.push(menuWithChildren)
      }
    })

    return rootMenus
  }

  return {
    getMenus,
    getMenuById,
    getPublicMenus,
    getActiveMenus,
    getMenusByParent,
    buildMenuTree
  }
}
