import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { MembersInListDto } from "@fom/shared/api-dtos";


export interface ResignationsState extends EntityState<MembersInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'resignations', idKey: '_id' })
export class ResignationsStore extends EntityStore<ResignationsState> {

  constructor() {
    super();
  }

}
