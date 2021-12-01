import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SchoolStore, SchoolState } from './school.store';

@Injectable({ providedIn: 'root' })
export class SchoolQuery extends QueryEntity<SchoolState> {

  constructor(protected store: SchoolStore) {
    super(store);
  }

}
