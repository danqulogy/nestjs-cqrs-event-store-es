import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateDepartmentDto {
  @IsNotEmpty()
  code: string

  @IsNotEmpty()
  name: string
}
