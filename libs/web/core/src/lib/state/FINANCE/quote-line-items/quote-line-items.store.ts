import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { QuoteLineItemDto } from "@fom/shared/api-dtos";

export interface QuoteLineItemsState extends EntityState<QuoteLineItemDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'quote-line-food-items' })
export class QuoteLineItemsStore extends EntityStore<QuoteLineItemsState> {

  constructor() {
    super();
  }

}
