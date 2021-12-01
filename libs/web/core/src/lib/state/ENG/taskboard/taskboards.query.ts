import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TaskboardsStore, TaskboardsState } from './taskboards.store';

@Injectable({ providedIn: 'root' })
export class TaskboardsQuery extends QueryEntity<TaskboardsState> {

  constructor(protected store: TaskboardsStore) {
    super(store);
  }

}
