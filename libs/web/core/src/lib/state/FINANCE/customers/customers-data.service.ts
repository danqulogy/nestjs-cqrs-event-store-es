import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { ID } from '@datorama/akita';
import { switchMap, tap } from "rxjs/operators";
import { CustomersStore } from './customers.store';
import {
  AddContactNoteDto,
  AddCustomerDto,
  AddCustomerNoteDto, ChangeContactOwnerDto, ChangeCustomerOwnerDto,
  ContactInListDto,
  CustomersDto, EditContactNoteDto, EditCustomerDto, EditCustomerNoteDto,
  FiscalYearDto,
  LedgerInListDto, UpdateContactDto
} from "@fom/shared/api-dtos";
import { API_BASE_URL } from "../../../constants";
import { EMPTY, Observable } from "rxjs";
import { CustomersQuery } from "./customers.query";

@Injectable({ providedIn: 'root' })
export class CustomersDataService {
  private readonly apiBase: string;
  constructor(private customersStore: CustomersStore, private query: CustomersQuery, @Inject(API_BASE_URL) private serverBaseUrl: string,private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/customers`;
  }

  get() {
    const request$ = this.http.get<CustomersDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.customersStore.set(entities);
      })
    );
    return this.query
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }

  getCustomersByOwner(ownerId: string) {
    const request = this.http.get<CustomersDto[]>(`${this.apiBase}/owners/${ownerId}`).pipe(
      tap((entities) => {
        this.customersStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  updateCustomerInfo(payload: EditCustomerDto) {
    return this.http.patch<void>(`${this.apiBase}/${payload._id}`, payload);
  }

  changeOwner(payload: ChangeCustomerOwnerDto){
    return this.http.patch<void>(`${this.apiBase}/${payload.customerId}/owner`, payload)
  }

  add(payload: AddCustomerDto) {
   return this.http.post(this.apiBase, payload);
  }


  clearCache() {
    this.customersStore.setHasCache(false, { restartTTL: true });
  }

  setActive(id) {
    this.customersStore.setActive(id)
  }

  getCustomerById(id: string):Observable<CustomersDto|boolean>  {
    return this.http.get<CustomersDto|boolean> (`${this.apiBase}/${id}`);
  }

  addNote(payload: AddCustomerNoteDto){
    return this.http.post<void>(`${this.apiBase}/${payload.customerId}/notes`, payload);
  }

  updateNote(payload: EditCustomerNoteDto){
    return this.http.patch<void>(`${this.apiBase}/${payload.customerId}/notes/${payload.noteId}`, payload);
  }

  deleteNote(id: string, noteId: string){
    return this.http.delete<void>(`${this.apiBase}/${id}/notes/${noteId}`);
  }
}
