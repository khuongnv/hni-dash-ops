import { demoMenus, Menu } from '~/data/demo-menus'

export const useMenus = () => {
  const getMenus = async (): Promise<Menu[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    return demoMenus
  }

  const getMenuById = async (id: number): Promise<Menu | null> => {
    await new Promise(resolve => setTimeout(resolve, 50))
    return demoMenus.find(menu => menu.id === id) || null
  }

  const getPublicMenus = async (): Promise<Menu[]> => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return demoMenus.filter(menu => menu.is_public)
  }

  const getActiveMenus = async (): Promise<Menu[]> => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return demoMenus.filter(menu => menu.is_active)
  }

  const getMenusByParent = async (parentId: number | null): Promise<Menu[]> => {
    await new Promise(resolve => setTimeout(resolve, 50))
    return demoMenus.filter(menu => menu.parent_id === parentId)
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
