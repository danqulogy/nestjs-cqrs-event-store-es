import { IsMongoId, IsNotEmpty, IsNumber, IsPositive } from 'class-validator'
import { ApprovalStepEnum, ApprovalWorkflowDto } from '../Approvals';
import { ReportingLinesDto } from './reporting-lines.dto';
import { DepartmentDto } from '../HR/Department';
import { DescriptionLineItemDto } from './description-line-item.dto';
import { SalaryRangeDto } from './salary-range.dto';
import { JobClassificationDto } from './add-job-classification.dto';
import { JobGradeDto } from './job-classification.types';

export class ApplyForSalaryUpgradeDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  newUpperLimit: number

  @IsNotEmpty()
  notes: string
}

export enum RequestStatusEnum{
  Approved = 'approved',
  Rejected = 'rejected',
  Pending = 'pending',
  Cancelled = 'cancelled'
}

export interface JobDocumentation {
  _id?: string
}
export class JobAnalysisDto{
  _id?: string
  jobTitle: string
  jobSummary: string
  departmentId: string
  isHod: boolean
  jobClassificationId: string
  jobGradeId: string
  employmentType: string
  educationalQualification: string
  coreResponsibilities: DescriptionLineItemDto[]
  jobSpecifications: DescriptionLineItemDto[]
  reportingLines: ReportingLinesDto
  // applicableRole: JobAnalysisApplicableRole
  allowsMultipleOccupants: boolean
  active?: boolean
  lastModifiedById?: string
  pendingRequest?: boolean


  _department?: DepartmentDto
  _jobClassification?: JobClassificationDto
  _jobGrade?: JobGradeDto
  _majorReportingLine?: JobAnalysisDto
  _minorReportingLine?: JobAnalysisDto
  key?: string
  parent?: string
}

export class SalaryUpgradeRequestsDto {
  _id?: string
  requesterEmployeeId: string
  jobAnalysisId: string
  approvalWorkflowId: string
  newSalaryAmount: number
  notes: string
  currentStep: number
  status: 'approved'|'rejected'|'pending'|RequestStatusEnum
  completed: boolean
  employee: {
    fullName: string,
    fullNameForInitials: string
  }
  jobAnalysisDocument: JobAnalysisDto|any
  approvalWorkflow: ApprovalWorkflowDto|any
  createdAt: string| Date
  updatedAt: string | Date
}

