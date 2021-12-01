import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { ID } from '@datorama/akita';
import { switchMap, tap } from "rxjs/operators";
import { FixedAssetsStore } from './fixed-assets.store';
import { AddFixedAssetDto, AddProductDto, FixedAssetDto, ItemInListDto } from "@fom/shared/api-dtos";
import { ItemsQuery } from "../items";
import { API_BASE_URL } from "../../../constants";
import { FixedAssetsQuery } from "./fixed-assets.query";
import { EMPTY } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FixedAssetsService {
  private apiBase: string;

  constructor(private fixedAssetsStore: FixedAssetsStore,
              private query: FixedAssetsQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/fixed-assets`;
  }

  get() {
    const request$ = this.http.get<FixedAssetDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.fixedAssetsStore.set(entities);
      })
    );

    return this.query
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }

  add(payload: AddFixedAssetDto) {
    return this.http.post(this.apiBase, payload);
  }

  setActive(id: string) {
    this.fixedAssetsStore.setActive(id);
  }

  clearCache() {
    this.fixedAssetsStore.setHasCache(false, { restartTTL: true });
  }


}
