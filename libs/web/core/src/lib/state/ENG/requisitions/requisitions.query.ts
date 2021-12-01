import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RequisitionsStore, RequisitionsState } from './requisitions.store';

@Injectable({ providedIn: 'root' })
export class RequisitionsQuery extends QueryEntity<RequisitionsState> {

  constructor(protected store: RequisitionsStore) {
    super(store);
  }

}
