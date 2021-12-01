import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ApprovalWorkflowDto } from '@fom/shared/api-dtos';

export interface WorkflowsState extends EntityState<ApprovalWorkflowDto>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'workflows', idKey:'_id' })
export class WorkflowsStore extends EntityStore<WorkflowsState> {

  constructor() {
    super({});
  }

}
