import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { QuoteDto } from "@fom/shared/api-dtos";


export interface QuotesState extends EntityState<QuoteDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'quotes', idKey: '_id' })
export class QuotesStore extends EntityStore<QuotesState> {

  constructor() {
    super();
  }

}
