import { defineAsyncComponent } from 'vue'

// Composable để xử lý icons một cách an toàn với SSR
export const useIcons = () => {
  // Import icons dynamically để tránh SSR issues
  const getIcon = (iconName: string) => {
    if (typeof window !== 'undefined') {
      return import('lucide-vue-next').then(module => module[iconName])
    }
    return null
  }

  // Pre-define commonly used icons as async components
  const icons = {
    Users: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Users }))),
    UserPlus: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.UserPlus }))),
    DollarSign: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.DollarSign }))),
    Activity: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Activity }))),
    BarChart3: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.BarChart3 }))),
    Settings: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Settings }))),
    LayoutDashboard: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.LayoutDashboard }))),
    Info: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Info }))),
    Menu: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Menu }))),
    Bell: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Bell }))),
    Building: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Building }))),
    Tag: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Tag }))),
    FileText: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.FileText }))),
    Shield: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Shield }))),
    Key: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Key }))),
    Search: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Search }))),
    X: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.X }))),
    ChevronDown: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.ChevronDown }))),
    ChevronRight: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.ChevronRight }))),
    Home: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Home }))),
    User: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.User }))),
    LogOut: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.LogOut }))),
    Sun: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Sun }))),
    Moon: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Moon }))),
    Monitor: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Monitor }))),
    Plus: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Plus }))),
    Edit: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Edit }))),
    Trash2: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Trash2 }))),
    Eye: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Eye }))),
    EyeOff: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.EyeOff }))),
    MoreHorizontal: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.MoreHorizontal }))),
    ArrowUp: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.ArrowUp }))),
    ArrowDown: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.ArrowDown }))),
    Folder: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Folder }))),
    FolderOpen: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.FolderOpen }))),
    Link: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Link }))),
    ExternalLink: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.ExternalLink }))),
    Lock: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Lock }))),
    Unlock: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Unlock }))),
    Star: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Star }))),
    Heart: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Heart }))),
    Zap: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Zap }))),
    Globe: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Globe }))),
    Mail: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Mail }))),
    Phone: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Phone }))),
    MapPin: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.MapPin }))),
    Calendar: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Calendar }))),
    Clock: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Clock }))),
    Check: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Check }))),
    AlertCircle: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.AlertCircle }))),
    AlertTriangle: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.AlertTriangle }))),
    HelpCircle: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.HelpCircle }))),
    Copy: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Copy }))),
    Download: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Download }))),
    Upload: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Upload }))),
    Filter: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Filter }))),
    SortAsc: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.SortAsc }))),
    SortDesc: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.SortDesc }))),
    RefreshCw: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.RefreshCw }))),
    RotateCcw: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.RotateCcw }))),
    Save: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Save }))),
    Loader: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Loader }))),
    Loader2: defineAsyncComponent(() => import('lucide-vue-next').then(m => ({ default: m.Loader2 })))
  }

  // Get icon component by name
  const getIconComponent = (iconName: string) => {
    if (!iconName) return icons.Menu
    
    // Normalize icon name (remove spaces, capitalize)
    const normalizedName = iconName
      .replace(/\s+/g, '')
      .replace(/^[a-z]/, (char) => char.toUpperCase())
    
    return icons[normalizedName as keyof typeof icons] || icons.Menu
  }

  // Available icons list
  const availableIcons = Object.keys(icons)

  // Icon map for easy access
  const iconMap = icons

  return {
    getIcon,
    getIconComponent,
    availableIcons,
    iconMap,
    icons
  }
}