import { Injectable, Inject } from '@angular/core'
import connect from 'socket.io-client'
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message';
import {  NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs'
import {Activity, ActivityLogsService} from '../state/ADMIN/activity-logs'
import { SERVER_BASE_URL } from '../constants';
import {
  GetUserNotificationDto,
  MarkNotificationAsReadDto, UserInListDto,
  UserNotificationDto, WebPushSubscriptionDto,
  WebSocketEvents
} from "@fom/shared/api-dtos";
import { NotificationsService } from '../state/SHARED/notifications';
import { AuthStoreKeys } from '../auth/authStoreKeys';
import { SwPush } from '@angular/service-worker';
import { parse } from 'bowser';
import * as DeviceUUID from 'device-uuid'

@Injectable({ providedIn: 'root' })
export class SocketsService {
  // private _socket = {jobAnalysis}
  // public socket = connect(this.serverBaseUrl)
  // authedUser = <UserInListDto>JSON.parse(localStorage.getItem(AuthStoreKeys.USER));
  // activityCreatedSubject = new BehaviorSubject<Activity>(null)
  // private tempCurrentSubscription: PushSubscription;
  // constructor(
  //   private router: Router,
  //   private notificationService: NotificationsService,
  //   private activitiesSrv: ActivityLogsService,
  //   private message: NzMessageService,
  //   private notifier: NzNotificationService,
  //   private swPush: SwPush,
  //   @Inject(SERVER_BASE_URL) private serverBaseUrl: string
  // ) {
  //  this.init()
  // }
  //
  // init() {
  //   this.socket.on('connect', async () => {
  //     console.log('Socket connected')
  //
  //     this.getUserNotifications()
  //     this.subscribeToSalaryUpgradeRequestPlacedEvents()
  //     this.subscribeToUserNotifications()
  //     this.onCheckIfPushSubscriptionExistResult()
  //   })
  //
  //   this.socket.on('disconnect', async () => {
  //     this.socket.connect()
  //   })
  // }
  //
  // handleRealtimeAdd(data: Activity) {
  //   // this.activitiesSrv.addOneToCache(data)
  //   /**
  //    * Deprecated because of visual disturbances
  //    * Intended to work for administrators only
  //    */
  //   // this.message.create(this.getNotificationMessageType(data.type), data.message)
  // }
  //
  // private getNotificationMessageType(type: string) {
  //   let result = null;
  //   switch (type) {
  //     case 'create':
  //       result = 'success'
  //       break;
  //
  //     case 'update':
  //     case 'patch':
  //       result =  'info'
  //       break;
  //
  //     case 'remove':
  //       result =  'warning'
  //       break;
  //   }
  //   return result;
  // }
  // fetchUserNotifications() {
  //   this.socket.emit(
  //     'find',
  //     'notifications',
  //     {
  //       targetUserId: this.authedUser._id,
  //       $limit: 100,
  //       $sort: {
  //         createdAt: -1,
  //       },
  //     },
  //     (error, data) => {
  //       console.log('notifications emited', data)
  //       // this.notificationService.addAllToCache(data, {})
  //     },
  //   )
  // }
  //
  // updatedNoticationViewedStatus() {
  //   console.log('authedUser', this.authedUser)
  //   this.socket.emit(
  //     'patch',
  //     'notifications',
  //     null,
  //     {
  //       viewed: true,
  //     },
  //     {
  //       targetUserId: this.authedUser._id,
  //       type: 'alert',
  //       viewed: false,
  //     },
  //     (error, message) => {
  //       if (!error) {
  //         this.fetchUserNotifications()
  //       }
  //     },
  //   )
  // }
  //
  // disconnect() {
  //   this.socket.disconnect()
  // }
  //
  // private subscribeToSalaryUpgradeRequestPlacedEvents() {
  //   this.socket.on(WebSocketEvents.SalaryUpgradeRequestPlaced, (data: UserNotificationDto) => {
  //     if(data && data.targetUserId === this.authedUser._id ){
  //       this.notificationService.add(data)
  //       this.notifier.info('Alert', data.message)
  //     }
  //   })
  //
  // }
  //
  // getUserNotifications() {
  //   setInterval(()=> {
  //     console.log('sockets accessing auth_id', this.authedUser._id)
  //     this.socket.emit(WebSocketEvents.GetUserNotifications, {
  //       userId: this.authedUser._id
  //     } as GetUserNotificationDto)
  //     // console.log('emitted get user notifications')
  //   }, 50000)
  // }
  //
  // private subscribeToUserNotifications() {
  //   this.socket.on(WebSocketEvents.GetUserNotificationsResult, (data: UserNotificationDto[]) => {
  //     const filter = data.filter(d => d.targetUserId === this.authedUser._id)
  //     this.notificationService.set(filter)
  //     // console.log(`${filter.length} notifications for ${this.authedUser.displayName}`)
  //   })
  // }
  //
  // sendMarkNotificationAsRead(note: UserNotificationDto) {
  //   if(!note) return;
  //   this.socket.emit(WebSocketEvents.MarkNotificationAsRead, {
  //     notificationId: note._id,
  //     userId: note.targetUserId
  //   } as MarkNotificationAsReadDto)
  // }
  //
  // subscribeToWebPushNotification(pushSubscription: WebPushSubscriptionDto) {
  //   this.socket.emit(WebSocketEvents.SubscribeWebPushNotificationsWithServer, pushSubscription)
  //   console.log('subscribing for push with server', pushSubscription);
  // }
  //
  // checkIfSubscriptionExistOnServer(subscription: PushSubscription) {
  //   this.tempCurrentSubscription = subscription
  //   this.socket.emit(WebSocketEvents.CheckIfPushSubscriptionExist, {endpoint: subscription.endpoint})
  // }
  //
  // onCheckIfPushSubscriptionExistResult(){
  //   this.socket.on(WebSocketEvents.CheckIfPushSubscriptionExistResult, (data) => {
  //     console.log(WebSocketEvents.CheckIfPushSubscriptionExistResult, data)
  //     // If it exist do nothing
  //     this.init()
  //
  //     // if does not exist - Create one
  //     if(!data && this.tempCurrentSubscription){
  //       const ua = parse(window.navigator.userAgent)
  //       const userAgent = `${ua.os.name} ${ua.os.versionName} ${ua.browser.name}  ${ua.browser.version} ${ua.platform.type} - ${ua.engine.name} engine`
  //
  //       const deviceId = new DeviceUUID.DeviceUUID().get()
  //
  //
  //       // Subscribe with server
  //       const payload: WebPushSubscriptionDto = {
  //         userAgent: userAgent,
  //         deviceId: deviceId,
  //         endpoint: this.tempCurrentSubscription.endpoint,
  //         expirationTime: this.tempCurrentSubscription.expirationTime,
  //         keys: {
  //           auth: this.tempCurrentSubscription.toJSON().keys.auth,
  //           p256dh: this.tempCurrentSubscription.toJSON().keys.p256dh
  //         },
  //         userId: this.authedUser._id
  //       }
  //
  //       this.subscribeToWebPushNotification(payload)
  //       this.init()
  //     }
  //   })
  // }
}
