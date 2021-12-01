import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BrandsStore, BrandsState } from './brands.store';

@Injectable({ providedIn: 'root' })
export class BrandsQuery extends QueryEntity<BrandsState> {

  constructor(protected store: BrandsStore) {
    super(store);
  }

}
