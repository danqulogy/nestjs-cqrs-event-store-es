import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { LeadInListDto } from '@fom/shared/api-dtos';

export interface LeadsState extends EntityState<LeadInListDto>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'leads', idKey: '_id' })
export class LeadsStore extends EntityStore<LeadsState> {
  constructor() {
    super();
  }
}
