import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Activity } from './activity-log.model';

export interface ActivitiesState extends EntityState<Activity> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'activities', idKey: '_id' ,cache:{ttl: 1000} })
export class ActivityLogsStore extends EntityStore<ActivitiesState> {

  constructor() {
    super();
  }

}
