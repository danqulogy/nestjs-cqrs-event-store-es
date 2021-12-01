import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";
import { API_BASE_URL } from '../../../constants';
import { SettingsStore } from './settings.store';
import { SettingsQuery } from "./settings.query";
import { AppSettingsDto, UpdateAccountingSettingsDto } from "@fom/shared/api-dtos";
import { EMPTY } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private apiBase: string;

  constructor(private settingsStore: SettingsStore,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private query: SettingsQuery,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/settings`;
  }


  get() {
    const request$ = this.http.get<AppSettingsDto>(this.apiBase).pipe(
      tap((entity) => {
        this.settingsStore.set([entity]);
        this.settingsStore.setActive(entity._id)
      })
    );
    return this.query
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }



  clearCache(){
    this.settingsStore.setHasCache(false, {restartTTL: true})
  }

  updateAccountingSettings(payload: UpdateAccountingSettingsDto) {
    return this.http.patch(`${this.apiBase}/accounting`, payload)
  }
}
