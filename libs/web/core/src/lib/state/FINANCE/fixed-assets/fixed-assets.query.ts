import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FixedAssetsStore, FixedAssetsState } from './fixed-assets.store';

@Injectable({ providedIn: 'root' })
export class FixedAssetsQuery extends QueryEntity<FixedAssetsState> {

  constructor(protected store: FixedAssetsStore) {
    super(store);
  }

}
