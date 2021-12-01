import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { CurrenciesStore } from "./currencies.store";
import { CurrenciesQuery } from "./currencies.query";
import { API_BASE_URL } from '../../../constants';
import { CreateExchangeRateDto, CurrencyDto, UpdateCurrencyDto, UpdateExchangeRateDto } from "@fom/shared/api-dtos";

@Injectable({ providedIn: 'root' })
export class CurrenciesService {

  private apiBase: string;

  constructor(private currenciesStore: CurrenciesStore,
              private currenciesQuery: CurrenciesQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/currencies`;
  }


  get() {
    const request$ = this.http.get<CurrencyDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.currenciesStore.set(entities);
        this.currenciesStore.setActive(entities.length?entities[0]._id: null)
      })
    );
    return this.currenciesQuery
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }

  add(payload: CurrencyDto){
    return this.http.post(this.apiBase, payload);
  }

  update(payload: UpdateCurrencyDto) {
    return this.http.patch(`${this.apiBase}/${payload._id}`, payload)
  }

  clearCache() {
    this.currenciesStore.setHasCache(false, { restartTTL: true });
  }


  setActive(id) {
    this.currenciesStore.setActive(id)
  }

  createExchangeRate(payload: CreateExchangeRateDto) {
    return this.http.post(`${this.apiBase}/${payload.currencyId}/exchange-rates`, payload)
  }

  updateExchangeRate(payload: UpdateExchangeRateDto) {
    return this.http.patch(`${this.apiBase}/${payload.currencyId}/exchange-rates/${payload.exchangeRateId}`, payload);
  }
}
