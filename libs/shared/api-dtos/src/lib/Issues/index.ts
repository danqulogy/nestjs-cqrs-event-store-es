import { MembersInListDto, JobStatusDto } from "../HR/Employees";
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { DepartmentCodeEnum } from '../HR/Department';
import { ActivityPriorityEnum } from "../crm.dtos";

export class ChangeIssueStatusDto {
  @IsNotEmpty()
  @IsMongoId()
  issueId: string

  @IsNotEmpty()
  status: string
}

export enum IssuesStatusEnum{
  PENDING='Pending',
  IN_PROGRESS ='In Progress',
  CANCELLED='Cancelled',
  DONE='Done'
}

export class IssueInListDto {
  _id?: string
  departmentId: string
  subject: string
  body: string
  submitterEmployeeId: string
  priority: ActivityPriorityEnum
  _employee: MembersInListDto
  _departmentName: string
  _departmentCode: string|DepartmentCodeEnum
  createdAt?: Date
  updatedAt?: Date
  status: string| IssuesStatusEnum
}

export class SubmitIssueDto {
  @IsOptional()
  @IsMongoId()
  _id?: string

  @IsNotEmpty()
  @IsMongoId()
  departmentId: string

  @IsNotEmpty()
  priority: ActivityPriorityEnum


  @IsNotEmpty()
  subject: string

  @IsOptional()
  body: string
}

