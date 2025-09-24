/**
 * Composable for SEO management
 */
export function useSEO(options: {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  author?: string
  publishedTime?: string
  modifiedTime?: string
} = {}) {
  const {
    title = 'HNI Dashboard Operations',
    description = 'Internal dashboard for HNI operations management',
    keywords = ['HNI', 'dashboard', 'operations', 'management'],
    image = '/og-image.png',
    url = '',
    type = 'website',
    author = 'HNI Team',
    publishedTime,
    modifiedTime
  } = options

  // Set page title
  useHead({
    title,
    meta: [
      // Basic meta tags
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      { name: 'author', content: author },
      
      // Open Graph tags
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:site_name', content: 'HNI Dashboard' },
      
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // Additional meta tags
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'theme-color', content: '#1e40af' },
      { name: 'msapplication-TileColor', content: '#1e40af' },
      
      // Article specific tags
      ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
      ...(modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),
      ...(author ? [{ property: 'article:author', content: author }] : [])
    ],
    link: [
      // Canonical URL
      ...(url ? [{ rel: 'canonical', href: url }] : []),
      
      // Favicon
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' }
    ]
  })

  return {
    title,
    description,
    keywords,
    image,
    url,
    type,
    author
  }
}

/**
 * Generate structured data for pages
 */
export function useStructuredData(data: {
  '@context': string
  '@type': string
  [key: string]: any
}) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(data)
      }
    ]
  })
}

/**
 * Generate breadcrumb structured data
 */
export function useBreadcrumbStructuredData(breadcrumbs: Array<{
  name: string
  url: string
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  }

  useStructuredData(structuredData)
}
