import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Brand } from './brand.model';

export interface BrandsState extends EntityState<Brand> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'brands' })
export class BrandsStore extends EntityStore<BrandsState> {

  constructor() {
    super();
  }

}
