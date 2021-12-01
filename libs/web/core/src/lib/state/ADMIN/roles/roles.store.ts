import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RoleDto } from '@fom/shared/api-dtos';

export interface RolesState extends EntityState<RoleDto>, ActiveState {
  archives: RoleDto[]
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'roles', idKey: '_id' })
export class RolesStore extends EntityStore<RolesState> {

  constructor() {
    super();
  }

}
