import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { ID } from '@datorama/akita';
import { switchMap, tap } from "rxjs/operators";
import { SmsStore } from './sms.store';
import {
  AddContactDto, AddContactNoteDto,
  AddLeadDto,
  AddLeadNoteDto, ChangeContactOwnerDto,
  ChangeLeadOwnerDto, ContactInListDto, EditContactNoteDto,
  EditLeadNoteDto,
  LeadInListDto, SendSmsDto, SmsInListDto, UpdateContactDto,
  UpdateLeadDto
} from '@fom/shared/api-dtos';
import { EMPTY, Observable } from "rxjs";
import { SmsQuery } from "./sms.query";
import { API_BASE_URL } from '../../constants';

@Injectable({ providedIn: 'root' })
export class SmsService {
  private apiBase: string;

  constructor(
    private leadsStore: SmsStore,
    private query: SmsQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/sms`;
  }

  getAllMessages() {
    const request = this.http.get<SmsInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.leadsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  getSmsBySender(ownerId: string) {
    const request = this.http.get<SmsInListDto[]>(`${this.apiBase}/owners/${ownerId}`).pipe(
      tap((entities) => {
        this.leadsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }


  sendMessage(payload: SendSmsDto) {
    return this.http.post(`${this.apiBase}`, payload);
  }





  clearCache() {
    this.leadsStore.setHasCache(false, { restartTTL: true });
  }

  setActive(id: string) {
    this.leadsStore.setActive(id);
  }



}
