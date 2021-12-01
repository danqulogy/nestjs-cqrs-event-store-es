
import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import { ActivityPriorityEnum, CallPurposeEnum, CallResultEnum } from "./crm.dtos";
import { MembersInListDto } from './HR/Employees/members-in-list.dto';
import { LeadInListDto } from './Leads';



export class ActivityDto{
  _id?: string
  subject: string
  fromDate: Date
  toDate: Date
  priority?: ActivityPriorityEnum
  assignedById?: string
  employeeId: string
  reminderDate?: Date
  location?: string
  description?: string
  leadId?: string
  callPurpose?: CallPurposeEnum
  callResult?: CallResultEnum
  completed?: boolean
  _employee?: MembersInListDto
  _lead?: LeadInListDto
  _assignedBy?: MembersInListDto
  updatedAt:Date
  createdAt: Date
}

