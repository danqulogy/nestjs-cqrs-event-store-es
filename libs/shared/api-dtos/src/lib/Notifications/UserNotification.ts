export enum UserNotificationTypes {
  alert = 'alert',
  event = 'event',
  action = 'action'
}

export class UserNotificationDto{
  _id: string
  targetUserId: string
  message: string
  type: string| UserNotificationTypes
  read: boolean
  createdAt: Date
  employeeDisplayName?: any
}


export class WebPushSubscriptionDto{
  userId: string
  endpoint: string
  expirationTime: any
  keys: {
    p256dh: string
    auth: string
  }
  userAgent: string
  deviceId: string

}
