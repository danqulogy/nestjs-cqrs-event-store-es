import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { UserNotificationDto } from '@fom/shared/api-dtos';

export interface NotificationsState extends EntityState<UserNotificationDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Notifications', idKey:'_id', cache: {ttl: 1000*60*1} })
export class NotificationsStore extends EntityStore<NotificationsState> {

  constructor() {
    super();
  }

}
