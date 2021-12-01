import { IsDateString, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export * from './members-in-list.dto'
export * from './employee.dto'
export * from './register-member.dto'
export * from './editEmployeeBasicInfoDto'
export * from './job-type.enum'
export * from './IEmployeesApi'
export { EditAddtionalPersonalInfoDto } from './editAddtionalPersonalInfoDto';
export { UpdateEmergencyContactsDto } from './update-emergency-contacts.dto';

export class UpgradeEmployeeSalaryDto{
  @IsNotEmpty()
  employeeId: string

  @IsNotEmpty()
  currentSalaryAmount: number

  @IsNotEmpty()
  newSalaryAmount: number

  @IsNotEmpty()
  reason: string
}

export enum TrackerStatusEnum {
  NEW       = 'new',
  PENDING   = 'pending',
  APPROVED  = 'approved',
  DECLINED  = 'declined'
}

export class BirthdayPeopleDto{
  _id: string
  fullName: string
  fullNameForInitials: string
  departmentName: string
  departmentId: string
  dateOfBirth: any
  actualDate: Date
  birthdayToday?: boolean

}

export class AddEmployeeChildDto{
  @IsNotEmpty()
  @IsMongoId()
  employeeId: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date
}
