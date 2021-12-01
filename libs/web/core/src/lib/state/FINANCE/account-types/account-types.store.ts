import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { AccountTypeDto } from "@fom/shared/api-dtos";


export interface AccountTypesState extends EntityState<AccountTypeDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'account-types', idKey: '_id' })
export class AccountTypesStore extends EntityStore<AccountTypesState> {

  constructor() {
    super();
  }

}
