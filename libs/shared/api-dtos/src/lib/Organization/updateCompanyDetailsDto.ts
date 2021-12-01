import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator'

export class UpdateCompanyDetailsDto {
  @IsNotEmpty()
  _id: string

  @IsNotEmpty()
  address: string

  @IsNotEmpty()
  city: string

  @IsNotEmpty()
  region: string

  @IsNotEmpty()
  country: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  phoneNumber: string

  @IsNotEmpty()
  @IsUrl()
  websiteUrl: string
}