import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { AppSettingsDto } from "@fom/shared/api-dtos";

export interface SettingsState extends EntityState<AppSettingsDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'settings', idKey: '_id' })
export class SettingsStore extends EntityStore<SettingsState> {

  constructor() {
    super();
  }

}
