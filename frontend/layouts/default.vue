<template>
  <div class="min-h-screen bg-background">
    <!-- Mobile overlay -->
    <div 
      v-if="!sidebarCollapsed && isMobile"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="sidebarCollapsed = true"
    />
    
    <!-- Sidebar -->
    <Sidebar 
      :collapsed="sidebarCollapsed" 
      :class="{
        'translate-x-0': !sidebarCollapsed || !isMobile,
        '-translate-x-full': sidebarCollapsed && isMobile
      }"
    />
    
    <!-- Main Content -->
    <div 
      class="flex flex-col min-h-screen transition-all duration-300 ease-in-out" 
      :class="{
        'lg:pl-16': sidebarCollapsed,
        'lg:pl-64': !sidebarCollapsed
      }"
    >
      <!-- Header -->
      <Header 
        :collapsed="sidebarCollapsed"
        @toggle-sidebar="toggleSidebar"
      />
      
      <!-- Page Content -->
      <main class="flex-1 p-4 sm:p-6">
        <div class="h-full">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Sidebar state
const sidebarCollapsed = ref(false)

// Mobile detection
const isMobile = ref(false)

// Toggle sidebar
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// Responsive sidebar handling
let handleResize: (() => void) | null = null

onMounted(() => {
  if (process.client) {
    handleResize = () => {
      const width = window.innerWidth
      isMobile.value = width < 1024
      
      // On mobile, always collapse sidebar
      if (isMobile.value) {
        sidebarCollapsed.value = true
      } else {
        // On desktop, keep current state or default to expanded
        if (sidebarCollapsed.value === undefined) {
          sidebarCollapsed.value = false
        }
      }
    }
    
    // Initial check
    handleResize()
    
    // Listen for resize events
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (process.client && handleResize) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>
