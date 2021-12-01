import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators';
import { ProjectsStore } from './projects.store';
import {
  AddProjectDto,
  AddProjectEngineersDto,
  ProjectDto,
  ProjectEngineerDto,
  SetProjectTimelineDto
} from '@fom/shared/api-dtos';
import { API_BASE_URL, SILENT_HEADERS } from '../../../constants';
import { EMPTY } from 'rxjs';
import { ProjectsQuery } from './projects.query';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private endpoint: string;

  constructor(
    private projectsStore: ProjectsStore,
    @Inject(API_BASE_URL) private serverBaseUrl: string,
    private http: HttpClient,
    private query: ProjectsQuery,
  ) {
    this.endpoint = `${this.serverBaseUrl}/projects`
  }

  get() {
    const request =  this.http.get<ProjectDto[]>(this.endpoint, {headers: SILENT_HEADERS}).pipe(
      tap((entities) => {
        this.projectsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  setTimeline(payload: SetProjectTimelineDto) {
    return this.http.patch(`${this.endpoint}/${payload.projectId}/timeline`, payload);
  }

  removeProjectEngineer(payload: ProjectEngineerDto) {
    return this.http.delete(`${this.endpoint}/${payload.projectId}/engineers/${payload.engineerId}`)
  }

  addEngineers(payload: AddProjectEngineersDto) {
    return this.http.post(`${this.endpoint}/${payload.projectId}/engineers`, payload);
  }

  add(payload: AddProjectDto) {
    return this.http.post(this.endpoint, payload);
  }

  update(id, project: Partial<ProjectDto>) {
    this.projectsStore.update(id, project);
  }

  remove(id: ID) {
    this.projectsStore.remove(id);
  }

  setActive(id: string) {
    this.projectsStore.setActive(id);
  }

  clearCache() {
    this.projectsStore.setHasCache(false, { restartTTL: true });
  }



}
