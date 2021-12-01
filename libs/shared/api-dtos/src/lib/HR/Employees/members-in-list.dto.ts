import { IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { JobClassificationDto, JobGradeDto } from '../../JobAnalysis';

export class AddResignationDto{
  @IsNotEmpty()
  @IsMongoId()
  employeeId: string

  @IsNotEmpty()
  reason: string

  @IsNotEmpty()
  resignationDate: Date
}

export class EducationDto {

  @IsMongoId()
  _id: string;

  @IsDateString()
  @IsOptional()
  completeDate: string;

  @IsNotEmpty()
  grade: string;

  @IsNotEmpty()
  honour: string;

  @IsNotEmpty()
  institution: string;

  @IsNotEmpty()
  program: string;

  @IsNotEmpty()
  startDate: string;

  @IsBoolean()
  isCurrent? = false
}

export class WorkExperienceDto {

  _id?: string

  @IsNotEmpty({message: 'Company name cannot be empty'})
  companyName: string

  @IsNotEmpty({message: 'Work location name is required'})
  location: string

  @IsNotEmpty({message: 'Job position held is required'})
  jobPosition: string

  @IsNotEmpty({message: 'Period started is required'})
  periodFrom: Date

  @IsNotEmpty({message: 'Period ended is required'})
  periodTo: Date


  isCurrentWorkExperience: boolean
  // Computed
  duration?: string
}

export class EmployeeChildDto {
  _id?: string
  name: string
  dateOfBirth: Date
}

export class UpdateEmployeeChildDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeChildId: string

  @IsNotEmpty()
  @IsMongoId()
  employeeId: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date
}

export class DeleteEmployeeChildDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeChildId: string

  @IsNotEmpty()
  @IsMongoId()
  employeeId: string
}

export interface SpouseInfoDto {
  name: string
  phoneNumber: string
  relationship: string
  homeAddress: string
}

export class AddSpouseDetailDto{
  @IsNotEmpty()
  @IsMongoId()
  employeeId: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  relationship: string

  @IsNotEmpty()
  phoneNumber: string

  @IsOptional()
  homeAddress: string
}

export class MemberPhoneDto{
  countryCode: string
  dialCode: string
  e164Number: string
  internationalNumber: string
  nationalNumber: string
}

export class MembersInListDto {
  _id: string
  firstName: string
  middleName: string
  surname: string
  gender: string
  dateOfBirth: string
  phone: string
  email: string
  fullName: string
}

export  interface IResignationDto{
  reason: string
  resignationDate: Date
}

export interface LineManagerDto{
  _id: string
  fullName: string
  fullNameForInitials?: string
  jobTitle: string
  departmentName: string
  departmentId: string
  jobPositionId: string
}

export interface EmployeeEmergencyContactDto {
  name: string
  relationship: string,
  phone1: string
  phone2: string
}

export interface JobStatusDto{
  _id?: string
  jobTitle?: string
  departmentId: string
  isHod: boolean
  departmentName?: string
  employmentType: string
  jobClassification: JobClassificationDto
  jobGrade: JobGradeDto
  majorLineManager?: LineManagerDto
  minorLineManager?: LineManagerDto
  probationEndDate?: string
  endDate?: Date
  jobPositionId: string
  payGrade: number
  effectiveDate: string
  activeStatus: boolean
  lastModifiedById: string
  salaryMisfitPayBand: boolean
  salaryUpgradePending: boolean
}

