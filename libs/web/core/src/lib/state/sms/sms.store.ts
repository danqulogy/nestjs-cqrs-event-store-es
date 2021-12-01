import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SmsInListDto } from '@fom/shared/api-dtos';


export type SmsState = EntityState<SmsInListDto>

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sms', idKey: '_id' })
export class SmsStore extends EntityStore<SmsState> {

  constructor() {
    super();
  }

}
