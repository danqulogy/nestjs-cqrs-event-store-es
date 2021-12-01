import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator'

export class SetDepartmentHeadDto {
  @IsNotEmpty({ message: 'Department ID is required' })
  @IsMongoId({ message: 'Department ID is invalid' })
  departmentId: string

  @IsMongoId({ message: 'Employee ID is invalid' })
  @IsNotEmpty({ message: 'Selected employee ID is required' })
  employeeId: string

  @IsNotEmpty({message: 'Date officiated cannot be empty'})
  @IsDateString({},{message: 'Invalid date string'})
  dateOfficiated: string
}
