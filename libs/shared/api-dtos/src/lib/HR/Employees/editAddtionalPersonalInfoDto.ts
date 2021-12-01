import { IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber } from 'class-validator';

export class EditAddtionalPersonalInfoDto  {

  @IsNotEmpty()
  hometown: string;

  @IsNotEmpty()
  maritalStatus: string;

  @IsNotEmpty()
  nationality: string;

  @IsOptional()
  @IsNumber()
  numberOfChildren = 0;

  @IsOptional()
  @IsEmail({}, {message: 'Private email is not a valid email address'})
  privateEmail: string;

  @IsNotEmpty()
  religion: string;

  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber('GH')
  secondaryPhoneNumber: string;

  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsOptional()
  mothersName: string

  @IsOptional()
  fathersName: string
}
