import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { InvoiceLineItemDto } from "@fom/shared/api-dtos";

export interface InvoiceLineItemsState extends EntityState<InvoiceLineItemDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'invoice-line-food-items' })
export class InvoiceLineItemsStore extends EntityStore<InvoiceLineItemsState> {

  constructor() {
    super();
  }

}
