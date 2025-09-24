import { useErrorHandler } from './useErrorHandler'
import { demoSystemNotifications, SystemNotification } from '../data/demo-system-notifications'

export const useSystemNotifications = () => {
  const { handleAsyncError } = useErrorHandler()

  // Lấy tất cả thông báo
  const getNotifications = async () => {
    return await handleAsyncError(
      async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200))
        return demoSystemNotifications
      },
      'getNotifications'
    )
  }

  // Lấy thông báo theo ID
  const getNotificationById = async (id: number) => {
    return await handleAsyncError(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
        const notification = demoSystemNotifications.find(notif => notif.id === id)
        if (!notification) {
          throw new Error('Notification not found')
        }
        return notification
      },
      'getNotificationById'
    )
  }

  // Tạo thông báo mới
  const createNotification = async (notificationData: any) => {
    return await handleAsyncError(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 300))
        const newNotification: SystemNotification = {
          id: Math.max(...demoSystemNotifications.map(n => n.id)) + 1,
          title: notificationData.title || '',
          content: notificationData.content || '',
          type: notificationData.type || 'general',
          priority: notificationData.priority || 'medium',
          is_read: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          expires_at: notificationData.expires_at || null,
          user_id: notificationData.user_id || null
        }
        demoSystemNotifications.push(newNotification)
        return newNotification
      },
      'createNotification'
    )
  }

  // Cập nhật thông báo
  const updateNotification = async (id: number, notificationData: any) => {
    return await handleAsyncError(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 300))
        const index = demoSystemNotifications.findIndex(notif => notif.id === id)
        if (index === -1) {
          throw new Error('Notification not found')
        }
        demoSystemNotifications[index] = {
          ...demoSystemNotifications[index],
          ...notificationData,
          updated_at: new Date().toISOString()
        }
        return demoSystemNotifications[index]
      },
      'updateNotification'
    )
  }

  // Xóa thông báo
  const deleteNotification = async (id: number) => {
    return await handleAsyncError(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 200))
        const index = demoSystemNotifications.findIndex(notif => notif.id === id)
        if (index === -1) {
          throw new Error('Notification not found')
        }
        demoSystemNotifications.splice(index, 1)
        return true
      },
      'deleteNotification'
    )
  }

  // Đánh dấu đã đọc
  const markAsRead = async (id: number) => {
    return await handleAsyncError(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 200))
        const index = demoSystemNotifications.findIndex(notif => notif.id === id)
        if (index === -1) {
          throw new Error('Notification not found')
        }
        demoSystemNotifications[index].is_read = true
        demoSystemNotifications[index].updated_at = new Date().toISOString()
        return true
      },
      'markAsRead'
    )
  }

  // Lấy thông báo chưa đọc
  const getUnreadNotifications = async () => {
    return await handleAsyncError(
      async () => {
        const notifications = await getNotifications()
        return notifications?.filter((notification: SystemNotification) => !notification.is_read) || []
      },
      'getUnreadNotifications'
    )
  }

  // Lấy thông báo theo loại
  const getNotificationsByType = async (type: string) => {
    return await handleAsyncError(
      async () => {
        const notifications = await getNotifications()
        return notifications?.filter((notification: SystemNotification) => notification.type === type) || []
      },
      'getNotificationsByType'
    )
  }

  // Lấy thông báo theo độ ưu tiên
  const getNotificationsByPriority = async (priority: string) => {
    return await handleAsyncError(
      async () => {
        const notifications = await getNotifications()
        return notifications?.filter((notification: SystemNotification) => notification.priority === priority) || []
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
