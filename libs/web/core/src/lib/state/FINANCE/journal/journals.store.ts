import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TransactionsDto } from "@fom/shared/api-dtos";

export interface JournalsState extends EntityState<TransactionsDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'journals', idKey: '_id' })
export class JournalsStore extends EntityStore<JournalsState> {
  constructor() {
    super();
  }
}
