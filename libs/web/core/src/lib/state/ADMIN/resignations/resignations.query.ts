import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ResignationsStore, ResignationsState } from './resignations.store';

@Injectable({ providedIn: 'root' })
export class ResignationsQuery extends QueryEntity<ResignationsState> {

  constructor(protected store: ResignationsStore) {
    super(store);
  }

}
