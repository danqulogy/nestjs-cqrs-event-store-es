import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StockMovementsStore, StockMovementsState } from './stock-movements.store';

@Injectable({ providedIn: 'root' })
export class StockMovementsQuery extends QueryEntity<StockMovementsState> {

  constructor(protected store: StockMovementsStore) {
    super(store);
  }

}
