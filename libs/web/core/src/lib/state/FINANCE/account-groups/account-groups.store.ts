import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { AccountGroupDto } from '@fom/shared/api-dtos';

export interface AccountGroupsState extends EntityState<AccountGroupDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'account-groups' , idKey: '_id'})
export class AccountGroupsStore extends EntityStore<AccountGroupsState> {
  constructor() {
    super();
  }
}

