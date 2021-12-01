import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { API_BASE_URL } from '../../../constants';
import { AddAccountLedgerDto, LedgerInListDto, UpdateAccountLedgerDto } from '@fom/shared/api-dtos';
import { LedgersStore } from './ledgers.store';
import { EMPTY, Observable } from "rxjs";
import { LedgersQuery } from './ledgers.query';

@Injectable({ providedIn: 'root' })
export class LedgerService {
  private apiBase: string;
  constructor(
    private ledgersStore: LedgersStore,
    private ledgersQuery: LedgersQuery,
    private http: HttpClient,
    @Inject(API_BASE_URL) private serverBaseUrl: string
  ) {
    this.apiBase = `${this.serverBaseUrl}/charts-of-accounts`;
  }

  getLedgers() {
    const request = this.http.get<LedgerInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.ledgersStore.set(entities);
      })
    );
    return this.ledgersQuery
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  add(account: AddAccountLedgerDto) {
    return this.http.post(this.apiBase, account);
  }

  update(payload: UpdateAccountLedgerDto) {
    return this.http.patch(`${this.apiBase}/${payload.id}`, payload);
  }

  restore(id: string) {
    return this.http.patch(`${this.apiBase}/${id}/restore-archive`, {});
  }

  delete(id: string) {
    return this.http.delete(`${this.apiBase}/${id}`, {});
  }
  remove(id: ID) {
    this.ledgersStore.remove(id);
  }

  setActive(id: string) {
    this.ledgersStore.setActive(id);
  }

  clearCache() {
    this.ledgersStore.setHasCache(false, { restartTTL: true });
  }

  getLedgerById(id: string): Observable<LedgerInListDto|boolean> {
    return this.http.get<LedgerInListDto|boolean>(`${this.apiBase}/${id}`);
  }
}
