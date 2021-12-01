import { CreateDealDto, UpdateDealDto } from "@fom/shared/api-dtos";
import { AddContactNoteDto, EditContactNoteDto } from '@fom/shared/api-dtos';
import { ChangeContactOwnerDto } from '@fom/shared/api-dtos';
import { AddContactDto, UpdateContactDto } from '@fom/shared/api-dtos';
import { Observable } from 'rxjs';
import { DealInListDto } from '@fom/shared/api-dtos';
import { DealsQuery } from './deals.query';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { DealsStore } from './deals.store';
import { EMPTY } from 'rxjs';
import { API_BASE_URL } from '../../../constants';

@Injectable({ providedIn: 'root' })
export class DealsService {

  private apiBase: string;

  constructor(
    private dealsStore: DealsStore,
    private query: DealsQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/deals`;
  }

  getAllDeals() {
    const request = this.http.get<DealInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.dealsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  getDealsByOwner(ownerId: string) {
    const request = this.http.get<DealInListDto[]>(`${this.apiBase}/owners/${ownerId}`).pipe(
      tap((entities) => {
        this.dealsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  getDealById(id: any): Observable<DealInListDto> {
    return this.http.get<DealInListDto>(`${this.apiBase}/${id}`).pipe(
      // tap(data => {
      //   console.log('updated contact', data);
      //   this.dealsStore.update(id, {
      //     ownerId: data.ownerId,
      //     _owner: data._owner,
      //     _notes: data._notes
      //   });
      // }
      // )
    );
  }

  addDeal(payload: CreateDealDto) {
    return this.http.post(`${this.apiBase}`, payload);
  }

  updateDealDetails(payload: UpdateDealDto) {
    return this.http.patch<void>(`${this.apiBase}/${payload._id}`, payload);
  }

  changeOwner(payload: ChangeContactOwnerDto){
    return this.http.patch<void>(`${this.apiBase}/${payload.leadId}/owner`, payload)
  }

  addNote(payload: AddContactNoteDto){
    return this.http.post<void>(`${this.apiBase}/${payload.contactId}/notes`, payload);
  }

  updateNote(payload: EditContactNoteDto){
    return this.http.patch<void>(`${this.apiBase}/${payload.contactId}/notes/${payload.noteId}`, payload);
  }

  deleteNote(id: string, noteId: string){
    return this.http.delete<void>(`${this.apiBase}/${id}/notes/${noteId}`);
  }

  deleteDeal(id: string){
    return this.http.delete<void>(`${this.apiBase}/${id}`)
  }

  clearCache() {
    this.dealsStore.setHasCache(false, { restartTTL: true });
  }

  setActive(id: string) {
    this.dealsStore.setActive(id);
  }






}
