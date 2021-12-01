import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FiscalYearsStore, FiscalYearsState } from './fiscal-years.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FiscalYearsQuery extends QueryEntity<FiscalYearsState> {
  currentYear$ = this.selectAll().pipe(map((years) => years.find(y => y.isActive)));

  constructor(protected store: FiscalYearsStore) {
    super(store);
  }
}
