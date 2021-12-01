import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { LedgerInListDto } from '@fom/shared/api-dtos';

export interface LedgersState extends EntityState<LedgerInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ledgers', idKey: '_id'})
export class LedgersStore extends EntityStore<LedgersState> {

  constructor() {
    super();
  }

}
