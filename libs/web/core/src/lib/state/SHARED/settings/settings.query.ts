import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SettingsStore, SettingsState } from './settings.store';
import { map } from 'rxjs/operators';
import { AppSettingsDto } from '@fom/shared/api-dtos';

@Injectable({ providedIn: 'root' })
export class SettingsQuery extends QueryEntity<SettingsState> {
  currentPeriod = this.selectAll().pipe(map((settings) => settings[0].currentPeriod));

  currentMonth$ = this.selectAll().pipe(
    map((settings) => {
      const currentDate = new Date(settings[0].currentDate);
      return currentDate.getMonth() + 1;
    })
  );

  currentYear$ = this.selectAll().pipe(
    map((settings) => {
      const currentDate = new Date(settings[0].currentDate);
      return currentDate.getFullYear();
    })
  );

  constructor(protected store: SettingsStore) {
    super(store);
  }
}
