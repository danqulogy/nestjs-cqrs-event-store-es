import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TaskDto } from '@fom/shared/api-dtos';

export interface TasksState extends EntityState<TaskDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tasks', idKey: '_id'})
export class TasksStore extends EntityStore<TasksState> {

  constructor() {
    super();
  }

}
