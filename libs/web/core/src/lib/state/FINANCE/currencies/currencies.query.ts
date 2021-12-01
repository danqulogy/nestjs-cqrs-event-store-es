import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CurrenciesStore, CurrenciesState } from './currencies.store';
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class CurrenciesQuery extends QueryEntity<CurrenciesState> {


  baseCurrency$ = this.selectAll().pipe(
    map(currencies => currencies.find(c => c.isBaseCurrency))
  )

  constructor(protected store: CurrenciesStore) {
    super(store);
  }

}
