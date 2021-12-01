import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { FoodItemsInListDto } from '@fom/shared/api-dtos';

export interface FoodItemsState extends EntityState<FoodItemsInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'food_items', idKey:'_id', resettable: true })
export class FoodItemsStore extends EntityStore<FoodItemsState> {

  constructor() {
    super();
  }

}
