import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { LeadsStore } from './leads.store';
import { API_BASE_URL } from '../../../constants';
import {
  AddLeadDto,
  AddLeadNoteDto,
  ChangeLeadOwnerDto, ConvertLeadDto,
  EditLeadNoteDto,
  LeadInListDto,
  UpdateLeadDto
} from "@fom/shared/api-dtos";
import { EMPTY, Observable } from 'rxjs';
import { LeadsQuery } from './leads.query';

@Injectable({ providedIn: 'root' })
export class LeadsService {
  private apiBase: string;

  constructor(
    private leadsStore: LeadsStore,
    private query: LeadsQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/leads`;
  }

  getAllLeads() {
    const request = this.http.get<LeadInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.leadsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  getLeadsByOwner(ownerId: string) {
    const request = this.http.get<LeadInListDto[]>(`${this.apiBase}/owners/${ownerId}`).pipe(
      tap((entities) => {
        this.leadsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  getLeadById(id: string): Observable<LeadInListDto> {
    return this.http.get<LeadInListDto>(`${this.apiBase}/${id}`).pipe(
      tap(data => this.leadsStore.update(data._id, {
        leadOwnerId: data.leadOwnerId,
        _leadOwner: data._leadOwner,
        notes: data.notes
      }))
    );
  }

  addLead(payload: AddLeadDto) {
    return this.http.post(`${this.apiBase}`, payload);
  }

  updateLeadInfo(payload: UpdateLeadDto) {
    return this.http.patch<void>(`${this.apiBase}/${payload._id}`, payload);
  }

  changeLeadOwner(payload: ChangeLeadOwnerDto){
    return this.http.patch<void>(`${this.apiBase}/${payload.leadId}/lead-owner`, payload)
  }

  addNote(payload: AddLeadNoteDto){
    return this.http.post<void>(`${this.apiBase}/${payload.leadId}/notes`, payload);
  }

  updateNote(payload: EditLeadNoteDto){
    return this.http.patch<void>(`${this.apiBase}/${payload.leadId}/notes/${payload.noteId}`, payload);
  }

  deleteNote(leadId: string, noteId: string){
    return this.http.delete<void>(`${this.apiBase}/${leadId}/notes/${noteId}`);
  }

  deleteLead(leadId: string){
    return this.http.delete<void>(`${this.apiBase}/${leadId}`)
  }

  clearCache() {
    this.leadsStore.setHasCache(false, { restartTTL: true });
  }

  setActive(id: string) {
    this.leadsStore.setActive(id);
  }

  convertLead(payload: ConvertLeadDto) {
    return this.http.post(`${this.apiBase}/${payload.leadId}/convert`, payload);
  }
}
