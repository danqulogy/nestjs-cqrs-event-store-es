import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { IndustriesStore } from './industries.store';
import { API_BASE_URL } from '../../../constants';
import { IndustriesQuery } from './industries.query';
import { EMPTY } from 'rxjs';
import { CreateIndustryDto, IndustryDto } from '@fom/shared/api-dtos';

@Injectable({ providedIn: 'root' })
export class IndustriesService {
  private apiBase: string;

  constructor(private industriesStore: IndustriesStore,
              private query: IndustriesQuery,
              @Inject(API_BASE_URL) private serverBaseUrl:string,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/industries`
  }


  get() {
    const request =  this.http.get<IndustryDto[]>(`${this.serverBaseUrl}/industries`).pipe(tap(entities => {
      this.industriesStore.set(entities);
    }));
    return this.query.selectHasCache().pipe(
      switchMap(hasCache => hasCache? EMPTY: request)
    )
  }

  add(ethnicity: CreateIndustryDto) {
    return this.http.post(`${this.serverBaseUrl}/ethnicities`, ethnicity)
  }

  update(id, ethnicity: Partial<IndustryDto>) {
    this.industriesStore.update(id, ethnicity);
  }

  remove(id: ID) {
    this.industriesStore.remove(id);
  }

  clearCache(){
    this.industriesStore.setHasCache(false, {restartTTL: true})
  }

}
