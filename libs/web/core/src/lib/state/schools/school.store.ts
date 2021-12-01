import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SchoolsInListDto } from '@fom/shared/api-dtos';

export interface SchoolState extends EntityState<SchoolsInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'school', idKey:'_id' })
export class SchoolStore extends EntityStore<SchoolState> {

  constructor() {
    super();
  }

}
