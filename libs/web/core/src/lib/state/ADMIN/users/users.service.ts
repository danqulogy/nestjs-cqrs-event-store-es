import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {  tap } from 'rxjs/operators';
import { UsersStore } from './users.store';
import { API_BASE_URL } from '../../../constants';
import { UsersQuery } from './users.query';
import {
  ChangeAccessStatusDto,
  ChangeUserRoleDto,
  RegisterUserDto,
  UserInListDto,
} from '@fom/shared/api-dtos';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiBase: string;

  constructor(
    private usersStore: UsersStore,
    private http: HttpClient,
    private query: UsersQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string
  ) {
    this.apiBase = `${this.serverBaseUrl}/users`;
  }

  getAllUsers() {
    return this.http.get<UserInListDto[]>(`${this.apiBase}`).pipe(
      tap((entities) => {
        this.usersStore.set(entities);
      })
    );
  }

  register(payload: RegisterUserDto) {
    return this.http.post<void>(this.apiBase, payload);
  }

  changeAccessStatus(userId: string, accessStatusDto: ChangeAccessStatusDto) {
    return this.http.post<void>(`${this.apiBase}/${userId}/acl`, accessStatusDto);
  }

  changeUserRole(payload: ChangeUserRoleDto) {
    return this.http.patch<void>(`${this.apiBase}/${payload.userId}/role`, payload);
  }

  resendVerificationEmail(userId: string) {
    return this.http.post<void>(`${this.apiBase}/${userId}/resend-verification`, {});
  }

  deleteUser(userId: string) {
    return this.http.delete<void>(`${this.apiBase}/${userId}`);
  }

  clearCache() {
    this.usersStore.setHasCache(false, { restartTTL: true });
  }
}
