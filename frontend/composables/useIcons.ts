// Composable để xử lý icons một cách an toàn với SSR
export const useIcons = () => {
  // Import icons dynamically để tránh SSR issues
  const getIcon = (iconName: string) => {
    if (process.client) {
      return import('lucide-vue-next').then(module => module[iconName])
    }
    return null
  }

  // Pre-define commonly used icons
  const icons = {
    Users: () => import('lucide-vue-next').then(m => m.Users),
    UserPlus: () => import('lucide-vue-next').then(m => m.UserPlus),
    DollarSign: () => import('lucide-vue-next').then(m => m.DollarSign),
    Activity: () => import('lucide-vue-next').then(m => m.Activity),
    BarChart3: () => import('lucide-vue-next').then(m => m.BarChart3),
    Settings: () => import('lucide-vue-next').then(m => m.Settings),
    LayoutDashboard: () => import('lucide-vue-next').then(m => m.LayoutDashboard),
    Info: () => import('lucide-vue-next').then(m => m.Info),
    Menu: () => import('lucide-vue-next').then(m => m.Menu),
    Bell: () => import('lucide-vue-next').then(m => m.Bell),
    Building: () => import('lucide-vue-next').then(m => m.Building),
    Tag: () => import('lucide-vue-next').then(m => m.Tag),
    FileText: () => import('lucide-vue-next').then(m => m.FileText),
    Shield: () => import('lucide-vue-next').then(m => m.Shield),
    Key: () => import('lucide-vue-next').then(m => m.Key),
    Search: () => import('lucide-vue-next').then(m => m.Search),
    X: () => import('lucide-vue-next').then(m => m.X),
    ChevronDown: () => import('lucide-vue-next').then(m => m.ChevronDown),
    ChevronRight: () => import('lucide-vue-next').then(m => m.ChevronRight),
    Home: () => import('lucide-vue-next').then(m => m.Home),
    User: () => import('lucide-vue-next').then(m => m.User),
    LogOut: () => import('lucide-vue-next').then(m => m.LogOut),
    Sun: () => import('lucide-vue-next').then(m => m.Sun),
    Moon: () => import('lucide-vue-next').then(m => m.Moon),
    Monitor: () => import('lucide-vue-next').then(m => m.Monitor)
  }

  return {
    getIcon,
    icons
  }
}