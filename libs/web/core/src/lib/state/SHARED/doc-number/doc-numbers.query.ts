import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DocNumbersStore, DocNumbersState } from './doc-numbers.store';
import { map, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DocNumbersQuery extends QueryEntity<DocNumbersState> {

  invoiceNumber$$ = new BehaviorSubject<number>(null);

  quoteNumber$ = this.selectFirst().pipe(
    map(doc => doc?.quote)
  )

  poNumber$ = this.selectFirst().pipe(
    map(doc => doc?.purchaseOrder)
  )
  invoiceNumber$ = this.selectFirst().pipe(
    map(doc => doc?.invoice),
    tap(val => this.invoiceNumber$$.next(val))
  )



  constructor(protected store: DocNumbersStore) {
    super(store);
  }

}
