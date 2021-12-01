import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LeadProductsStore, LeadProductsState } from './lead-products.store';

@Injectable({ providedIn: 'root' })
export class InterestedProductsQuery extends QueryEntity<LeadProductsState> {

  constructor(protected store: LeadProductsStore) {
    super(store);
  }

}
