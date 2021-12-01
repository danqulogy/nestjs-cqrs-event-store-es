import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { TasksStore } from './tasks.store';
import { AddTaskDto, EditTaskDto, TaskDto, UpdateTaskProgressDto, UpdateTrackItemsDto } from "@fom/shared/api-dtos";
import { API_BASE_URL } from '../../../constants';
import { EMPTY } from 'rxjs';
import { TasksQuery } from './tasks.query';

@Injectable({ providedIn: 'root' })
export class TasksService {

  private endpoint: string;

  constructor(
    private tasksStore: TasksStore,
    private query: TasksQuery,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient
  ) {
    this.endpoint = `${this.serverBaseUrl}/tasks`;
  }

  get() {
    const request = this.http.get<TaskDto[]>(this.endpoint).pipe(
      tap((entities) => {
        this.tasksStore.set(entities);
      })
    );

    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  add(task: AddTaskDto) {
    return this.http.post(this.endpoint, task);
  }

  update(task: EditTaskDto) {
    return this.http.patch(`${this.endpoint}/${task._id}`, task);
  }

  updateProgress(task: UpdateTaskProgressDto) {
    return this.http.patch(`${this.endpoint}/${task._id}/progress`, task);
  }

  updateTrackItems(payload: UpdateTrackItemsDto) {
    return this.http.patch(
      `${this.endpoint}/projects/${payload.projectId}/tracks/${payload.trackName}`,
      payload
    );
  }

  delete(_id: string) {
    return this.http.delete(`${this.endpoint}/${_id}`);
  }


  setActive(id: string) {
    this.tasksStore.setActive(id);
  }

  clearCache() {
    this.tasksStore.setHasCache(false, { restartTTL: true });
  }
}
