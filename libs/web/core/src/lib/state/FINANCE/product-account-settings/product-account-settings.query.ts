import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProductAccountSettingsStore, ProductAccountSettingsState } from './product-account-settings.store';

@Injectable({ providedIn: 'root' })
export class ProductAccountSettingsQuery extends QueryEntity<ProductAccountSettingsState> {

  constructor(protected store: ProductAccountSettingsStore) {
    super(store);
  }

}
