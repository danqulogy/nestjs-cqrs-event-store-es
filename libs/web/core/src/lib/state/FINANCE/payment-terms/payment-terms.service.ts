import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { PaymentTermsStore } from './payment-terms.store';
import { PaymentTermDto } from '@fom/shared/api-dtos';
import { API_BASE_URL } from '../../../constants';
import { EMPTY } from 'rxjs';
import { PaymentTermsQuery } from './payment-terms.query';

@Injectable({ providedIn: 'root' })
export class PaymentTermsService {
  private apiBase: string;
  constructor(
    private paymentTermsStore: PaymentTermsStore,
    private query: PaymentTermsQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/payment-terms`;
  }

  get() {
    const request =  this.http.get<PaymentTermDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.paymentTermsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  add(paymentTerm: PaymentTermDto) {
    this.paymentTermsStore.add(paymentTerm);
  }

  update(id, paymentTerm: Partial<PaymentTermDto>) {
    this.paymentTermsStore.update(id, paymentTerm);
  }

  remove(id: ID) {
    this.paymentTermsStore.remove(id);
  }

  setActive(id: string) {
    this.paymentTermsStore.setActive(id);
  }

  clearCache() {
    this.paymentTermsStore.setHasCache(false, { restartTTL: true });
  }
}
