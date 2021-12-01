import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RequisitionInListDto } from '@fom/shared/api-dtos';


export interface RequisitionsState extends EntityState<RequisitionInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'requisitions', idKey: '_id' })
export class RequisitionsStore extends EntityStore<RequisitionsState> {

  constructor() {
    super();
  }

}
