import { defineAsyncComponent, type Component } from 'vue'

/**
 * Lazy load component với loading state và error handling
 */
export function useLazyComponent<T extends Component>(
  loader: () => Promise<T>,
  options: {
    delay?: number
    timeout?: number
    loadingComponent?: Component
    errorComponent?: Component
  } = {}
) {
  const {
    delay = 200,
    timeout = 10000,
    loadingComponent,
    errorComponent
  } = options

  return defineAsyncComponent({
    loader,
    delay,
    timeout,
    loadingComponent,
    errorComponent,
    onError(error, retry, fail, attempts) {
      console.warn(`Failed to load component (attempt ${attempts}):`, error)
      if (attempts <= 3) {
        retry()
      } else {
        fail()
      }
    }
  })
}

/**
 * Lazy load page component
 */
export function useLazyPage(path: string) {
  return useLazyComponent(() => import(`~/pages${path}.vue`))
}

/**
 * Lazy load UI component
 */
export function useLazyUI(name: string) {
  return useLazyComponent(() => import(`~/components/ui/${name}.vue`))
}
