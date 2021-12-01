import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";
import { InvoicesStore } from './invoices.store';
import { API_BASE_URL } from "../../../constants";
import {
  CreateInvoiceDto,
  CreateQuoteDot,
  InvoiceDto,
  QuoteDto, RecordInvoicePaymentDto,
  UpdateInvoiceDto,
  UpdateQuoteDot
} from "@fom/shared/api-dtos";
import { EMPTY } from "rxjs";
import { InvoicesQuery } from "./invoices.query";

@Injectable({ providedIn: 'root' })
export class InvoicesService {

  private readonly apiBase: string;

  constructor(private store: InvoicesStore,
              private query: InvoicesQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/invoices`;
  }


  get() {
    const request$ = this.http.get<InvoiceDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.store.set(entities);
      })
    );
    return this.query
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }

  add(invoice: CreateInvoiceDto) {
    return this.http.post(this.apiBase, invoice);
  }

  clearCache() {
    this.store.setHasCache(false, { restartTTL: true });
  }

  setActive(id) {
    this.store.setActive(id)
  }

  getInvoiceById(id: string) {
    return this.http.get<InvoiceDto|boolean>(`${this.apiBase}/${id}`);
  }

  update(payload: UpdateInvoiceDto) {
    return this.http.patch(`${this.apiBase}/${payload._id}`, payload)
  }

  deleteInvoice(id: string){
    return this.http.delete(`${this.apiBase}/${id}`)
  }

  recordPayment(payload: RecordInvoicePaymentDto) {
    return this.http.post(`${this.apiBase}/payments`, payload);
  }
}
