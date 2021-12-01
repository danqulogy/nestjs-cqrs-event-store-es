import { MembersInListDto } from '../HR/Employees';
import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export * from './leave-entitlement.dto'

export class DeclineLeaveRequestDto{
  @IsNotEmpty()
  @IsMongoId()
  leaveRequestId: string;

  @IsNotEmpty()
  comment: string;
}

export enum LeaveTypeEnum {

  ANNUAL_LEAVE ='Annual Leave',
  SICK_LEAVE ='Sick/Medical Leave',
  LEAVE_OF_ABSENCE = 'Leave of Absence',
  COMPASSIONATE_LEAVE ='Compassionate Leave',
  MATERNITY_LEAVE ='Maternity Leave',
  SPECIAL_PAID_LEAVE='Special Paid Leave',
  SPECIAL_UNPAID_LEAVE = 'Special Unpaid Leave',
}

export class LeaveTypeDto {
  _id?: string
  name: string|LeaveTypeEnum
  maxDays: number
  status: boolean
  paid: boolean
}

export enum LeaveRequestStatus {
  NEW = 'New',
  APPROVED ='Approved',
  PENDING = 'Pending',
  DECLINED = 'Declined',
  CANCELLED = 'Cancelled'
}

export class LeaveRequestDto {
  _id?: string
  employeeId: string
  leaveTypeId: string
  annualLeaveId: string
  numberOfDays: number
  fromDate: Date
  toDate: Date
  reason: string
  status: 'New'| 'Approved'|'Pending'|'Declined'|LeaveRequestStatus
  fiscalYear: number
  _employee?: MembersInListDto
  _leaveType?: LeaveTypeDto
  _comments?: LeaveRequestCommentDto[]
  createdAt?: Date
  updatedAt?: Date
  currentApproverEmployeeId: string
  reviewers: string[]
}

export class SubmitLeaveRequestDto{

  @IsNotEmpty()
  @IsMongoId()
  annualLeaveId: string

  @IsNotEmpty()
  @IsMongoId()
  employeeId: string;

  @IsNotEmpty()
  @IsMongoId()
  leaveTypeId: string

  @IsNotEmpty()
  @IsNumber()
  numberOfDays: number

  @IsNotEmpty()
  @IsDateString()
  fromDate: Date

  @IsNotEmpty()
  @IsDateString()
  toDate: Date

  @IsNotEmpty()
  @IsString()
  reason: string
}

export class LeaveRequestCommentDto {
  _id?: string
  leaveRequestId: string
  employeeId: string
  comment: string
  _employeeName?: string
  _reviewer?: MembersInListDto
}
