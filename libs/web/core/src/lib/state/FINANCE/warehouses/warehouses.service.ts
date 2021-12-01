import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { WarehousesStore } from './warehouses.store';
import { WarehouseInListDto } from '@fom/shared/api-dtos';
import { API_BASE_URL } from '../../../constants';
import { EMPTY } from 'rxjs';
import { WarehousesQuery } from './warehouses.query';

@Injectable({ providedIn: 'root' })
export class WarehousesService {
  private apiBase: string;

  constructor(
    private warehousesStore: WarehousesStore,
    private query: WarehousesQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/warehouses`;
  }

  get() {
    const request = this.http.get<WarehouseInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.warehousesStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  add(warehouse: WarehouseInListDto) {
    this.warehousesStore.add(warehouse);
  }

  update(id, warehouse: Partial<WarehouseInListDto>) {
    this.warehousesStore.update(id, warehouse);
  }

  remove(id: ID) {
    this.warehousesStore.remove(id);
  }


  setActive(id: string) {
    this.warehousesStore.setActive(id);
  }

  clearCache() {
    this.warehousesStore.setHasCache(false, { restartTTL: true });
  }
}
