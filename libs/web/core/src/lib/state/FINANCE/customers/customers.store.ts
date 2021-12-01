import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CustomersDto } from "@fom/shared/api-dtos";

export interface CustomersState extends EntityState<CustomersDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'customers', idKey: '_id' })
export class CustomersStore extends EntityStore<CustomersState> {

  constructor() {
    super();
  }

}
