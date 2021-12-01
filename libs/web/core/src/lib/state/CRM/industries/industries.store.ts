import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IndustryDto } from '@fom/shared/api-dtos';

export interface IndustriesState extends EntityState<IndustryDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'industries', idKey: '_id' })
export class IndustriesStore extends EntityStore<IndustriesState> {

  constructor() {
    super();
  }

}
