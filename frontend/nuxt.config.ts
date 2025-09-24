// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: true,
    timeline: {
      enabled: false
    }
  },
  compatibilityDate: '2025-01-13',
  
  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt'
  ],

  // Performance optimizations
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    viewTransition: true,
    componentIslands: false
  },

  // Build optimizations
  build: {
    transpile: ['lucide-vue-next']
  },

  // Nitro optimizations
  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  // Color mode configuration
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // App configuration
  app: {
    head: {
      title: 'HNI Dashboard Operations',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Internal dashboard for HNI operations' },
        { name: 'theme-color', content: '#1e40af' },
        { name: 'robots', content: 'noindex, nofollow' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  },

  // Runtime config
  runtimeConfig: {
    public: {
      appName: 'HNI Dashboard Operations'
    }
  },

  // Vite optimizations
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'lucide-icons': ['lucide-vue-next']
          }
        }
      }
    },
    logLevel: 'warn'
  },

  // Suppress warnings
  typescript: {
    strict: false,
    typeCheck: false
  },

  // Vue configuration
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('-')
    },
    runtimeCompiler: false
  },

  // SSR configuration
  ssr: true,
  
  // Sourcemap configuration
  sourcemap: {
    server: false,
    client: false
  }
})
