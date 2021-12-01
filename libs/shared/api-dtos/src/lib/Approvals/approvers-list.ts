import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export enum ApprovalStepEnum {
  FIRST=1,
  SECOND,
  THIRD,
  FOURTH
}

export enum LeaveApprovalStep{
  NONE,
  HOD_OF_EMPLOYEE,
  HR_MANAGER,
  MANAGEMENT,
  COMPLETED
}

export enum ApproversEnum{
  NONE = '(None)',
  HOD_OF_EMPLOYEE='HOD of Employee',
  HR_MANAGER = 'HR Manager',
  DEPUTY_MANAGER = 'Deputy Manager',
  MANAGING_DIRECTOR = 'Managing Director'
}

export const ApproversList = [
  ApproversEnum.NONE.toString(),
    ApproversEnum.HOD_OF_EMPLOYEE.toString(),
    ApproversEnum.HR_MANAGER.toString(),
    ApproversEnum.DEPUTY_MANAGER.toString(),
    ApproversEnum.MANAGING_DIRECTOR.toString()
]
export class ApprovalCheckPointDto {
  step: number | ApprovalStepEnum
  name: string | ApproversEnum
}
export class ApprovalWorkflowDto{
  _id: string
  name: string
  autoApprove: boolean
  systemName?: string
  checkPoints: ApprovalCheckPointDto[]
}

export class UpdateApprovalCheckpointDto{
  @IsNotEmpty()
  @IsMongoId()
  _id: string

  @IsNotEmpty({each: true})
  checkPoints: ApprovalCheckPointDto[]
}

export class ChangeAutoApproveStatusDto{
  @IsNotEmpty()
  @IsMongoId()
  _id: string

  @IsNotEmpty()
  @IsBoolean()
  autoApprove: boolean
}
