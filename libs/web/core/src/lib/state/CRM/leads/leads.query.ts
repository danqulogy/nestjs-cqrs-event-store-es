import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LeadsStore, LeadsState } from './leads.store';

@Injectable({ providedIn: 'root' })
export class LeadsQuery extends QueryEntity<LeadsState> {

  constructor(protected store: LeadsStore) {
    super(store);
  }

}
