import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty, IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { DescriptionContentLineItemDto } from './update-job-responsibilities.dto';

export class AddJobAnalysisDto {
  @IsString({message: 'Job Title must be a string'})
  jobTitle: string

  @IsOptional()
  @IsString({message: 'Job Summary must be a string'})
  jobSummary: string

  @IsString()
  @IsNotEmpty()
  @IsMongoId({message: 'Invalid department id'})
  departmentId: string

  @IsNotEmpty()
  @IsBoolean()
  isHod: boolean

  @IsString()
  @IsNotEmpty()
  @IsMongoId({message: 'Invalid job classification id'})
  jobClassificationId: string

  @IsString()
  @IsNotEmpty()
  @IsMongoId({message: 'Invalid job grade id'})
  jobGradeId: string

  @IsString()
  @IsNotEmpty()
  employmentType: string

  @IsString()
  @IsOptional()
  educationalQualification: string

  @IsNotEmpty({each: true})
  @IsArray()
  jobSpecifications: DescriptionContentLineItemDto[]

  @IsNotEmpty({each: true})
  coreResponsibilities: DescriptionContentLineItemDto[]

  // @IsNotEmpty()
  // @IsNumber(    {allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2},
  //   {message: 'Salary lower bound must be a number'})
  // salaryLowerBound: number
  //
  // @IsNotEmpty()
  // @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2},
  //   {message: 'Salary upper bound must be a number'},)
  // salaryUpperBound: number

  @IsOptional()
  @IsMongoId({message: 'Major reporting ID is not valid'})
  majorReportingLine: string

  @IsOptional()
  @IsMongoId({message: 'Minor reporting ID is not valid'})
  minorReportingLine: string

  @IsBoolean()
  allowsMultipleOccupants: boolean
}

