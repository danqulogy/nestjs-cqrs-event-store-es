import { UserNotificationTypes } from '@fom/shared/api-dtos';

export interface IUserNotification {
  _id?: string
  targetUserId: string
  message: string
  type: string| UserNotificationTypes
  read?: boolean
  createdAt?: Date
  _targetUser?: any
}

export class UserNotification{
  _id: string
  targetUserId: string
  message: string
  type: string| UserNotificationTypes
  read?: boolean
}
