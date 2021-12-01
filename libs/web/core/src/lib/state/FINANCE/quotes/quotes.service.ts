import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";
import { QuotesStore } from './quotes.store';
import { API_BASE_URL } from "../../../constants";
import { CreateQuoteDot, QuoteDto, UpdateQuoteDot } from "@fom/shared/api-dtos";
import { EMPTY } from "rxjs";
import { QuotesQuery } from "./quotes.query";

@Injectable({ providedIn: 'root' })
export class QuotesService {
  private readonly apiBase: string;

  constructor(private quotesStore: QuotesStore,
              private query: QuotesQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/quotes`;
  }


  get() {
    const request$ = this.http.get<QuoteDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.quotesStore.set(entities);
      })
    );
    return this.query
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }

  add(quote: CreateQuoteDot) {
    return this.http.post(this.apiBase, quote);
  }

  clearCache() {
    this.quotesStore.setHasCache(false, { restartTTL: true });
  }

  setActive(id) {
    this.quotesStore.setActive(id)
  }

  getQuoteById(id: string) {
    return this.http.get<QuoteDto|boolean>(`${this.apiBase}/${id}`);
  }

  update(payload: UpdateQuoteDot) {
    return this.http.patch(`${this.apiBase}/${payload._id}`, payload)
  }

  deleteQuote(id: string){
    return this.http.delete(`${this.apiBase}/${id}`)
  }
}
