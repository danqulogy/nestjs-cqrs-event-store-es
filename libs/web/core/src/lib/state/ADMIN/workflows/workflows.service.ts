import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core'
import { cacheable, ID } from '@datorama/akita'
import { switchMap, tap } from 'rxjs/operators'
import { WorkflowsStore } from './workflows.store';
import { API_BASE_URL } from '../../../constants'
import { EMPTY, Observable } from 'rxjs'
import { ApprovalWorkflowDto, ChangeAutoApproveStatusDto, UpdateApprovalCheckpointDto } from '@fom/shared/api-dtos';
import { WorkflowsQuery } from './workflows.query';

@Injectable({ providedIn: 'root' })
export class WorkflowsService {

  constructor(private workflowsStore: WorkflowsStore,
              private http: HttpClient,
              private workflowsQuery: WorkflowsQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string) {
  }


  get(): Observable<ApprovalWorkflowDto[]> {
    const request$ = this.http.get<ApprovalWorkflowDto[]>(`${this.serverBaseUrl}/workflows`)
      .pipe(tap(entities => {
      this.workflowsStore.set(entities);
    }));

    return this.workflowsQuery
      .selectHasCache()
      .pipe(switchMap((hasCache) => (hasCache ? EMPTY : request$)));
  }


  updateApprovalCheckpoints(payload: UpdateApprovalCheckpointDto) {
    return this.http.patch<void>(`${this.serverBaseUrl}/workflows/${payload._id}`, payload)
  }

  changeAutoApproveStatus(payload: ChangeAutoApproveStatusDto){
    return this.http.patch<void>(`${this.serverBaseUrl}/workflows/${payload._id}/auto-approve`, payload)
  }


  setActive(_id: string) {
    this.workflowsStore.setActive(_id)
  }

  clearCache() {
    this.workflowsStore.setHasCache(false, {restartTTL: true})
  }
}
