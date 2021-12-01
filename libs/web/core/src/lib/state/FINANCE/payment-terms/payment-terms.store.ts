import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PaymentTermDto } from '@fom/shared/api-dtos';

export interface PaymentTermsState extends EntityState<PaymentTermDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'payment-terms', idKey: '_id' })
export class PaymentTermsStore extends EntityStore<PaymentTermsState> {

  constructor() {
    super();
  }

}
