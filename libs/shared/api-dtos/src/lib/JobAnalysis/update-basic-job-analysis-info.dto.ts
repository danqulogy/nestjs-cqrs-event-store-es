import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBasicJobAnalysisInfoDto {
  @IsNotEmpty()
  @IsMongoId()
  _id: string

  @IsNotEmpty()
  jobTitle: string

  @IsOptional()
  jobSummary: string

  @IsNotEmpty()
  @IsMongoId()
  departmentId: string

  @IsNotEmpty()
  @IsBoolean()
  isHod: boolean

  @IsNotEmpty()
  @IsMongoId()
  jobClassificationId: string


  @IsNotEmpty()
  @IsMongoId()
  jobGradeId: string


  @IsNotEmpty()
  employmentType: string

  @IsOptional()
  educationalQualification: string

  @IsNotEmpty()
  allowsMultipleOccupants = false

  @IsNotEmpty()
  @IsMongoId()
  lastModifiedById: string
}
