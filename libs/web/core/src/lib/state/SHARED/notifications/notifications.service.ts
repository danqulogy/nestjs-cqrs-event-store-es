import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { NotificationsStore } from './notifications.store';
import { UserNotificationDto } from '@fom/shared/api-dtos';
import { API_BASE_URL } from '../../../constants';
import { NotificationsQuery } from './notifications.query';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  api = `${this.serverBaseUrl}/user-notifications`
  constructor(private notificationsStore: NotificationsStore,
              private query: NotificationsQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private http: HttpClient) {
  }


  getUserNotificationsById(id:string) {
    // return this.http.get<UserNotificationDto[]>(`${this.api}/${id}`).pipe(tap(entities => {
    //   this.notificationsStore.set(entities);
    // }));
    // return of([])
  }

  set(notifications: UserNotificationDto[]){
    this.notificationsStore.set(notifications)
  }

  add(notification: UserNotificationDto) {
    this.notificationsStore.add(notification);
  }

  update(id, notification: Partial<UserNotificationDto>) {
    this.notificationsStore.update(id, notification);
  }

  remove(id: ID) {
    this.notificationsStore.remove(id);
  }

  clearCache(){
    this.notificationsStore.setHasCache(false, {restartTTL: true})
  }

}
