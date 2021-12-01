import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TempRequisitionLineItemsStore, TempRequisitionLineItemsState } from './temp-requisition-line-items.store';

@Injectable({ providedIn: 'root' })
export class TempRequisitionLineItemsQuery extends QueryEntity<TempRequisitionLineItemsState> {

  constructor(protected store: TempRequisitionLineItemsStore) {
    super(store);
  }

}
