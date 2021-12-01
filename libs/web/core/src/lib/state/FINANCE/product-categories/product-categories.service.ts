import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { ProductCategoriesStore } from './product-categories.store';
import { API_BASE_URL } from '../../../constants';
import { AddProductCategoryDto, ItemCategoryDto, RenameItemCategoryDto } from '@fom/shared/api-dtos';
import { EMPTY } from 'rxjs';
import { ProductCategoriesQuery } from './product-categories.query';

@Injectable({ providedIn: 'root' })
export class ProductCategoriesService {
  private apiBase: string;
  constructor(
    private itemCategoriesStore: ProductCategoriesStore,
    private query: ProductCategoriesQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/product-categories`;
  }

  get() {
    const request$ = this.http.get<ItemCategoryDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.itemCategoriesStore.set(entities);
      })
    );

    return this.query
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }

  createProductCategory(payload: AddProductCategoryDto) {
    return this.http.post(this.apiBase, payload);
  }

  update(payload: Partial<RenameItemCategoryDto>) {
    return this.http.patch(`${this.apiBase}/${payload.id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiBase}/${id}`);
  }

  setActive(id: string) {
    this.itemCategoriesStore.setActive(id);
  }

  clearCache() {
    this.itemCategoriesStore.setHasCache(false, { restartTTL: true });
  }
}
