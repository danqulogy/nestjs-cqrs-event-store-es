import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TaskBoardDto } from '@fom/shared/api-dtos';

export interface TaskboardsState extends EntityState<TaskBoardDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'taskboards' , idKey: '_id'})
export class TaskboardsStore extends EntityStore<TaskboardsState> {

  constructor() {
    super();
  }


}
