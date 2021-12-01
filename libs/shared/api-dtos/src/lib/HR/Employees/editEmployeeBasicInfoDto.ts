import { IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import { Gender } from '../../Common';

// export {IEditEmployeeBasicInfoDto}

export class EditEmployeeBasicInfoDto {
  @IsMongoId()
  _id: string

  @IsNotEmpty({message: 'First name should not be empty'})
  firstName: string

  @IsOptional()
  middleName: string

  @IsNotEmpty()
  surname: string

  @IsNotEmpty()
  @IsEnum(Gender, {message: 'Gender must be one of "Male" or "Female"'})
  gender: string

  @IsDateString()
  @IsNotEmpty({message: 'Date of birth should not be empty'})
  dateOfBirth: string

  @IsNotEmpty()
  @IsPhoneNumber('GH')
  primaryPhoneNumber: string

  @IsNotEmpty()
  address: string

  @IsNotEmpty({message: 'Office email should be empty'})
  @IsEmail({}, {message: 'Office email is not a valid email address'})
  officeEmail: string

  @IsOptional()
  employeeId: string

  @IsNotEmpty({message: 'Date Joined should be empty'})
  @IsDateString({},{message: 'Date joined should a valid date'})
  dateJoined: string
}

