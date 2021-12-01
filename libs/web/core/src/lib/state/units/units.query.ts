import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UnitsStore, UnitsState } from './units.store';

@Injectable({ providedIn: 'root' })
export class UnitsQuery extends QueryEntity<UnitsState> {

  constructor(protected store: UnitsStore) {
    super(store);
  }

}
