import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { ID } from '@datorama/akita';
import { switchMap, tap } from "rxjs/operators";
import { StockBalancesStore } from './stock-balances.store';
import { API_BASE_URL } from "../../../constants";
import { SalesTaxInListDto, StockBalanceDto } from "@fom/shared/api-dtos";
import { EMPTY } from "rxjs";
import { StockBalancesQuery } from "./stock-balances.query";

@Injectable({ providedIn: 'root' })
export class StockBalancesService {
  private apiBase: string;

  constructor(private stockBalancesStore: StockBalancesStore,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private query: StockBalancesQuery,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/stock-balances`;
  }

  get() {
    const request = this.http.get<StockBalanceDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.stockBalancesStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  setActive(id: string) {
    this.stockBalancesStore.setActive(id);
  }

  clearCache() {
    this.stockBalancesStore.setHasCache(false, { restartTTL: true });
  }



}
