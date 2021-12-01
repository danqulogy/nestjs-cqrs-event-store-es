import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { UnitsInListDto } from '@fom/shared/api-dtos';


export interface UnitsState extends EntityState<UnitsInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'units', idKey: '_id' })
export class UnitsStore extends EntityStore<UnitsState> {

  constructor() {
    super();
  }

}
