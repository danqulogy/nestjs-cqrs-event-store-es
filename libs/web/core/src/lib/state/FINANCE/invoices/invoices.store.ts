import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { InvoiceDto } from "@fom/shared/api-dtos";

export interface InvoicesState extends EntityState<InvoiceDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'invoices', idKey:'_id' })
export class InvoicesStore extends EntityStore<InvoicesState> {

  constructor() {
    super();
  }

}
