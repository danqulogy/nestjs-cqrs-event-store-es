import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PurchasesTaxesStore, PurchasesTaxesState } from './purchases-taxes.store';

@Injectable({ providedIn: 'root' })
export class PurchasesTaxesQuery extends QueryEntity<PurchasesTaxesState> {

  constructor(protected store: PurchasesTaxesStore) {
    super(store);
  }

}
