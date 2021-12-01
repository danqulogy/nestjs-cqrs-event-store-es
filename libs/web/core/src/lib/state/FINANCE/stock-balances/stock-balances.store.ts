import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { StockBalanceDto } from "@fom/shared/api-dtos";

export interface StockBalancesState extends EntityState<StockBalanceDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stock-balances', idKey: '_id' })
export class StockBalancesStore extends EntityStore<StockBalancesState> {

  constructor() {
    super();
  }

}
