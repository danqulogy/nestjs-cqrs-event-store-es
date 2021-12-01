import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { PurchasesTaxesStore } from './purchases-taxes.store';
import { CreatePurchaseTaxDto, CreateSalesTaxDto, PurchaseTaxInListDto, SalesTaxInListDto } from "@fom/shared/api-dtos";
import { API_BASE_URL } from '../../../constants';
import { EMPTY } from 'rxjs';
import { PurchasesTaxesQuery } from './purchases-taxes.query';

@Injectable({ providedIn: 'root' })
export class PurchasesTaxesService {
  private apiBase: string;
  constructor(
    private store: PurchasesTaxesStore,
    private query: PurchasesTaxesQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/purchase-taxes`;
  }

  get() {
    const request = this.http.get<PurchaseTaxInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.store.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  add(payload: CreatePurchaseTaxDto) {
    return this.http.post(this.apiBase, payload);
  }

  update(id, purchaseTax: Partial<PurchaseTaxInListDto>) {
    this.store.update(id, purchaseTax);
  }

  remove(id: ID) {
    this.store.remove(id);
  }

  setActive(id: string) {
    this.store.setActive(id);
  }

  clearCache() {
    this.store.setHasCache(false, { restartTTL: true });
  }
}
