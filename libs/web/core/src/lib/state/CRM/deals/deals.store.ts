import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { DealInListDto } from '@fom/shared/api-dtos';


export interface DealsState extends EntityState<DealInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'deals', idKey: '_id' })
export class DealsStore extends EntityStore<DealsState> {

  constructor() {
    super();
  }

}
