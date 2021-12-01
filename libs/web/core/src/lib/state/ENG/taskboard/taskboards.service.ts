import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { TaskboardsStore } from './taskboards.store';
import { TaskBoardDto } from '@fom/shared/api-dtos';
import { EMPTY } from 'rxjs';
import { API_BASE_URL } from '../../../constants';
import { TaskboardsQuery } from './taskboards.query';

@Injectable({ providedIn: 'root' })
export class TaskboardsService {
  private apiBase: string;

  constructor(
    private taskboardsStore: TaskboardsStore,
    private query: TaskboardsQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.apiBase = `${this.serverBaseUrl}/projects/task-boards`;
  }

  get() {
    const request = this.http.get<TaskBoardDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.taskboardsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

}
