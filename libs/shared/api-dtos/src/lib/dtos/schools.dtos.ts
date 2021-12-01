import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export enum SchoolGenderType{
  BOYS_AND_GIRLS = 'Boys and Girls',
  BOYS = 'Boys',
  GIRLS = 'Girls'
}

export enum GhanaRegionsEnum {
  AHAFO = 'Ahafo',
  ASHANTI = 'Ashanti',
  BONO_EAST = 'Bono East',
  BRONG_AHAFO = 'Brong Ahafo',
  CENTRAL = 'Central',
  EASTERN = 'Eastern',
  GREATER_ACCRA = 'Greater Accra',
  NORTH_EAST = 'North East',
  NORTHERN = 'Northern',
  OTI = 'Oti',
  SAVANNAH = 'Savannah',
  UPPER_EAST = 'Upper East',
  UPPER_WEST = 'Upper West',
  WESTERN = 'Western',
  WESTERN_NORTH = 'Western North',
  VOLTA = 'Volta'
}

export enum SchoolEnrollmentStatus {
  NOT_ENROLLED = 'Not Enrolled',
  ENROLLED = 'Enrolled',
  PENDING = 'Pending'
}

export class HeadTeacherInfoDto{
  _id?: string
  name: string
  phoneNumber: string
  email: string
}

export class SchoolsInListDto{
  _id?: string
  name: string
  genderType: SchoolGenderType
  postalAddress: string
  enrollmentKey: string
  region: string | GhanaRegionsEnum
  town: string
  headTeacher: HeadTeacherInfoDto
  dispatched: boolean
  enrollmentStatus: SchoolEnrollmentStatus
}

export class AddSchoolDto {
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
