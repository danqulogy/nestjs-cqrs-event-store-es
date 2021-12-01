import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WorkflowsStore, WorkflowsState } from './workflows.store';

@Injectable({ providedIn: 'root' })
export class WorkflowsQuery extends QueryEntity<WorkflowsState> {

  constructor(protected store: WorkflowsStore) {
    super(store);
  }

}
