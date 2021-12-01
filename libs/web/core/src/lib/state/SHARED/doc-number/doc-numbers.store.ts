import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { DocNumberDto } from "@fom/shared/api-dtos";

export interface DocNumbersState extends EntityState<DocNumberDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'doc-numbers', idKey: '_id' })
export class DocNumbersStore extends EntityStore<DocNumbersState> {
  constructor() {
    super();
  }

}
