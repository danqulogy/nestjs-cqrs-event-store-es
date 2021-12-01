import { IsMongoId, IsNotEmpty } from 'class-validator'

export class ChangeActiveStatusDto {
  @IsNotEmpty({message: 'Department ID is required'})
  @IsMongoId({message: 'Department ID is invalid'})
  departmentId: string

}
