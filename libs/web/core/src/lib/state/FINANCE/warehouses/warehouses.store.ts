import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { WarehouseInListDto } from '@fom/shared/api-dtos';

export interface WarehousesState extends EntityState<WarehouseInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'warehouses', idKey:'_id' })
export class WarehousesStore extends EntityStore<WarehousesState> {

  constructor() {
    super();
  }

}
