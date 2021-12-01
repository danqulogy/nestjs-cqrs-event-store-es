import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";

import { DocNumbersStore } from './doc-numbers.store';
import { API_BASE_URL } from "../../../constants";
import { CurrencyDto, DocNumberDto } from "@fom/shared/api-dtos";
import { EMPTY } from "rxjs";
import { DocNumbersQuery } from "./doc-numbers.query";

@Injectable({ providedIn: 'root' })
export class DocNumbersService {
  private apiBase: string;

  constructor(private docNumbersStore: DocNumbersStore,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private query: DocNumbersQuery,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/doc-numbers`;
  }


  get() {
    const request$ = this.http.get<DocNumberDto>(this.apiBase).pipe(
      tap((entity) => {
        this.docNumbersStore.set([entity]);
        this.docNumbersStore.setActive(entity._id)
      })
    );
    return this.query
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }


}
