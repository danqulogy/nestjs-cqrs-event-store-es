import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ItemInListDto } from '@fom/shared/api-dtos';

export interface ItemsState extends EntityState<ItemInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'items', idKey: '_id' })
export class ItemsStore extends EntityStore<ItemsState> {

  constructor() {
    super();
  }

}
