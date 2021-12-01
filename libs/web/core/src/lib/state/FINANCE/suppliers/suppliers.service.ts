import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from "rxjs/operators";
import { SuppliersStore } from './suppliers.store';
import { AddSupplierDto, SupplierDto } from "@fom/shared/api-dtos";
import { API_BASE_URL } from '../../../constants';
import { SuppliersQuery } from "./suppliers.query";
import { EMPTY } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SuppliersService {
  private apiBase: string;
  constructor(
    private suppliersStore: SuppliersStore,
    private query: SuppliersQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/suppliers`;
  }

  get() {
    const request = this.http.get<SupplierDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.suppliersStore.set(entities);
      })
    );

    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  add(payload: AddSupplierDto) {
    return this.http.post(this.apiBase, payload);
  }

  update(id, supplier: Partial<SupplierDto>) {
    this.suppliersStore.update(id, supplier);
  }

  remove(id: ID) {
    this.suppliersStore.remove(id);
  }

  setActive(id: string) {
    this.suppliersStore.setActive(id);
  }

  clearCache() {
    this.suppliersStore.setHasCache(false, { restartTTL: true });
  }

  getSupplierById(id: string) {
    return this.http.get<SupplierDto|boolean>(`${this.apiBase}/${id}`);
  }
}
