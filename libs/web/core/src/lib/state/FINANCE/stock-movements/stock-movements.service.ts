import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";
import { StockMovementsStore } from './stock-movements.store';
import { API_BASE_URL } from "../../../constants";
import { StockMovementDto } from "@fom/shared/api-dtos";
import { EMPTY } from "rxjs";
import { StockMovementsQuery } from "./stock-movements.query";

@Injectable({ providedIn: 'root' })
export class StockMovementsService {
  private apiBase: string;

  constructor(private stockBalancesStore: StockMovementsStore,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private query: StockMovementsQuery,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/stock-movements`;
  }

  get() {
    const request = this.http.get<StockMovementDto[]>(this.apiBase).pipe(
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
