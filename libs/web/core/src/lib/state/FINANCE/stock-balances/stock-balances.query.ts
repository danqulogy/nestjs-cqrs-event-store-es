import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StockBalancesStore, StockBalancesState } from './stock-balances.store';

@Injectable({ providedIn: 'root' })
export class StockBalancesQuery extends QueryEntity<StockBalancesState> {

  constructor(protected store: StockBalancesStore) {
    super(store);
  }

}
