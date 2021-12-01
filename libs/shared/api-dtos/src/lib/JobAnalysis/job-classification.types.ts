import { IsMongoId, isNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';
import { JobClassificationDto } from './add-job-classification.dto';

export type GradeClass = 'A'|'B'|'C'|'D'|'E'|'F'
export type GradeLevel = 1|2|3|4|5|6|7
export interface SalaryDto{
  lowerBound: number,
  upperBound: number
}

export class JobGradeDto{
  _id: string
  jobClassificationId: string
  level: number|GradeLevel
  salaryRange: SalaryDto
  probationalSalaryRange: SalaryDto
  _jobClassification?: JobClassificationDto
  _displayName?: string
}

export class AddJobGradeDto {

  @IsNotEmpty()
  @IsMongoId()
  jobClassificationId: string

  @IsNotEmpty()
  @IsNumber()
  level: number|GradeLevel

  @IsNotEmpty()
  @IsNumber(    {allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2},
    {message: 'Salary lower bound must be a number'})
  lowerBound: number

  @IsNotEmpty()
  @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2},
    {message: 'Salary upper bound must be a number'},)
  upperBound: number
}


export class AddProbationalSalaryDto{
  @IsNotEmpty()
  @IsMongoId()
  jobGradeId: string;

  @IsNotEmpty()
  @IsNumber(    {allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2},
    {message: 'Salary lower bound must be a number'})
  lowerBound: number

  @IsNotEmpty()
  @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2},
    {message: 'Salary upper bound must be a number'},)
  upperBound: number
}
