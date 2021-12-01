import { MembersInListDto } from "../HR/Employees";

export class LeaveEntitlementDto{
  _id?: string
  employeeId: string
  fiscalYear: number
  entitlement: number
  // arrears?: number
  _employee?: MembersInListDto
  _spentLeavesCount?: number
}
