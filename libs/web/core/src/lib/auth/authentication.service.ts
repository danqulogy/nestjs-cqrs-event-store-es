import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'ngx-auth';
import { NgxRolesService } from 'ngx-permissions';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthResponse } from './AuthResponse';
import { API_BASE_URL } from '../constants';
import { IAuthCredentials } from '../state/ADMIN/users';
import { SocketsService } from '../services/sockets.service';
import { AuthStoreKeys } from './authStoreKeys';
import { UserInListDto } from "@fom/shared/api-dtos";

export interface AccessData {
  accessToken: string
  refreshToken: string
}


@Injectable({
  providedIn:  'root'
})
export class AuthenticationService implements AuthService {
  serviceApi = `${this.serverBaseUrl}/auth/login`
  accessTokenSubject = new BehaviorSubject<string>(null)

  authUserSubject = new BehaviorSubject<UserInListDto>(null)

  private userSubject = new BehaviorSubject<UserInListDto>(
    <UserInListDto>JSON.parse(localStorage.getItem(AuthStoreKeys.USER)),
  )

  user$ = this.userSubject.asObservable()
  user = this.userSubject.getValue()
  private interruptedUrl: string

  constructor(
    private http: HttpClient,
    private router: Router,
    private injector: Injector,
    // private usersService: UsersService,
    private notification: NzNotificationService,
    private rolesService: NgxRolesService,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private sockets: SocketsService,

  ) {
    const user = <UserInListDto>JSON.parse(localStorage.getItem(AuthStoreKeys.USER))
    // if (user && rolesService.getRole(user.role.name) !== null) {
      console.log('fetched user form catch', user)
      // this.rolesService.addRole(user.role, () => this.isAuthorized())
    // }
  }

  public isAuthorized(): Observable<boolean> {
    return this.getAccessToken().pipe(
      map(token => {
        return !!token
      }),
    )
  }



  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * returns {Observable<AccessData>}
   */
  public refreshToken(): Observable<AccessData> {
    // return this.getRefreshToken().pipe(
    //   switchMap((refreshToken: string) =>
    //     this.http.post(`http://localhost:3000/refresh`, { refreshToken }),
    //   ),
    //   tap((tokens: AccessData) => this.saveAccessData(tokens)),
    //   catchError(err => {
    //     this.logout()
    //     return of(err)
    //     // return Observable.throw(err)
    //   }),
    // )
   return of(null)
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * param {Response} response
   * returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * param {string} url
   * returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh')
  }

  isRoleAccessAllowed(role: string) {
    // return this.allowedRoleAccess.includes(role)
  }




  public login(credentials: IAuthCredentials): Observable<AuthResponse | any> {
    this.clear()
    return this.http.post<AuthResponse>(this.serviceApi, credentials).pipe(
      map(data => {
          this.saveAuthUserInfo(data.user)
          this.saveAccessData({
            accessToken: data.accessToken,
            refreshToken: null,
          })

        window.location.reload()
          // this.rolesService.addRole(data.user.role, () => this.isAuthorized())

          // if(this.getInterruptedUrl()){
          //   this.router.navigateByUrl(this.getInterruptedUrl())
          // }else{
          //   // this.sockets.init()
            this.router.navigateByUrl('/dashboard')
          // }


          return data

      })
    )
  }

  public requestPasswordReset(email: string): Observable<UserInListDto> {
    return this.http.post<UserInListDto>(`${this.serverBaseUrl}/auth/password-reset/request`,
      { email })
  }

  public resetPassword(token: string, password: string) {
    return this.http.post(`${this.serverBaseUrl}/auth/password-reset`, {
       token, password
    })
  }

  // public changeIdentity(){
  //   return this.http.post(`${this.baseUrl}/authManagement`, {
  //     action: 'identityChange',
  //     value: { token, password },
  //   })
  // }

  public updateAccountInfo(data: Partial<UserInListDto>): Observable<UserInListDto> {
    return this.http.patch<UserInListDto>(`${this.serverBaseUrl}/users/${data._id}`, {
      displayName: data.name,
    })
  }

  public changePassword(data: { id; newPassword }): Observable<UserInListDto> {
    return this.http.patch<UserInListDto>(`${this.serverBaseUrl}/users/${data.id}`, {
      password: data.newPassword,
    })
  }

  public changeAccessStatus(data: { id: string; accessStatus: any }): Observable<UserInListDto> {
    return this.http.patch<UserInListDto>(`${this.serverBaseUrl}/users/${data.id}`, {
      accessStatus: data.accessStatus,
    })
  }
  public changeUserRole(data: { id; role }): Observable<UserInListDto> {
    return this.http.patch<UserInListDto>(`${this.serverBaseUrl}/users/${data.id}`, {
      role: data.role,
    })
  }
  public logout(): void {
    this.rolesService.flushRoles()
    this.clear()
    this.router.navigateByUrl('/passport/login')
    this.clearDataStores()
  }

  private clearDataStores() {
    // this.usersService.clearCache()
  }

  private saveAccessData({ accessToken, refreshToken }: AccessData) {
    this.setAccessToken(accessToken).setRefreshToken(refreshToken)
  }

  private saveAuthUserInfo(user: UserInListDto) {
    this.setAuthUser(user)
  }

  private checkAuthorization(user: UserInListDto) {
    if (!user.isVerified) {
      this.notification.warning('Unverified email', 'Check your mailbox for verification')
      return
    }
  }


  public getAccessToken(): Observable<string> {
    return this.getAccessTokenFromLocalStorage()
  }

  private getAccessTokenFromLocalStorage(): Observable<string> {
    const token: string = <string>localStorage.getItem(AuthStoreKeys.ACCESS_TOKEN)
    return of(token)
  }

  public getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem(AuthStoreKeys.REFRESH_TOKEN)
    return of(token)
  }

  public setAccessToken(token: string): AuthenticationService {
    this.accessTokenSubject.next(token)
    localStorage.setItem(AuthStoreKeys.ACCESS_TOKEN, token)
    return this
  }

  public setRefreshToken(token: string): AuthenticationService {
    localStorage.setItem(AuthStoreKeys.REFRESH_TOKEN, token)
    return this
  }

  public  selectUser(): Observable<UserInListDto> {
    return this.getAuthUserFromLocalStorage()
    // return environment.production
    //   ? this.authUserSubject.asObservable()
    //   : this.getAuthUserFromLocalStorage()
  }

  getUser(): UserInListDto{
    return <UserInListDto>JSON.parse(localStorage.getItem(AuthStoreKeys.USER))
  }

  private getAuthUserFromLocalStorage() {
    const user: UserInListDto = <UserInListDto>JSON.parse(localStorage.getItem(AuthStoreKeys.USER))
    return of(user)
  }

  public setAuthUser(user: UserInListDto): AuthenticationService {
    this.authUserSubject.next(user)
    localStorage.setItem(AuthStoreKeys.USER, JSON.stringify(user))
    return this
  }


  public clear() {
    const interruptedUrl = localStorage.getItem(AuthStoreKeys.INTERRUPTED_URL)
    localStorage.removeItem(AuthStoreKeys.ACCESS_TOKEN)
    localStorage.removeItem(AuthStoreKeys.REFRESH_TOKEN)
    localStorage.removeItem(AuthStoreKeys.USER)
    localStorage.clear()
    localStorage.setItem(AuthStoreKeys.INTERRUPTED_URL, interruptedUrl)
  }

  public getInterruptedUrl(): string{
    return this.interruptedUrl || localStorage.getItem(AuthStoreKeys.INTERRUPTED_URL)
  }

  public setInterruptedUrl(value: string): void{
    if(!value.includes('passport') && !value.includes('exception')){
      this.interruptedUrl = value
      localStorage.setItem(AuthStoreKeys.INTERRUPTED_URL, value)
    }
  }


}
