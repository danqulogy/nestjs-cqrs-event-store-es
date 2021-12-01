import { Action, createAction, props } from '@ngrx/store'
import {AppHttpError} from '../models';
import {IAuthCredentials} from '../state/ADMIN/users'
import {AuthResponse} from './AuthResponse'

export const LoginUser = createAction('[User] LOGIN', props<IAuthCredentials>())

export const LoginUserSuccess = createAction('[User] LOGIN_USER_SUCCESS', props<AuthResponse>())

export const LoginUserError = createAction('[User] LOGIN_USER_ERROR', props<{error: AppHttpError}>())

