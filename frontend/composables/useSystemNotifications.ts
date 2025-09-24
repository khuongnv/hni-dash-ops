import { useErrorHandler } from './useErrorHandler'

export interface SystemNotification {
  id: number
  title: string
  message: string
  type: string
  status: string
  start_at?: string
  end_at?: string
  priority: string
  target_audience?: string
  action_url?: string
  action_text?: string
  is_read: boolean
  read_at?: string
  read_by?: number
  metadata?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export const useSystemNotifications = () => {
  const { handleAsyncError } = useErrorHandler()
  const { get, post, put, delete: del } = useAPI()

  // Lấy tất cả thông báo
  const getNotifications = async (page = 1, pageSize = 10, search?: string) => {
    return await handleAsyncError(
      async () => {
        const params: Record<string, any> = { page, pageSize }
        if (search) params.search = search
        return await get<SystemNotification[]>('/api/systemnotifications', params)
      },
      'getNotifications'
    )
  }

  // Lấy thông báo theo ID
  const getNotificationById = async (id: number) => {
    return await handleAsyncError(
      async () => {
        return await get<SystemNotification>(`/api/systemnotifications/${id}`)
      },
      'getNotificationById'
    )
  }

  // Tạo thông báo mới
  const createNotification = async (notificationData: Partial<SystemNotification>) => {
    return await handleAsyncError(
      async () => {
        return await post<SystemNotification>('/api/systemnotifications', notificationData)
      },
      'createNotification'
    )
  }

  // Cập nhật thông báo
  const updateNotification = async (id: number, notificationData: Partial<SystemNotification>) => {
    return await handleAsyncError(
      async () => {
        return await put<SystemNotification>(`/api/systemnotifications/${id}`, notificationData)
      },
      'updateNotification'
    )
  }

  // Xóa thông báo
  const deleteNotification = async (id: number) => {
    return await handleAsyncError(
      async () => {
        await del(`/api/systemnotifications/${id}`)
        return true
      },
      'deleteNotification'
    )
  }

  // Đánh dấu đã đọc
  const markAsRead = async (id: number, userId: number) => {
    return await handleAsyncError(
      async () => {
        await post(`/api/systemnotifications/${id}/mark-read`, { userId })
        return true
      },
      'markAsRead'
    )
  }

  // Lấy thông báo chưa đọc
  const getUnreadNotifications = async (userId: number) => {
    return await handleAsyncError(
      async () => {
        return await get<SystemNotification[]>(`/api/systemnotifications/unread/${userId}`)
      },
      'getUnreadNotifications'
    )
  }

  // Lấy thông báo theo loại
  const getNotificationsByType = async (type: string, page = 1, pageSize = 10) => {
    return await handleAsyncError(
      async () => {
        return await get<SystemNotification[]>(`/api/systemnotifications/by-type/${type}`, { page, pageSize })
      },
      'getNotificationsByType'
    )
  }

  // Lấy thông báo theo độ ưu tiên
  const getNotificationsByPriority = async (priority: string) => {
    return await handleAsyncError(
      async () => {
        return await get<SystemNotification[]>(`/api/systemnotifications/high-priority`)
      },
      'getNotificationsByPriority'
    )
  }

  return {
    getNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
    markAsRead,
    getUnreadNotifications,
    getNotificationsByType,
    getNotificationsByPriority
  }
}
