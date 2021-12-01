import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { JournalsStore } from './journals.store';
import { API_BASE_URL } from '../../../constants';
import { AddJournalEntryDto, SetBeginningBalancesDto, TransactionsDto } from "@fom/shared/api-dtos";
import { EMPTY } from 'rxjs';
import { JournalsQuery } from './journals.query';

@Injectable({ providedIn: 'root' })
export class JournalsService {
  private apiBase: string;

  constructor(
    private journalsStore: JournalsStore,
    private query: JournalsQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/journals`;
  }

  get() {
    const request$ = this.http.get<TransactionsDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.journalsStore.set(entities);
      })
    );

    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }

  setBeginningBalances(payload: SetBeginningBalancesDto){
    return this.http.post(`${this.apiBase}/beginning-balances`, payload);
  }

  setActive(id: string) {
    this.journalsStore.setActive(id);
  }

  clearCache() {
    this.journalsStore.setHasCache(false, { restartTTL: true });
  }

  addEntry(payload: AddJournalEntryDto) {
    return this.http.post(this.apiBase, payload)
  }
}
