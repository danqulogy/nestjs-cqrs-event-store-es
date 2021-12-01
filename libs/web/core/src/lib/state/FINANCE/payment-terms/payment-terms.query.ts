import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PaymentTermsStore, PaymentTermsState } from './payment-terms.store';
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class PaymentTermsQuery extends QueryEntity<PaymentTermsState> {

  default$ =  this.selectAll().pipe(
    map(data => data.find(p => p.default))
  )

  constructor(protected store: PaymentTermsStore) {
    super(store);
  }

}
