import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ProductAccountSetInListDto } from "@fom/shared/api-dtos";

export interface ProductAccountSettingsState extends EntityState<ProductAccountSetInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product-account-settings' , idKey:'_id'})
export class ProductAccountSettingsStore extends EntityStore<ProductAccountSettingsState> {

  constructor() {
    super();
  }

}
