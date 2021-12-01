import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ActivityStore, ActivityState } from './activity.store';

@Injectable({ providedIn: 'root' })
export class ActivityQuery extends QueryEntity<ActivityState> {

  constructor(protected store: ActivityStore) {
    super(store);
  }

}
