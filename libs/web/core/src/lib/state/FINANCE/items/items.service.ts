import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { ItemsStore } from './items.store';
import { AddProductDto, EditProductDto, ItemInListDto } from "@fom/shared/api-dtos";
import { API_BASE_URL } from '../../../constants';
import { EMPTY } from 'rxjs';
import { ItemsQuery } from './items.query';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private apiBase: string;
  constructor(
    private itemsStore: ItemsStore,
    private query: ItemsQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/items`;
  }

  get() {
    const request$ = this.http.get<ItemInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.itemsStore.set(entities);
      })
    );

    return this.query
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }

  add(payload: AddProductDto) {
    return this.http.post(this.apiBase, payload);
  }

  update(payload: EditProductDto) {
    return this.http.patch(`${this.apiBase}/${payload._id}`, payload)
  }

  remove(id: ID) {
    this.itemsStore.remove(id);
  }

  setActive(id: string) {
    this.itemsStore.setActive(id);
  }

  clearCache() {
    this.itemsStore.setHasCache(false, { restartTTL: true });
  }

  getItemById(id: string) {
    return this.http.get<ItemInListDto|boolean>(`${this.apiBase}/${id}`);
  }
}
