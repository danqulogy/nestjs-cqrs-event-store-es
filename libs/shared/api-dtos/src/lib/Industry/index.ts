import { IsNotEmpty, IsString } from 'class-validator'

export class CreateIndustryDto {
  @IsNotEmpty()
  name: string
}


export class IndustryDto{
  _id: string
  name: string
}
