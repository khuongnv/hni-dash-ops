export const useErrorHandler = () => {
  const handleError = (error: any, context?: string) => {
    const errorMessage = error?.message || error?.toString() || 'Unknown error'
    const errorContext = context ? `[${context}]` : ''
    
    console.error(`${errorContext} ${errorMessage}`, error)
    
    // Có thể thêm logic gửi error đến logging service ở đây
    // Ví dụ: Sentry, LogRocket, etc.
    
    return {
      message: errorMessage,
      context: errorContext,
      timestamp: new Date().toISOString()
    }
  }

  const handleAsyncError = async <T>(
    asyncFn: () => Promise<T>,
    context?: string,
    fallback?: T
  ): Promise<T | null> => {
    try {
      return await asyncFn()
    } catch (error) {
      handleError(error, context)
      return fallback || null
    }
  }

  return {
    handleError,
    handleAsyncError
  }
}
