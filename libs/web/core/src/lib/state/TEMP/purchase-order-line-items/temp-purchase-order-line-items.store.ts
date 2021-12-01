import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TempPurchaseOrderLineItemDto } from "@fom/shared/api-dtos";

export interface TempPurchaseOrderLineItemsState extends EntityState<TempPurchaseOrderLineItemDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'temp-purchase-order-line-interested_products', idKey: 'id' })
export class TempPurchaseOrderLineItemsStore extends EntityStore<TempPurchaseOrderLineItemsState> {

  constructor() {
    super();
  }

}
