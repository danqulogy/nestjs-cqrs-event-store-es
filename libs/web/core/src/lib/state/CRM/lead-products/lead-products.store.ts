import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { LeadProductDto } from "@fom/shared/api-dtos";

export interface LeadProductsState extends EntityState<LeadProductDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'products', idKey:'_id' })
export class LeadProductsStore extends EntityStore<LeadProductsState> {

  constructor() {
    super();
  }

}
