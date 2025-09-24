import { useErrorHandler } from './useErrorHandler'

export interface GitCommit {
  hash: string
  author: string
  email: string
  date: string
  message: string
}

export interface GitLogData {
  currentBranch: string
  remoteBranches: string[]
  commits: GitCommit[]
  lastPush: {
    unpushed: number
    commits: string[]
  } | null
  rawLog: string
  source: 'local' | 'github' | 'fallback'
}

export interface GitLogResponse {
  success: boolean
  data: GitLogData
}

export const useGitLog = () => {
  const { handleAsyncError } = useErrorHandler()
  
  const getGitLog = async (): Promise<GitLogData> => {
    return await handleAsyncError(async () => {
      const response = await $fetch<GitLogResponse>('/api/git/log')
      if (!response.success) {
        throw new Error('Failed to fetch git log')
      }
      return response.data
    }, 'Git Log')
  }
  
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    } catch (error) {
      return dateString
    }
  }
  
  const getCommitHashShort = (hash: string): string => {
    return hash.substring(0, 7)
  }
  
  const getCommitMessagePreview = (message: string, maxLength: number = 50): string => {
    if (message.length <= maxLength) return message
    return message.substring(0, maxLength) + '...'
  }
  
  return {
    getGitLog,
    formatDate,
    getCommitHashShort,
    getCommitMessagePreview
  }
}
