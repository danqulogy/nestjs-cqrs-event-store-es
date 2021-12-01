import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";
import { ActivityStore } from './activity.store';
import { ActivityDto, AddTaskActivityDto, ConvertIssueToTaskActivityDto, EditTaskActivityDto } from "@fom/shared/api-dtos";
import { EMPTY } from "rxjs";
import { API_BASE_URL } from '../../../constants';
import { ActivityQuery } from "./activity.query";

@Injectable({ providedIn: 'root' })
export class ActivityService {

  private apiBase: string;

  constructor(private store: ActivityStore,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private query: ActivityQuery,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/activities`;
  }

  getAll() {
    const request$ = this.http.get<ActivityDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.store.set(entities);
      })
    );
    return this.query
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }


  clearCache() {
    this.store.setHasCache(false, { restartTTL: true });
    this.store.reset()
  }

  setActive(id) {
    this.store.setActive(id)
  }

  addTask(payload: AddTaskActivityDto) {
    return this.http.post(`${this.apiBase}/tasks`, payload)
  }

  updateTask(payload: EditTaskActivityDto) {
    return this.http.patch(`${this.apiBase}/tasks/${payload._id}`, payload)
  }

  completeLeadActivity(_id: string) {
    return this.http.patch(`${this.apiBase}/tasks/${_id}/complete/lead`, null)
  }

  completeIssueActivity(_id: string) {
    return this.http.patch(`${this.apiBase}/tasks/${_id}/complete/issue`, null)
  }

  deleteActivity(_id: string) {
    return this.http.delete(`${this.apiBase}/tasks/${_id}/delete`)
  }

  convertIssueToTask(payload: ConvertIssueToTaskActivityDto) {
    return this.http.post(`${this.apiBase}/tasks/convert-issues`, payload);
  }
}
