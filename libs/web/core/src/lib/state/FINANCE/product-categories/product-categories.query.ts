import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProductCategoriesStore, ItemCategoriesState } from './product-categories.store';

@Injectable({ providedIn: 'root' })
export class ProductCategoriesQuery extends QueryEntity<ItemCategoriesState> {

  constructor(protected store: ProductCategoriesStore) {
    super(store);
  }
}
