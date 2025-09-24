export default defineNuxtPlugin(() => {
  // Suppress Vue warnings in development
  if (process.dev) {
    const originalWarn = console.warn
    console.warn = (...args) => {
      const message = args[0]
      
      // Suppress specific warnings
      if (typeof message === 'string') {
        if (message.includes('<Suspense> is an experimental feature')) {
          return
        }
        if (message.includes('Component is missing template or render function')) {
          return
        }
        if (message.includes('Failed to resolve component')) {
          return
        }
        if (message.includes('Invalid prop')) {
          return
        }
      }
      
      // Show other warnings
      originalWarn.apply(console, args)
    }
  }
})
