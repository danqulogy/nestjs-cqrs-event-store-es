import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { UnitsStore } from './units.store';
import { AddUnitDto, UnitsInListDto } from "@fom/shared/api-dtos";
import { API_BASE_URL } from '../../constants';
import { EMPTY } from 'rxjs';
import { UnitsQuery } from './units.query';

@Injectable({ providedIn: 'root' })
export class UnitsService {
  private apiBase: string;

  constructor(
    private unitsStore: UnitsStore,
    private query: UnitsQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/units`;
  }

  get() {
    const request = this.http.get<UnitsInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.unitsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  add(payload: AddUnitDto) {
    return this.http.post(this.apiBase, payload);
  }

  update(payload: Partial<UnitsInListDto>) {
    return this.http.patch(`${this.apiBase}/${payload._id}`, payload);
  }

  remove(id: ID) {
    return this.http.delete(`${this.apiBase}/${id}`)
  }

  setActive(id: string) {
    this.unitsStore.setActive(id);
  }

  clearCache() {
    this.unitsStore.setHasCache(false, { restartTTL: true });
  }
}
