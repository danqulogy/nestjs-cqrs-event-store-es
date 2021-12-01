import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { IndustriesStore, IndustriesState } from './industries.store';

@Injectable({ providedIn: 'root' })
export class IndustriesQuery extends QueryEntity<IndustriesState> {

  constructor(protected store: IndustriesStore) {
    super(store);
  }

}
