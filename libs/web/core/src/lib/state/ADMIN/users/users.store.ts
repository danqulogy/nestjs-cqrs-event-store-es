import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { UserInListDto } from '@fom/shared/api-dtos';

export interface UsersState extends EntityState<UserInListDto>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users', idKey: '_id'})
export class UsersStore extends EntityStore<UsersState> {

  constructor() {
    super();
  }

}
