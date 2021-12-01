import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { FiscalYearDto } from '@fom/shared/api-dtos';

export interface FiscalYearsState extends EntityState<FiscalYearDto>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'fiscal-years', idKey: '_id' })
export class FiscalYearsStore extends EntityStore<FiscalYearsState> {

  constructor() {
    super();

  }

}
