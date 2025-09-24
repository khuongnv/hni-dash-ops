/**
 * Composable for accessibility features
 */
export function useAccessibility() {
  // Focus management
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  
  const trapFocus = (element: HTMLElement) => {
    const focusableContent = element.querySelectorAll(focusableElements)
    const firstFocusableElement = focusableContent[0] as HTMLElement
    const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus()
          e.preventDefault()
        }
      }
    }

    element.addEventListener('keydown', handleTabKey)
    
    return () => {
      element.removeEventListener('keydown', handleTabKey)
    }
  }

  // Skip to content link
  const createSkipLink = () => {
    const skipLink = document.createElement('a')
    skipLink.href = '#main-content'
    skipLink.textContent = 'Skip to main content'
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50'
    document.body.insertBefore(skipLink, document.body.firstChild)
  }

  // Announce to screen readers
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  // Keyboard navigation helpers
  const handleArrowKeys = (
    elements: HTMLElement[],
    currentIndex: number,
    direction: 'up' | 'down' | 'left' | 'right'
  ) => {
    let nextIndex = currentIndex
    
    switch (direction) {
      case 'up':
      case 'left':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1
        break
      case 'down':
      case 'right':
        nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0
        break
    }
    
    elements[nextIndex]?.focus()
    return nextIndex
  }

  // High contrast mode detection
  const isHighContrast = ref(false)
  
  const checkHighContrast = () => {
    if (process.client) {
      isHighContrast.value = window.matchMedia('(prefers-contrast: high)').matches
    }
  }

  onMounted(() => {
    if (process.client) {
      checkHighContrast()
      createSkipLink()
      
      // Listen for high contrast changes
      const mediaQuery = window.matchMedia('(prefers-contrast: high)')
      mediaQuery.addEventListener('change', checkHighContrast)
      
      return () => {
        mediaQuery.removeEventListener('change', checkHighContrast)
      }
    }
  })

  return {
    trapFocus,
    announce,
    handleArrowKeys,
    isHighContrast,
    focusableElements
  }
}

/**
 * Composable for keyboard shortcuts
 */
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  const handleKeydown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase()
    const modifiers = {
      ctrl: event.ctrlKey,
      alt: event.altKey,
      shift: event.shiftKey,
      meta: event.metaKey
    }
    
    const shortcutKey = Object.entries(modifiers)
      .filter(([, pressed]) => pressed)
      .map(([key]) => key)
      .concat(key)
      .join('+')
    
    if (shortcuts[shortcutKey]) {
      event.preventDefault()
      shortcuts[shortcutKey]()
    }
  }

  onMounted(() => {
    if (process.client) {
      document.addEventListener('keydown', handleKeydown)
    }
  })

  onUnmounted(() => {
    if (process.client) {
      document.removeEventListener('keydown', handleKeydown)
    }
  })

  return {
    handleKeydown
  }
}
