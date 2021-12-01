import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { ID } from '@datorama/akita';
import { switchMap, tap } from "rxjs/operators";

import { RequisitionsStore } from './requisitions.store';
import {
  AddRequisitionDto,
  LedgerInListDto,
  RequisitionInListDto,
  UpdateRequisitionDto,
  UpdateRequisitionStatusDto
} from "@fom/shared/api-dtos";
import { API_BASE_URL } from "../../../constants";
import { EMPTY } from "rxjs";
import { RequisitionsQuery } from "./requisitions.query";

@Injectable({ providedIn: 'root' })
export class RequisitionsService {
  private apiBase: string;

  constructor(private requisitionsStore: RequisitionsStore,
              private query: RequisitionsQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/project-requisitions`;
  }


  get() {
    const request = this.http.get<RequisitionInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.requisitionsStore.set(entities);
      })
    );
    return this.query
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }


  createRequisition(payload: AddRequisitionDto) {
    return this.http.post(this.apiBase, payload);
  }

  setActive(id: string) {
    this.requisitionsStore.setActive(id);
  }

  clearCache() {
    this.requisitionsStore.setHasCache(false, { restartTTL: true });
  }

  getRequisitionById(id: string) {
    return this.http.get<RequisitionInListDto>(`${this.apiBase}/${id}`).pipe(
      tap((entity) => {
        this.requisitionsStore.add([entity])
      })
    )
  }

  updateRequisition(payload: UpdateRequisitionDto) {
    return this.http.patch(`${this.apiBase}/${payload.requisitionId}`, payload);
  }

  updateStatus(data: UpdateRequisitionStatusDto) {
    return this.http.patch(`${this.apiBase}/${data.requisitionId}/status`, data)
  }

  delete(id: string) {
    return this.http.delete(`${this.apiBase}/${id}`);
  }
}
