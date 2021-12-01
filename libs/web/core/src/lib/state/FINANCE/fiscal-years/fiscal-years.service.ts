import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { FiscalYearsStore } from './fiscal-years.store';
import { FiscalYearsQuery } from './fiscal-years.query';
import { API_BASE_URL } from '../../../constants';
import { EMPTY } from 'rxjs';
import { AddFiscalYearDto, FiscalYearDto } from "@fom/shared/api-dtos";

@Injectable({ providedIn: 'root' })
export class FiscalYearsService {
  private apiBase: string;

  constructor(private fiscalYearsStore: FiscalYearsStore,
              private fiscalYearsQuery: FiscalYearsQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/organization/fiscal-years`;
  }


  get() {
    const request$ = this.http.get<FiscalYearDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.fiscalYearsStore.set(entities);
        const active = entities.find(f => f.isActive)
        this.fiscalYearsStore.setActive(active._id)
      })
    );
    return this.fiscalYearsQuery
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }

  add(payload: AddFiscalYearDto){
    return this.http.post(this.apiBase, payload);
  }

  update(payload: FiscalYearDto) {
    return this.http.patch(`${this.apiBase}/${payload._id}`, payload)
  }

  clearCache() {
    this.fiscalYearsStore.setHasCache(false, { restartTTL: true });
  }


  setActive(id) {
    this.fiscalYearsStore.setActive(id)
  }


}
