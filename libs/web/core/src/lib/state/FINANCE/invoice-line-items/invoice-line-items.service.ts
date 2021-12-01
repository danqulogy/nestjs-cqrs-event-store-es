import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { ID } from '@datorama/akita';
import { switchMap, tap } from "rxjs/operators";
import { InvoiceLineItemsStore } from './invoice-line-items.store';
import { FixedAssetDto, InvoiceLineItemDto, QuoteLineItemDto } from "@fom/shared/api-dtos";
import { API_BASE_URL } from "../../../constants";
import { EMPTY } from "rxjs";
import { InvoiceLineItemsQuery } from "./invoice-line-items.query";

@Injectable({ providedIn: 'root' })
export class InvoiceLineItemsService {
  private apiBase: string;

  constructor(private invoiceLineItemsStore: InvoiceLineItemsStore,
              private query: InvoiceLineItemsQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/invoice-line-items`;
  }


  get() {
    const request$ = this.http.get<InvoiceLineItemDto[]>(this.apiBase).pipe(
      tap((entities) => {
        const mappedData =  entities.map(e => ({
          ...e,
          id: e._id
        }))
        this.invoiceLineItemsStore.set(mappedData);
      })
    );

    return this.query
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }

  add(quoteLineItem: InvoiceLineItemDto) {
    this.invoiceLineItemsStore.add(quoteLineItem);
  }

  update(id, quoteLineItem: Partial<InvoiceLineItemDto>) {
    this.invoiceLineItemsStore.update(id, quoteLineItem);
  }

  remove(id: ID) {
    this.invoiceLineItemsStore.remove(id);
  }

  clear() {
    this.invoiceLineItemsStore.set([]);
  }

  addMany(lineItems: InvoiceLineItemDto[]) {
    this.invoiceLineItemsStore.set(lineItems);
  }
}
