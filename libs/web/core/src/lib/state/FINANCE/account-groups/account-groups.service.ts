import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { AccountGroupsStore } from './account-groups.store';
import { API_BASE_URL } from '../../../constants';
import { AccountGroupDto, AddAccountGroupDto } from '@fom/shared/api-dtos';
import { EMPTY } from 'rxjs';
import { AccountGroupsQuery } from './account-groups.query';

@Injectable({ providedIn: 'root' })
export class AccountGroupsService {
  private apiBase: string;

  constructor(private accountGroupsStore: AccountGroupsStore,
              private http: HttpClient,
              private query: AccountGroupsQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string
              ) {
    this.apiBase = `${this.serverBaseUrl}/account-groups`;
  }


  get() {
    const request = this.http.get<AccountGroupDto[]>(this.apiBase).pipe(tap(entities => {
      this.accountGroupsStore.set(entities);
    }));
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  add(accountGroup: AddAccountGroupDto) {
    return this.http.post(this.apiBase, accountGroup);
  }

  update(id, accountGroup: Partial<AccountGroupDto>) {
    this.accountGroupsStore.update(id, accountGroup);
  }

  remove(id: ID) {
    this.accountGroupsStore.remove(id);
  }


  setActive(id: string) {
    this.accountGroupsStore.setActive(id);
  }

  clearCache() {
    this.accountGroupsStore.setHasCache(false, { restartTTL: true });
  }

}
