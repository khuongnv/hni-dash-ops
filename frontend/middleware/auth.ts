export default defineNuxtRouteMiddleware((to) => {
  // Routes that don't require authentication
  const publicRoutes = [
    '/',
    '/main/dashboard',
    '/main/about',
    '/login',
    '/auth/sso-callback',
    '/auth/sso-error',
    '/404'
  ]
  
  // Check if current route is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/') {
      return to.path === '/'
    }
    return to.path.startsWith(route)
  })
  
  // If it's a public route, allow access
  if (isPublicRoute) {
    return
  }
  
  // For protected routes, check authentication
  if (process.client) {
    const user = localStorage.getItem('auth_user')
    if (!user) {
      return navigateTo('/login')
    }
  }
})
