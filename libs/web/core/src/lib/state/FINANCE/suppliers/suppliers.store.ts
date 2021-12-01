import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SupplierDto } from "@fom/shared/api-dtos";

export interface SuppliersState extends EntityState<SupplierDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'suppliers', idKey: '_id' })
export class SuppliersStore extends EntityStore<SuppliersState> {

  constructor() {
    super();
  }

}
