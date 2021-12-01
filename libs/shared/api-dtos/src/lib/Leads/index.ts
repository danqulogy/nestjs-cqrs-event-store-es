import { EnumToArray } from '../Common';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ActivityDto } from "../shared.dtos";

export * from './create-lead.dto';
export * from './leads-filter.dto';

export class ChangeLeadOwnerDto {
  @IsNotEmpty()
  leadId: string;

  @IsNotEmpty()
  leadOwnerId: string;
}



export class AddLeadNoteDto {
  @IsNotEmpty()
  @IsMongoId()
  leadId: string;

  @IsNotEmpty()
  note: string;
}

export class EditLeadNoteDto {
  @IsNotEmpty()
  @IsMongoId()
  leadId: string;

  @IsNotEmpty()
  note: string;

  @IsMongoId()
  @IsNotEmpty()
  noteId: string;
}

export interface CrmEntityOwnerDto {
  _id: string;
  firstName?: string
  surname?: string
  fullName: string;
  fullNameForInitials?: string;
}

export class AddLeadDto {
  @IsOptional()
  company: string;

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
  status: string | CrmEntityStatusEnum;

  @IsOptional()
  industry: string;

  @IsOptional()
  rating: string | CrmEntityRatingEnum;

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
  leadOwnerId: string;
}

export class UpdateLeadDto {
  @IsNotEmpty()
  _id: string;

  @IsOptional()
  company: string;

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
  status: string | CrmEntityStatusEnum;

  @IsOptional()
  industry: string;

  @IsOptional()
  rating: string | CrmEntityRatingEnum;

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
  leadOwnerId: string;

  @IsOptional()
  lastModifiedById: string;
}

export interface NoteDto {
  _id?: string;
  note: string;
  authorId: string;
  authorName: string;
  authorInitialName: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class LeadInListDto {
  _id: string;
  leadOwnerId: string;
  company: string;
  nameAddress?: string;
  firstName?: string;
  lastName: string;
  fullName?: string;
  fullNameForInitials?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  source?: string;
  status?: string | CrmEntityStatusEnum;
  industry?: string;
  numberOfEmployees?: number;
  rating?: string | CrmEntityRatingEnum;
  streetAddress?: string;
  city?: string;
  state?: string;
  region?: string;
  country?: string;
  description?: string;
  _leadOwner?: CrmEntityOwnerDto;
  _nextActivity?: ActivityDto
  notes?: NoteDto[]
  createdAt?: Date;
  updatedAt?: Date;
}

export enum CrmEntityStatusEnum {
  NONE = 'None',
  ATTEMPTED_TO_CONTACT = 'Attempted To Contact',
  CONTACT_IN_THE_FUTURE = 'Contact in the future',
  CONTACTED = 'Contacted',
  JUNK_LEAD = 'Junk Lead',
  LOST_LEAD = 'Lost Lead',
  NOT_CONTACTED = 'Not Contacted',
  PRE_QUALIFIED = 'Pre-qualified',
  NOT_QUALIFIED = 'Not Qualified',
}

export const LeadStatusList = EnumToArray(CrmEntityStatusEnum);

export const LeadSourceList = [
  'None',
  'Advertisement',
  'Cold Call',
  'Employee Refferal',
  'External Refferal',
  'Online status',
  'Sales Email',
  'Serminar',
  'Trade Show',
  'Chat',
];

export enum CrmEntityRatingEnum {
  NONE = 'None',
  ACQUIRED = 'Acquired',
  ACTIVE = 'Active',
  MARKET_FAILED = 'Market Failed',
  PROJECT_CANCELLED = 'Project Cancelled',
  SHUTDOWN = 'Shutdown',
}

export const LeadRatingList = EnumToArray(CrmEntityRatingEnum);
