import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita'
import { CompanyStore, CompanyState } from './company.store';

@Injectable({ providedIn: 'root' })
export class CompanyQuery extends Query<CompanyState> {

  constructor(protected store: CompanyStore) {
    super(store);
  }

}
