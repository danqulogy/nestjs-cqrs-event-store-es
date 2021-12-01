import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";
import { ResignationsStore } from './resignations.store';
import { AddResignationDto, MembersInListDto } from "@fom/shared/api-dtos";
import { API_BASE_URL,  } from "../../../constants";
import { EMPTY } from "rxjs";
import { ResignationsQuery } from "./resignations.query";

@Injectable({ providedIn: 'root' })
export class ResignationsService {

  private readonly apiBase: string;

  constructor(
    private store: ResignationsStore,
    private query: ResignationsQuery,
    private http: HttpClient,
    @Inject(API_BASE_URL) private serverBaseUrl: string
  ) {
    this.apiBase = `${this.serverBaseUrl}/employees/resigned`;
  }

  getResignedEmployees() {
    const request = this.http.get<MembersInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.store.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  resignEmployee(payload: AddResignationDto) {
    return this.http.patch(`${this.serverBaseUrl}/employees/${payload.employeeId}/resign`, payload);
  }

  setActive(id: string) {
    this.store.setActive(id);
  }

  clearCache() {
    this.store.setHasCache(false, { restartTTL: true });
  }
}
