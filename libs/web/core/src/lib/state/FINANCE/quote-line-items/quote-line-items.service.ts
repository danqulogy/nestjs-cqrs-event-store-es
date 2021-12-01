import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { QuoteLineItemsStore } from './quote-line-items.store';
import { QuoteLineItemDto } from "@fom/shared/api-dtos";

@Injectable({ providedIn: 'root' })
export class QuoteLineItemsService {

  constructor(private quoteLineItemsStore: QuoteLineItemsStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<QuoteLineItemDto[]>('https://api.com').pipe(tap(entities => {
      this.quoteLineItemsStore.set(entities);
    }));
  }

  add(quoteLineItem: QuoteLineItemDto) {
    this.quoteLineItemsStore.add(quoteLineItem);
  }

  update(id, quoteLineItem: Partial<QuoteLineItemDto>) {
    this.quoteLineItemsStore.update(id, quoteLineItem);
  }

  remove(id: ID) {
    this.quoteLineItemsStore.remove(id);
  }

  clear() {
    this.quoteLineItemsStore.set([]);
  }

  addMany(lineItems: QuoteLineItemDto[]) {
    this.quoteLineItemsStore.set(lineItems);
  }
}
