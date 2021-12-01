import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator'

export class EditDepartmentDto {
  @IsNotEmpty()
  @IsMongoId({message: 'Invalid department ID'})
  departmentId: string

  @IsNotEmpty()
  @IsOptional()
  code: string

  @IsNotEmpty()
  @IsOptional()
  name: string
}
