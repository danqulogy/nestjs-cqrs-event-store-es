import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { FixedAssetDto } from "@fom/shared/api-dtos";

export interface FixedAssetsState extends EntityState<FixedAssetDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'fixed-assets', idKey: '_id' })
export class FixedAssetsStore extends EntityStore<FixedAssetsState> {

  constructor() {
    super();
  }

}
