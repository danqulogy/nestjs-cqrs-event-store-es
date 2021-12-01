import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ItemCategoryDto } from '@fom/shared/api-dtos';

export interface ItemCategoriesState extends EntityState<ItemCategoryDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'item-product-product-categories', idKey: '_id' })
export class ProductCategoriesStore extends EntityStore<ItemCategoriesState> {

  constructor() {
    super();
  }

}
