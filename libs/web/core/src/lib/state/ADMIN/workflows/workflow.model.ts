import { ApprovalWorkflowDto } from '@fom/shared/api-dtos';

export function createWorkflow(params: Partial<ApprovalWorkflowDto>) {
  return {
    checkPoints: [],
    name: null,
    systemName: null
  } as ApprovalWorkflowDto;
}
