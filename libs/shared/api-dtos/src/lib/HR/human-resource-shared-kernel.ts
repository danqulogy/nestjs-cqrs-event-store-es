import { FiscalYearDto } from "../Organization";
import { IsNotEmpty, IsOptional } from "class-validator";
import { LeaveEntitlementDto } from "../Leaves";
import { ActivityPriorityEnum } from "../crm.dtos";


export class ConvertIssueToTaskActivityDto {
  @IsNotEmpty()
  subject: string

  @IsOptional()
  description: string

  @IsNotEmpty()
  dueDate: Date

  @IsNotEmpty()
  priority: ActivityPriorityEnum

  @IsNotEmpty()
  employeeId: string


  @IsOptional()
  reminderDate: Date

  @IsNotEmpty()
  issueId: string
}

export class AddEmployeeAnnualLeaveEntitlementDto{
  @IsNotEmpty()
  employeeId: string

  @IsNotEmpty()
  entitlement: number

  @IsNotEmpty()
  annualLeaveId: string
}

export class UpdateEmployeeAnnualLeaveEntitlementDto{
  @IsNotEmpty()
  employeeId: string

  @IsNotEmpty()
  entitlement: number

  @IsNotEmpty()
  annualLeaveId: string
}

export class ProcessLeaveEntitlementsDto{

  @IsNotEmpty()
  employeeId: string

  @IsNotEmpty()
  entitlement: number
}

export class AnnualLeaveDto {
  _id: string
  fiscalYearId: string
  archived:boolean
  _fiscalYear: FiscalYearDto
  _entitlements: LeaveEntitlementDto[]
}
