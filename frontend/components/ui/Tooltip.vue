<template>
  <div class="relative inline-block">
    <div
      ref="triggerRef"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @focus="showTooltip"
      @blur="hideTooltip"
    >
      <slot />
    </div>
    
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isVisible"
        ref="tooltipRef"
        role="tooltip"
        :aria-hidden="!isVisible"
        class="absolute z-50 px-2 py-1 text-xs text-popover-foreground bg-popover rounded-md shadow-lg whitespace-nowrap"
        :class="positionClasses"
        :style="tooltipStyle"
      >
        {{ content }}
        <div 
          class="absolute w-0 h-0 border-4 border-transparent"
          :class="arrowClasses"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'right',
  delay: 0,
  disabled: false
})

const isVisible = ref(false)
const triggerRef = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()
const tooltipStyle = ref({})
let showTimeout: NodeJS.Timeout | null = null

const positionClasses = computed(() => {
  const baseClasses = 'pointer-events-none'
  
  switch (props.placement) {
    case 'top':
      return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`
    case 'bottom':
      return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-2`
    case 'left':
      return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 mr-2`
    case 'right':
      return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 ml-2`
    default:
      return baseClasses
  }
})

const arrowClasses = computed(() => {
  switch (props.placement) {
    case 'top':
      return 'top-full left-1/2 transform -translate-x-1/2 border-t-popover'
    case 'bottom':
      return 'bottom-full left-1/2 transform -translate-x-1/2 border-b-popover'
    case 'left':
      return 'left-full top-1/2 transform -translate-y-1/2 border-l-popover'
    case 'right':
      return 'right-full top-1/2 transform -translate-y-1/2 border-r-popover'
    default:
      return ''
  }
})

const updatePosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  let top = 0
  let left = 0

  switch (props.placement) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - 8
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      break
    case 'bottom':
      top = triggerRect.bottom + 8
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      left = triggerRect.left - tooltipRect.width - 8
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      left = triggerRect.right + 8
      break
  }

  // Keep tooltip within viewport
  if (left < 8) left = 8
  if (left + tooltipRect.width > viewport.width - 8) {
    left = viewport.width - tooltipRect.width - 8
  }
  if (top < 8) top = 8
  if (top + tooltipRect.height > viewport.height - 8) {
    top = viewport.height - tooltipRect.height - 8
  }

  tooltipStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`
  }
}

const showTooltip = () => {
  if (props.disabled) return
  
  if (showTimeout) {
    clearTimeout(showTimeout)
  }
  
  showTimeout = setTimeout(() => {
    isVisible.value = true
    nextTick(() => {
      updatePosition()
    })
  }, props.delay)
}

const hideTooltip = () => {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }
  isVisible.value = false
}

onUnmounted(() => {
  if (showTimeout) {
    clearTimeout(showTimeout)
  }
})
</script>
