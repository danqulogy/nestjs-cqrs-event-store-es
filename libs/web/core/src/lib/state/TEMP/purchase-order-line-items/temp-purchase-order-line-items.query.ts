import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TempPurchaseOrderLineItemsStore, TempPurchaseOrderLineItemsState } from './temp-purchase-order-line-items.store';

@Injectable({ providedIn: 'root' })
export class TempPurchaseOrderLineItemsQuery extends QueryEntity<TempPurchaseOrderLineItemsState> {

  constructor(protected store: TempPurchaseOrderLineItemsStore) {
    super(store);
  }

}
