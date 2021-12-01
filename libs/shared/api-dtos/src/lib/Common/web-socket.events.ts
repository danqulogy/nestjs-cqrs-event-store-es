export enum WebSocketEvents{
  SalaryUpgradeRequestPlaced = 'salary-upgrade-request-placed',
  NewApprovalRequestNotification = 'new-approval-request-notification',
  GetUserNotifications = 'get-user-notifications',
  GetUserNotificationsResult = 'get-user-notifications-results',
  MarkNotificationAsRead = 'mark-notification-as-read',
  SubscribeWebPushNotificationsWithServer = 'subscribe-web-push-notification-with-server',
  CheckIfPushSubscriptionExist = 'check-if-push-subscription-exist',
  CheckIfPushSubscriptionExistResult = 'check-if-push-subscription-exist-result'
}

export class GetUserNotificationDto{
  userId: string
}

export class MarkNotificationAsReadDto{
  notificationId: string
  userId: string
}
