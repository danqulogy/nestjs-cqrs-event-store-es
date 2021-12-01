import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator'

export interface DescriptionContentLineItemDto {
  _id?: string
  content: string
}
export class UpdateJobResponsibilitiesDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string

  @IsArray()
  @IsNotEmpty({ each: true })
  responsibilities: DescriptionContentLineItemDto[]
}


export class UpdateJobSpecificationsDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string

  @IsArray()
  @IsNotEmpty({ each: true })
  specifications: DescriptionContentLineItemDto[]
}
