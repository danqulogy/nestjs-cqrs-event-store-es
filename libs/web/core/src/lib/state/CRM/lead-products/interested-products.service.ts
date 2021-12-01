import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";
import { LeadProductsStore } from './lead-products.store';
import { EMPTY } from "rxjs";
import { InterestedProductsQuery } from "./interested-products-query.service";
import { API_BASE_URL } from '../../../constants';
import { AddLeadProductDto, LeadProductDto } from "@fom/shared/api-dtos";

@Injectable({ providedIn: 'root' })
export class InterestedProductsService {

  private apiBase: string;

  constructor(private store: LeadProductsStore,
              private query: InterestedProductsQuery,
              @Inject(API_BASE_URL) private serverBaseUrl:string,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/interested-products`
  }


  get() {
    const request =  this.http.get<LeadProductDto[]>(this.apiBase).pipe(tap(entities => {
      this.store.set(entities);
    }));
    return this.query.selectHasCache().pipe(
      switchMap(hasCache => hasCache? EMPTY: request)
    )
  }

  clearCache() {
    this.store.setHasCache(false, { restartTTL: true });
  }

  setActive(id: string) {
    this.store.setActive(id);
  }


  addProduct(payload: AddLeadProductDto) {
    return this.http.post(this.apiBase, payload);
  }

  removedProduct(id: string) {
    return this.http.delete(`${this.apiBase}/${id}`)
  }
}
