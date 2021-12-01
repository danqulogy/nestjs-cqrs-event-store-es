import { Injectable } from '@angular/core'
import { Actions, createEffect,  ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { EMPTY, of } from 'rxjs'

import { AuthenticationService } from './authentication.service'
import { AuthResponse } from './AuthResponse'
import * as authActions from './auth.actions'
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class AuthEffects {

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
    ofType(authActions.LoginUser),
    exhaustMap(action =>
      this.authService.login(action).pipe(
        map((res: AuthResponse) => authActions.LoginUserSuccess(res)),
        catchError(err => {
          this.notificationService.error('Authentication failed', err.error.errorMessage)
          return of(authActions.LoginUserError(err))
        })
      ))
  ))

  // @Effect()
  // updateAuthUserProfile: Observable<Action> = this.actions$.pipe(
  //   ofType(AuthUserActionTypes.UPDATE_AUTH_USER),
  //   switchMap((action: UpdateAuthUser) =>
  //     toAction(
  //       this.authService.updateAccountInfo(action.payload),
  //       fromAuthStore.UpdateAuthUserSuccess,
  //       fromAuthStore.UpdateAuthUserError,
  //     ),
  //   ),
  // )

  constructor(private actions$: Actions,
              private notificationService: NzNotificationService,
              private authService: AuthenticationService) {}
}
