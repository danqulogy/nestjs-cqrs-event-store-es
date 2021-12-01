import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { AccountTypesStore } from './account-types.store';
import { API_BASE_URL } from '../../../constants';
import { AccountTypeDto } from '@fom/shared/api-dtos';
import { EMPTY } from 'rxjs';
import { AccountTypesQuery } from './account-types.query';

@Injectable({ providedIn: 'root' })
export class AccountTypesService {
  private apiBase: string;

  constructor(
    private accountTypesStore: AccountTypesStore,
    private http: HttpClient,
    private query: AccountTypesQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string
  ) {
    this.apiBase = `${this.serverBaseUrl}/account-types`;
  }

  get() {
    const request = this.http.get<AccountTypeDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.accountTypesStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  setActive(id: string) {
    this.accountTypesStore.setActive(id);
  }

  clearCache() {
    this.accountTypesStore.setHasCache(false, { restartTTL: true });
  }
}
