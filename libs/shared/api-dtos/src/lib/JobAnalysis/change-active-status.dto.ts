import { IsMongoId, IsNotEmpty } from 'class-validator'

export class ChangeActiveStatusDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string
}