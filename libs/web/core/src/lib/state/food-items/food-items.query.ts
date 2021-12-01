import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FoodItemsStore, FoodItemsState } from './food-items.store';

@Injectable({ providedIn: 'root' })
export class FoodItemsQuery extends QueryEntity<FoodItemsState> {

  constructor(protected store: FoodItemsStore) {
    super(store);
  }

}
