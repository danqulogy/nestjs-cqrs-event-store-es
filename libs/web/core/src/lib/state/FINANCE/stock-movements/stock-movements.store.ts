import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { StockBalanceDto, StockMovementDto } from "@fom/shared/api-dtos";

export interface StockMovementsState extends EntityState<StockMovementDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stock-movements', idKey: '_id' })
export class StockMovementsStore extends EntityStore<StockMovementsState> {

  constructor() {
    super();
  }

}
