import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ActivityDto } from "@fom/shared/api-dtos";

export interface ActivityState extends EntityState<ActivityDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'activity', idKey: '_id' })
export class ActivityStore extends EntityStore<ActivityState> {

  constructor() {
    super();
  }

}
