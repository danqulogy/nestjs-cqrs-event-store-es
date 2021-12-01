import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { SalesTaxesStore } from './sales-taxes.store';
import { CreateSalesTaxDto, SalesTaxInListDto } from '@fom/shared/api-dtos';
import { API_BASE_URL } from '../../../constants';
import { EMPTY } from 'rxjs';
import { SalesTaxesQuery } from './sales-taxes.query';

@Injectable({ providedIn: 'root' })
export class SalesTaxesService {
  private apiBase: string;
  constructor(
    private salesTaxesStore: SalesTaxesStore,
    private query: SalesTaxesQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/sales-taxes`;
  }

  get() {
    const request = this.http.get<SalesTaxInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.salesTaxesStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  add(payload: CreateSalesTaxDto) {
    return this.http.post(this.apiBase, payload);
  }

  update(id, salesTax: Partial<SalesTaxInListDto>) {
    this.salesTaxesStore.update(id, salesTax);
  }

  remove(id: ID) {
    this.salesTaxesStore.remove(id);
  }

  setActive(id: string) {
    this.salesTaxesStore.setActive(id);
  }

  clearCache() {
    this.salesTaxesStore.setHasCache(false, { restartTTL: true });
  }
}
