import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core'
import { switchMap, tap } from 'rxjs/operators'
import { Company } from './company.model';
import { CompanyStore } from './company.store';
import { API_BASE_URL } from '../../../constants'
import { CompanyQuery } from './company.query'
import { EMPTY, Observable } from 'rxjs'


@Injectable({ providedIn: 'root' })
export class CompanyService {

  constructor(private companyStore: CompanyStore,
              private http: HttpClient,
              private query: CompanyQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string) {
  }


  getCompanyDetails(): Observable<Company> {
    const request = this.http.get<Company>(`${this.serverBaseUrl}/organization`).pipe(
      tap(company => {this.companyStore.update(company)})
    );
    return this.query.selectHasCache().pipe(
      switchMap(hasCache => hasCache? EMPTY : request)
    )
  }


  updateCompanyDetails(company: Partial<Company>) {
    console.log('payload', company)
    return this.http.put(`${this.serverBaseUrl}/organization`, company)
  }

  clearCache(){
    this.companyStore.setHasCache(false, {restartTTL: true})
  }

}
