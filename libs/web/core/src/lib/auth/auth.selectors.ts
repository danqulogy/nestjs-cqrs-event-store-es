import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store'
import { authReducerKey, AuthState } from './auth.reducer'
import { Injectable } from '@angular/core'


const getError = (state: AuthState) => state.error
const getIsLoading = (state: AuthState) => state.isLoading
const getAuthUser = (state: AuthState) => state.authUser
const getToken = (state: AuthState) => state.token

const feature = createFeatureSelector<AuthState>(authReducerKey)
const getAuthState = createSelector(feature, (state: AuthState) => state)


const error = createSelector(getAuthState, getError)

const loading = createSelector(getAuthState, getIsLoading)

const authUser = createSelector(getAuthState, getAuthUser)

const token = createSelector(getAuthState, getToken)

@Injectable({providedIn: 'root'})
export class AuthSelectors {
  error$ = this.store.pipe(select(error))
  loading$ = this.store.pipe(select(loading))
  authUser$ = this.store.pipe(select(authUser))
  token$ = this.store.pipe(select(token))

  constructor(private store: Store<AuthState>) {}
}
