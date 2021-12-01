import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { NotificationsState, NotificationsStore } from './notifications.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserNotificationDto, UserNotificationTypes } from '@fom/shared/api-dtos';

@Injectable({ providedIn: 'root' })
export class NotificationsQuery extends QueryEntity<NotificationsState> {

  totalUnread$:Observable<number> =  this.selectAll().pipe(
    map(data => data.filter(d => !d.read)),
    map(data => data.length)
  )

  totalUnreadAlerts$: Observable<number> = this.selectAll().pipe(
    map(data => data.filter(d => d.type === UserNotificationTypes.alert)),
    map(data => data.filter(d => !d.read)),
    map(data => data.length)
  )

  alerts$: Observable<UserNotificationDto[]> = this.selectAll().pipe(
    map(data => data.filter(d => d.type === UserNotificationTypes.alert)),
    map(data => data.sort((a: UserNotificationDto,b: UserNotificationDto) => {
      // return (a === b)? 0 : a? 1 : -1;
      return Number(a.read) - Number(b.read)
      // return (new Date(b.createdAt).getTime()) - (new Date(a.createdAt)).getTime()
    }))
  )


  constructor(protected store: NotificationsStore) {
    super(store);
  }

}
