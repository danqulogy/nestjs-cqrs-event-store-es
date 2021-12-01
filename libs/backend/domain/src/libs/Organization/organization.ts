import { AggregateRoot } from '@nestjs/cqrs'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsUrl } from 'class-validator'
import { Email, ModelId } from '../Common/values';
import { IOrganization } from './IOrganization';



export class Organization extends AggregateRoot{
  id: ModelId

  @IsNotEmpty()
  name: string

  @IsUrl()
  websiteUrl: string

  @IsNotEmpty()
  address: string

  @IsNotEmpty()
  city: string

  @IsNotEmpty()
  region: string

  @IsNotEmpty()
  country: string

  email: Email

  @IsNotEmpty()
  phoneNumber: string

  constructor(data: IOrganization, isExisting: boolean) {
    super()
    this.name = data.name
    this.websiteUrl = data.websiteUrl
    this.address = data.address
    this.city = data.city
    this.region = data.region
    this.country = data.country
    this.email = new Email(data.email)
    this.phoneNumber = data.phoneNumber

    if(isExisting){
      this.id = ModelId.create(data._id)
    }
  }
}
