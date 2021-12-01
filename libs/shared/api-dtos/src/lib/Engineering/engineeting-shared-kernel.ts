import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { MembersInListDto } from '../HR/Employees';
import { LeadInListDto } from '../Leads';

export enum ProjectActivityTrack{
  TODO= 'Todos',
  DOING = 'Doing',
  DONE ='Done'
}

export class TaskBoardDto {
  _id?: string;
  projectId: string;
  title: string;
  tasks?: any[];
  systemOwned?: boolean;
  active?: boolean;
}

export enum TaskPriority {
  HIGH = 'High',
  NORMAL = 'Normal',
  LOW = 'Low',
}

export enum ProjectTypeEnum {
  MAINTENANCE = 'Maintenance',
  INSTALLATION = 'Installation',
}

export enum ProjectExecutionStatusEnum {
  NEW = 'New',
  DRAFT = 'Draft',
  ONGOING = 'On Going',
  UPCOMING = 'Upcoming',
  TERMINATED = 'Terminated',
  COMPLETED = 'Completed',
  OVERDUE = 'Overdue',
}

export class AddProjectDto {
  @IsNotEmpty()
  type: ProjectTypeEnum;

  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsOptional()
  quantitySurveyorName: string;

  @IsNotEmpty()
  @IsMongoId()
  managerId: string;

  @IsNotEmpty()
  teamLeadId: string;

  @IsNotEmpty({ each: true })
  engineers: string[];
}

export class ProjectEngineerDto {
  _id?: string;
  projectId: string;
  engineerId: string;
  _engineer?: MembersInListDto;
}

export class ProjectDto {
  _id: string;
  type: ProjectTypeEnum;
  customerId: string;
  _customer?: LeadInListDto;
  name: string;
  description: string;
  location: string;
  startDate?: Date;
  endDate?: Date;
  quantitySurveyorName: string;
  managerId: string;
  _manager?: MembersInListDto;
  _teamLead?: MembersInListDto;
  _engineers: ProjectEngineerDto[];
  _engineersProfiles?: MembersInListDto[];
  estimateId: string;
  invoiceIds: string[];
  materialsSupplied: [];
  _tasks: TaskDto[];
  executionStatus: ProjectExecutionStatusEnum;
  commissioned: boolean;
  remarks: string[];
  _taskboard?: TaskBoardDto;
  teamLeadId: string;
  _completedTasks?: number
  _uncompletedTasks?: number
  _percentCompleted?: number
}

export class SetProjectTimelineDto {
  @IsNotEmpty()
  @IsMongoId()
  projectId: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}

export class AddProjectEngineersDto {
  @IsNotEmpty()
  projectId: string;

  @IsArray()
  engineerIds: string[];
}

export class TaskAssigneeDto{
  _id?: string
  taskId: string
  assigneeId: string
}

export class TaskDto {
  _id?: string;
  projectId: string
  track: ProjectActivityTrack
  name: string;
  priority: TaskPriority;
  dueDate: Date;
  weight: number;
  percentDone: number;
  _assignees: TaskAssigneeDto[];
  assignees?: MembersInListDto[];
}

export class AddTaskDto {
  @IsNotEmpty()
  @IsMongoId()
  projectId: string

  @IsNotEmpty()
  @IsEnum(ProjectActivityTrack)
  track: ProjectActivityTrack

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsOptional()
  dueDate: Date;

  @IsOptional()
  assignees: string[];

  @IsNotEmpty()
  @IsNumber()
  weight: number;
}

export class UpdateTaskProgressDto {

  @IsNotEmpty()
  @IsMongoId({message: 'Invalid Id'})
  _id: string

  @IsNotEmpty()
  @IsMongoId({message: 'Invalid Project Id'})
  projectId: string

  @IsNotEmpty()
  @IsEnum(ProjectActivityTrack)
  track: ProjectActivityTrack

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsOptional()
  dueDate: Date;

  @IsOptional()
  assignees: string[];

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  percentDone: number;
}


export class EditTaskDto {

  @IsNotEmpty()
  @IsMongoId({message: 'Invalid Id'})
  _id: string

  @IsNotEmpty()
  @IsMongoId({message: 'Invalid Project Id'})
  projectId: string

  @IsNotEmpty()
  @IsEnum(ProjectActivityTrack)
  track: ProjectActivityTrack

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsOptional()
  dueDate: Date;

  @IsOptional()
  assignees: string[];

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  percentDone: number;
}


export  class UpdateTrackItemsDto{
  @IsNotEmpty()
  trackName: ProjectActivityTrack

  @IsNotEmpty()
  projectId: string

  @IsNotEmpty({each: true})
  tasks: TaskDto[]
}

export enum RequisitionStatus{
  SUBMIT ='Submitted',
  APPROVED ='Approved',
  DRAFT = 'Draft',
  CANCEL = 'Cancelled',
  DECLINED = 'Declined',
}

export class AddRequisitionDto{
  @IsNotEmpty()
  projectId: string

  @IsNotEmpty()
  lineItems: TempRequisitionLineItem[]

  @IsNotEmpty()
  status?: RequisitionStatus
}

export class UpdateRequisitionStatusDto{
  @IsNotEmpty()
  requisitionId: string


  @IsNotEmpty()
  requisitionNumber: number

  @IsNotEmpty()
  status?: RequisitionStatus
}

export class UpdateRequisitionDto{
  @IsNotEmpty()
  requisitionId: string

  @IsNotEmpty()
  requisitionNumber: number

  @IsNotEmpty()
  projectId: string

  @IsNotEmpty()
  lineItems: TempRequisitionLineItem[]

  @IsNotEmpty()
  status?: RequisitionStatus
}

export class RequisitionInListDto{
  _id?: string
  projectId: string
  sourceId: string
  requisitionNumber: number
  _lineItems: TempRequisitionLineItem[]
  status: RequisitionStatus
  _project: ProjectDto
  requisitionDate?: Date;
}

export interface TempRequisitionLineItem {
  id: string;
  productId: string
  sourceId?: string
  productName: string
  quantity: number
  unit: string
}



