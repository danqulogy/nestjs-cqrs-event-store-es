import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TempRequisitionLineItem } from '@fom/shared/api-dtos';

export interface TempRequisitionLineItemsState extends EntityState<TempRequisitionLineItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'temp-requisition-line-interested_products', idKey: 'id' })
export class TempRequisitionLineItemsStore extends EntityStore<TempRequisitionLineItemsState> {

  constructor() {
    super();
  }

}
