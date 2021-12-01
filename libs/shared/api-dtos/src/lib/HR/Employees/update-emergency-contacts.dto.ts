import { IsMongoId, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateEmergencyContactsDto {

  @IsMongoId({message: 'Employee Id is invalid'})
  @IsNotEmpty({message: 'Employee Id is required'})
  employeeId: string

  @IsNotEmpty({message: 'Primary contact name is required'})
  primaryName: string

  @IsNotEmpty({message: 'Primary contact relationship is required'})
  primaryRelation: string

  @IsNotEmpty({message: 'Primary contact phone number 1 name is required'})
  @IsPhoneNumber('GH', {message: 'Primary contact phone number 1 is invalid'})
  primaryPhone1: string


  @IsOptional()
  primaryPhone2: string


  @IsOptional()
  secondaryName: string

  @IsOptional()
  secondaryRelation: string

  @IsOptional()
  secondaryPhone1: string

  @IsOptional()
  secondaryPhone2: string
}
