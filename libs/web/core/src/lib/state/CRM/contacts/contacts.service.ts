import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { ID } from '@datorama/akita';
import { switchMap, tap } from "rxjs/operators";
import { ContactsStore } from './contacts.store';
import {
  AddContactDto, AddContactNoteDto,
  AddLeadDto,
  AddLeadNoteDto, ChangeContactOwnerDto,
  ChangeLeadOwnerDto, ContactInListDto, EditContactNoteDto,
  EditLeadNoteDto,
  LeadInListDto, UpdateContactDto,
  UpdateLeadDto
} from "@fom/shared/api-dtos";
import { EMPTY, Observable } from "rxjs";
import { ContactsQuery } from "./contacts.query";
import { API_BASE_URL } from '../../../constants';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private apiBase: string;

  constructor(
    private leadsStore: ContactsStore,
    private query: ContactsQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/contacts`;
  }

  getAllContacts() {
    const request = this.http.get<ContactInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.leadsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  getContactsByOwner(ownerId: string) {
    const request = this.http.get<ContactInListDto[]>(`${this.apiBase}/owners/${ownerId}`).pipe(
      tap((entities) => {
        this.leadsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  getContactById(id: any): Observable<ContactInListDto> {
    return this.http.get<ContactInListDto>(`${this.apiBase}/${id}`).pipe(
      tap(data => {
        console.log('updated contact', data);
        this.leadsStore.update(id, {
          ownerId: data.ownerId,
          _owner: data._owner,
          _notes: data._notes
        });
      })
    );
  }

  addContact(payload: AddContactDto) {
    return this.http.post(`${this.apiBase}`, payload);
  }

  updateContactInfo(payload: UpdateContactDto) {
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

  deleteContact(id: string){
    return this.http.delete<void>(`${this.apiBase}/${id}`)
  }

  clearCache() {
    this.leadsStore.setHasCache(false, { restartTTL: true });
  }

  setActive(id: string) {
    this.leadsStore.setActive(id);
  }



}
