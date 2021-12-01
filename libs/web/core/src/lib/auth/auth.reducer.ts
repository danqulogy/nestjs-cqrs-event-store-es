import { Action, createReducer, on } from '@ngrx/store'
import * as authActions from './auth.actions'
import { AppHttpError } from '../models'
import { UserInListDto } from "@fom/shared/api-dtos";

export interface AuthState {
  authUser: UserInListDto
  selectedUser: UserInListDto
  isLoading: boolean
  error: AppHttpError
  token: string
  users: UserInListDto[]
}

const initialState: AuthState = {
  error: null,
  isLoading: false,
  authUser: null,
  selectedUser: null,
  token: null,
  users: [],
}

const AuthReducer = createReducer(
  initialState,
  on(authActions.LoginUserSuccess, (state, action) => ({
    ...state, token: action.accessToken, authUser: action.user
  })),

  on(authActions.LoginUserError, (state, action) => ({
    ...state,  error: action.error
  }))
);

export function authReducer(state: AuthState|undefined, action: Action) {
  return AuthReducer(state, action)
}

export const getAuth = (state:AuthState) => state;

export const authReducerKey = 'auth';
