import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SmsStore, SmsState } from './sms.store';

@Injectable({ providedIn: 'root' })
export class SmsQuery extends QueryEntity<SmsState> {

  constructor(protected store: SmsStore) {
    super(store);
  }

}
