import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ActivityLogsStore, ActivitiesState } from './activity-logs.store';

@Injectable({ providedIn: 'root' })
export class ActivityLogsQuery extends QueryEntity<ActivitiesState> {

  constructor(protected store: ActivityLogsStore) {
    super(store);
  }

}
