import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WarehousesStore, WarehousesState } from './warehouses.store';

@Injectable({ providedIn: 'root' })
export class WarehousesQuery extends QueryEntity<WarehousesState> {

  constructor(protected store: WarehousesStore) {
    super(store);
  }

}
