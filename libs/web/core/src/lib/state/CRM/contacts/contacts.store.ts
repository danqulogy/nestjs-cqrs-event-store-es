import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ContactInListDto } from "@fom/shared/api-dtos";


export interface ContactsState extends EntityState<ContactInListDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'contacts', idKey: '_id' })
export class ContactsStore extends EntityStore<ContactsState> {

  constructor() {
    super();
  }

}
