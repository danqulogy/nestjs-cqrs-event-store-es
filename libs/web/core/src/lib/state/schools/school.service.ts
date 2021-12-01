import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { SchoolStore } from './school.store';
import { EnrollSchoolDto, SchoolsInListDto } from '@fom/shared/api-dtos';
import { API_BASE_URL } from '../../constants';
import { EMPTY } from 'rxjs';
import { SchoolQuery } from './school.query';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  private apiBase: string;
  constructor(private schoolStore: SchoolStore,
              private query: SchoolQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/schools`;
  }


  getAllSchools() {
    const request = this.http.get<SchoolsInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.schoolStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  setActive(id: string) {
    this.schoolStore.setActive(id);
  }

  clearCache() {
    this.schoolStore.setHasCache(false, { restartTTL: true });
  }


  delete(_id: string) {
    return this.http.delete<void>(`${this.apiBase}/${_id}`);
  }

  dispatchEnrollmentNotification() {
    return this.http.post(`${this.apiBase}/enrollment-notice`, null)
  }

  getSchoolByEnrollmentKey(enrollmentKey: any) {
    return this.http.get<SchoolsInListDto>(`${this.apiBase}/keys/${enrollmentKey}`)
  }

  enroll(payload: EnrollSchoolDto) {
    return this.http.post(`${this.apiBase}/enroll`, payload)
  }
}
