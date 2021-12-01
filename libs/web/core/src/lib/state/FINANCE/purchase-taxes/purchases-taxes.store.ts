import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PurchaseTaxInListDto, SalesTaxInListDto } from "@fom/shared/api-dtos";

export interface PurchasesTaxesState extends EntityState<PurchaseTaxInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'purchases-taxes', idKey: '_id'})
export class PurchasesTaxesStore extends EntityStore<PurchasesTaxesState> {

  constructor() {
    super();
  }

}
