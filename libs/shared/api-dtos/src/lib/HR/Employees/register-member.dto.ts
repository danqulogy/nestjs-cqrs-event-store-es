import {
    IsDateString, IsDecimal,
    IsEmail,
    IsEnum, IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
} from 'class-validator'
import { Gender } from '../../Common';
import { JobType, JobTypeArrayString } from './job-type.enum';


export enum EmploymentStatus {
  NEW_HIRE = 'New Hire',
  PROBATION = 'Probation',
  REGULAR = 'Regular',
  EXIT = 'Exit'
}

export const EmploymentStatusArrayList = [
  EmploymentStatus.NEW_HIRE,
  EmploymentStatus.PROBATION,
  EmploymentStatus.REGULAR,
  EmploymentStatus.EXIT
]


export const EmploymentStatusArrayString = `
    ${EmploymentStatus.NEW_HIRE},
    ${EmploymentStatus.PROBATION},
    ${EmploymentStatus.REGULAR} and
    ${EmploymentStatus.EXIT}
`



export enum MaritalStatus {
  Single='Single',
  Married = 'Married',
  Divorced = 'Divorced',
  Widowed = 'Widowed'
}

const {Divorced, Married, Single, Widowed} = MaritalStatus
export const MaritalStatusString = `${Single}, ${Married}, ${Divorced} or ${Widowed}`
export const MaritalStatusesList: string[] = [
  Single, Married, Divorced, Widowed
]


export class UpdateMemberInfoDto {
  @IsNotEmpty()
  _id: string

  @IsNotEmpty({message: 'First name should not be empty'})
  firstName: string

  @IsNotEmpty()
  surname: string

  @IsNotEmpty()
  @IsEnum(['Male', 'Female'], {message: 'Gender must be one of "Male" or "Female"'})
  gender: string

  @IsDateString()
  @IsOptional({message: 'Date of birth should not be empty'})
  dateOfBirth: string

  @IsNotEmpty({message: 'Phone number is required'})
  phone: string

  @IsOptional()
  @IsEmail()
  email: string
}

export class RegisterMemberDto {
    @IsNotEmpty({message: 'First name should not be empty'})
    firstName: string

    @IsNotEmpty()
    surname: string

    @IsNotEmpty()
    @IsEnum(['Male', 'Female'], {message: 'Gender must be one of "Male" or "Female"'})
    gender: string

    @IsDateString()
    @IsOptional({message: 'Date of birth should not be empty'})
    dateOfBirth: string

    @IsNotEmpty({message: 'Phone number is required'})
    @IsPhoneNumber()
    phone: string

    @IsOptional()
    email: string
}
