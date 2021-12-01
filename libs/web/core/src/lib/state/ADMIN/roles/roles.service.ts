import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { RolesStore } from './roles.store';
import { RoleDto } from '@fom/shared/api-dtos';
import { API_BASE_URL } from '../../../constants';
import { EMPTY } from 'rxjs';
import { RolesQuery } from './roles.query';

@Injectable({ providedIn: 'root' })
export class RolesService {
  private apiBase: string;

  constructor(private rolesStore: RolesStore,
              private http: HttpClient,
              private query: RolesQuery,
              @Inject(API_BASE_URL) private serverBaseUrl:string) {
    this.apiBase = `${this.serverBaseUrl}/roles`
  }


  getActiveRoles() {
    const request = this.http.get<RoleDto[]>(`${this.apiBase}?status=active`)
      .pipe(tap(entities => {
      this.rolesStore.set(entities);
    }));
    return this.query.selectHasCache().pipe(
      switchMap(hasCache => hasCache? EMPTY: request)
    )
  }

  getArchives() {
    const request = this.http.get<RoleDto[]>(`${this.apiBase}?status=inactive`)
      .pipe(tap(entities => {
        this.rolesStore.update(state => ({
          ...state,
          archives: entities
        }));
      }));
    return this.query.selectHasCache().pipe(
      switchMap(hasCache => hasCache? EMPTY: request)
    )
  }

  add(role: RoleDto) {
    this.rolesStore.add(role);
  }

  update(id, role: Partial<RoleDto>) {
    this.rolesStore.update(id, role);
  }

  remove(id: ID) {
    this.rolesStore.remove(id);
  }


  clearCache(){
    this.rolesStore.setHasCache(false, {restartTTL: true})
  }
}
