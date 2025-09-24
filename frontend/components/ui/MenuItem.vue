<template>
  <div>
    <!-- Menu item with submenu -->
    <div v-if="item.children && item.children.length > 0">
      <button
        @click="toggleSubmenu(item.name)"
        :aria-expanded="openSubmenus.includes(item.name)"
        :aria-controls="`submenu-${item.name}`"
        :aria-label="collapsed ? item.name : undefined"
        :class="[
          'flex items-center w-full rounded-lg font-medium transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 gap-3',
          level === 0 ? 'text-sm min-h-[2.5rem]' : 
          level === 1 ? 'text-sm min-h-[2.25rem]' : 
          level === 2 ? 'text-xs min-h-[2rem]' : 
          'text-xs min-h-[1.75rem]',
          collapsed ? 'px-2 py-2 justify-center' : 
          level === 0 ? 'px-3 py-2' : 
          level === 1 ? 'px-3 py-1.5' : 
          level === 2 ? 'px-2 py-1' : 
          'px-2 py-1',
          level === 0 ? '' : '',
          isActive(item.href)
            ? level === 0 ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary'
            : isSubmenuActive(item.children)
              ? level === 0 ? 'bg-accent/50 text-accent-foreground' : 'bg-accent/30 text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        ]"
      >
        <component :is="item.icon" :class="[
          level === 0 ? 'h-5 w-5' : 
          level === 1 ? 'h-4 w-4' : 
          level === 2 ? 'h-3.5 w-3.5' : 
          'h-3 w-3', 
          'flex-shrink-0', 'self-center'
        ]" />
        <Transition name="fade" mode="out-in">
          <span v-if="!collapsed" class="whitespace-nowrap flex-1 text-left leading-none self-center">
            <HighlightText :text="item.name" :query="searchQuery" />
          </span>
        </Transition>
        <Transition name="fade" mode="out-in">
          <ChevronDown 
            v-if="!collapsed" 
            :class="[
              level === 0 ? 'h-4 w-4' : 
              level === 1 ? 'h-3.5 w-3.5' : 
              level === 2 ? 'h-3 w-3' : 
              'h-2.5 w-2.5',
              'transition-transform duration-200 self-center flex-shrink-0',
              { 'rotate-180': openSubmenus.includes(item.name) }
            ]"
          />
        </Transition>
        
        <!-- Tooltip for collapsed state -->
        <Tooltip 
          v-if="collapsed" 
          :content="item.name"
          placement="right"
          :delay="300"
        />
      </button>
      
      <!-- Submenu -->
      <Transition name="slide-down">
        <div 
          v-if="openSubmenus.includes(item.name)" 
          :id="`submenu-${item.name}`"
          role="menu"
          :aria-label="`${item.name} submenu`"
          :class="collapsed ? 'mt-1 space-y-1' : `ml-${6 + level * 2} mt-1 space-y-1 border-l border-border/20 pl-2`"
        >
          <MenuItem
            v-for="subItem in item.children"
            :key="subItem.name"
            :item="subItem"
            :level="level + 1"
            :collapsed="collapsed"
            :open-submenus="openSubmenus"
            :toggle-submenu="toggleSubmenu"
            :is-active="isActive"
            :is-submenu-active="isSubmenuActive"
            :search-query="searchQuery"
          />
        </div>
      </Transition>
    </div>
    
    <!-- Menu item without submenu -->
    <div v-else>
      <NuxtLink
        :to="item.href"
        :aria-label="collapsed ? item.name : undefined"
        :aria-current="isActive(item.href) ? 'page' : undefined"
        :class="[
          'flex items-center w-full rounded-lg font-medium transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 gap-3',
          level === 0 ? 'text-sm min-h-[2.5rem]' : 
          level === 1 ? 'text-sm min-h-[2.25rem]' : 
          level === 2 ? 'text-xs min-h-[2rem]' : 
          'text-xs min-h-[1.75rem]',
          collapsed ? 'px-2 py-2 justify-center' : 
          level === 0 ? 'px-3 py-2' : 
          level === 1 ? 'px-3 py-1.5' : 
          level === 2 ? 'px-2 py-1' : 
          'px-2 py-1',
          level === 0 ? '' : '',
          isActive(item.href)
            ? level === 0 ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        ]"
      >
        <component :is="item.icon" :class="[
          level === 0 ? 'h-5 w-5' : 
          level === 1 ? 'h-4 w-4' : 
          level === 2 ? 'h-3.5 w-3.5' : 
          'h-3 w-3', 
          'flex-shrink-0', 'self-center'
        ]" />
        <Transition name="fade" mode="out-in">
          <span v-if="!collapsed" class="whitespace-nowrap flex-1 text-left leading-none self-center">
            <HighlightText :text="item.name" :query="searchQuery" />
          </span>
        </Transition>
        
        <!-- Tooltip for collapsed state -->
        <Tooltip 
          v-if="collapsed" 
          :content="item.name"
          placement="right"
          :delay="300"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import Tooltip from './Tooltip.vue'
import HighlightText from './HighlightText.vue'

interface MenuItem {
  name: string
  href: string
  icon: any
  children?: MenuItem[]
}

interface Props {
  item: MenuItem
  level?: number
  collapsed: boolean
  openSubmenus: string[]
  toggleSubmenu: (name: string) => void
  isActive: (href: string) => boolean
  isSubmenuActive: (children: MenuItem[]) => boolean
  searchQuery?: string
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
  searchQuery: ''
})
</script>
