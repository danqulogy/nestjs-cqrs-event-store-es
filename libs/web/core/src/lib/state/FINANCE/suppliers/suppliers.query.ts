import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SuppliersStore, SuppliersState } from './suppliers.store';

@Injectable({ providedIn: 'root' })
export class SuppliersQuery extends QueryEntity<SuppliersState> {

  constructor(protected store: SuppliersStore) {
    super(store);
  }

}
