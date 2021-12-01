import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { QuoteLineItemsStore, QuoteLineItemsState } from './quote-line-items.store';
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class QuoteLineItemsQuery extends QueryEntity<QuoteLineItemsState> {

  itemsSubTotal =  this.getAll().map(i => i.amount).reduce((a, b) => a+b,0);

  itemsSubTotal$ =  this.selectAll().pipe(
    map(items => items.map(i => i.amount).reduce((a, b) => a+b,0))
  )

  installationSubTotal$ =  this.selectAll().pipe(
    map(items => items.map(i => i.installationRate).reduce((a, b) => a+b,0))
  )

  constructor(protected store: QuoteLineItemsStore) {
    super(store);
  }

}
