import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SalesTaxInListDto } from '@fom/shared/api-dtos';

export interface SalesTaxesState extends EntityState<SalesTaxInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sales-taxes', idKey: '_id'})
export class SalesTaxesStore extends EntityStore<SalesTaxesState> {

  constructor() {
    super();
  }

}
