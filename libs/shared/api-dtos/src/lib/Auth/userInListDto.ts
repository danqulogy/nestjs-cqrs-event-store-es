import { RoleDto } from './role.dto';
import { IsBoolean, IsEmail, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";



export class UserInListDto{
  @IsMongoId()
  _id?: string

  @IsBoolean()
  isVerified: boolean


  @IsBoolean()
  isActivated: boolean

  @IsBoolean()
  active: boolean

  @IsNotEmpty()
  name: string


  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsOptional()
  password?: string


  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  roleId?: string


  role: RoleDto

  createdAt: string
  updatedAt: string
}

export interface SimpleEmployeeInfoDto{
  fullName: string,
  fullNameForInitials: string
  jobTitle: string
  department: string
}

export class AddUserDto{
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsMongoId()
  roleId: string
}
