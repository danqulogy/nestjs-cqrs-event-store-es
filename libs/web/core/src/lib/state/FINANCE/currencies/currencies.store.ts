import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CurrencyDto } from "@fom/shared/api-dtos";

export interface CurrenciesState extends EntityState<CurrencyDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'currencies', idKey: '_id' })
export class CurrenciesStore extends EntityStore<CurrenciesState> {

  constructor() {
    super();
  }

}
