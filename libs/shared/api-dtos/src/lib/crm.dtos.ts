import { CustomersDto, ItemInListDto } from "./Finance/accounting-shared-kernel";
import { LeadInListDto, NoteDto, CrmEntityOwnerDto, CrmEntityRatingEnum, CrmEntityStatusEnum } from "./Leads";
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ActivityDto } from "./shared.dtos";

export class AddContactNoteDto {
  @IsNotEmpty()
  @IsMongoId()
  contactId: string;

  @IsNotEmpty()
  note: string;
}

export class EditContactNoteDto {
  @IsNotEmpty()
  @IsMongoId()
  contactId: string;

  @IsNotEmpty()
  note: string;

  @IsMongoId()
  @IsNotEmpty()
  noteId: string;
}


export class ChangeContactOwnerDto {
  @IsNotEmpty()
  leadId: string;

  @IsNotEmpty()
  leadOwnerId: string;
}

export class UpdateContactDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  customerId: string

  @IsOptional()
  nameAddress: string;

  @IsOptional()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  jobTitle: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  source: string;

  @IsOptional()
  streetAddress: string;

  @IsOptional()
  city: string;

  @IsOptional()
  region: string;

  @IsOptional()
  country: string;

  @IsOptional()
  description: string;

  @IsOptional()
  ownerId: string;
}

export class AddContactDto {

  @IsNotEmpty()
  customerId: string

  @IsOptional()
  nameAddress: string;

  @IsOptional()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  jobTitle: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  source: string;

  @IsOptional()
  streetAddress: string;

  @IsOptional()
  city: string;

  @IsOptional()
  region: string;

  @IsOptional()
  country: string;

  @IsOptional()
  description: string;

  @IsOptional()
  ownerId: string;
}

export class ContactInListDto {
  customerId: string;
  _id?: string;
  nextActivityId?: string
  ownerId: string;
  nameAddress?: string;
  firstName?: string;
  lastName: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  source?: string;
  status?: string | CrmEntityStatusEnum;
  industry?: string;
  rating?: string | CrmEntityRatingEnum;
  streetAddress?: string;
  city?: string;
  state?: string;
  region?: string;
  country?: string;
  description?: string;
  lastModifiedById?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _owner?: CrmEntityOwnerDto;
  _customer?: CustomersDto
  _nextActivity?: ActivityDto
  _notes?: NoteDto[]
  _fullName?: string;

}


export class DealInListDto{

  _id?: string
  amount: number
  name: string
  description: string
  closingDate: Date
  stage: DealStageEnum
  customerId: string
  contactId: string
  contactRole: ContactRoleEnum
  ownerId: string
}

export class UpdateDealDto{
  @IsNotEmpty()
  @IsMongoId({message: 'Invalid Deal ID'})
  _id?: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsNotEmpty()
  name: string

  @IsOptional()
  description: string

  @IsNotEmpty()
  closingDate: Date

  @IsNotEmpty()
  stage: DealStageEnum

  @IsNotEmpty()
  @IsNotEmpty({message: 'Invalid Contact ID'})
  contactId: string

  @IsNotEmpty()
  @IsNotEmpty({message: 'Invalid Contact ID'})
  customerId: string

  @IsNotEmpty()
  contactRole: ContactRoleEnum

  @IsNotEmpty()
  @IsNotEmpty({message: 'Invalid Owner ID'})
  ownerId: string
}


export class CreateDealDto{

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsOptional()
  description: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  closingDate: Date

  @IsNotEmpty()
  stage: DealStageEnum

  @IsNotEmpty()
  @IsMongoId({message: 'Invalid Contact ID'})
  contactId: string

  @IsNotEmpty()
  contactRole: ContactRoleEnum

  @IsNotEmpty()
  @IsMongoId({message: 'Invalid Owner ID'})
  ownerId: string
}

export class LeadDealDto{
  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsOptional()
  description: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  closingDate: Date

  @IsNotEmpty()
  stage: DealStageEnum

  @IsNotEmpty()
  contactRole: ContactRoleEnum
}


export class ConvertLeadDto{
  @IsNotEmpty()
  leadId: string

  @IsOptional()
  deal: LeadDealDto
}

export enum ContactRoleEnum {
  NONE = 'None',
  DEVELOPER_EVALUATOR = 'Developer/Evaluator',
  DECISION_MAKER = 'Decision Maker',
  PURCHASING = 'Purchasing',
  EXECUTIVE_SPONSOR = 'Executive Sponsor',
  ENGINEERING_LEAD = 'Engineering Lead',
  ECONOMIC_DECISION_MAKER = 'Economic Decision Maker',
  PRODUCT_MANAGEMENT = 'Product Management'
}

export enum DealStageEnum{
  QUALIFICATION='Qualification',
  PROPOSAL_PRICE_QUOTE='Proposal/Price Quote',
  NEGOTIATION_REVIEW='Negotiation/Review',
  CLOSED_WON='Closed Won',
  CLOSED_LOST='Closed Lost',
}

export enum ActivityTypeEnum{
  TASK= 'Task',
  CALL ='Call',
  MEETING = 'Meeting'
}

export class EditTaskActivityDto {

  @IsNotEmpty()
  _id: string

  @IsNotEmpty()
  subject: string

  @IsNotEmpty()
  dueDate: Date

  @IsNotEmpty()
  priority: ActivityPriorityEnum

  @IsNotEmpty()
  employeeId: string

  @IsNotEmpty()
  reminderDate: Date

  @IsNotEmpty()
  leadId: string
}



export class AddTaskActivityDto {
  @IsNotEmpty()
  subject: string

  @IsNotEmpty()
  dueDate: Date

  @IsNotEmpty()
  priority: ActivityPriorityEnum

  @IsNotEmpty()
  employeeId: string

  @IsNotEmpty()
  reminderDate: Date

  @IsNotEmpty()
  leadId: string
}

export enum ActivityPriorityEnum{
  LOWEST =1,
  LOW,
  NORMAL,
  HIGH,
  HIGHEST
}

export enum CallPurposeEnum{
  NONE = "None",
  PROSPECTING = 'Prospecting',
  ADMINISTRATIVE = 'Administrative',
  NEGOTIATION = 'Negotiation',
  PROJECT = 'Project'
}

export enum CallResultEnum {
  NONE = "None",
  INTERESTED = 'Interested',
  NOT_INTERESTED = 'Not Interested',
  NO_RESPONSE_OR_BUSY = 'No Response/Busy',
  REQUESTED_MORE_INFO ='Requested More Information',
  REQUESTED_CALL_BACK = 'Requested Callback',
  INVALID_NUMBER = 'Invalid Number'
}

export class AddLeadProductDto{
  @IsNotEmpty()
  leadId: string

  @IsNotEmpty()
  productId: string
}

export class LeadProductDto{
  _id?: string
  leadId: string
  productId: string
  _lead?: LeadInListDto
  _product?: ItemInListDto
}

