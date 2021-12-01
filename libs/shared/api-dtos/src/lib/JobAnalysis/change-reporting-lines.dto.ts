import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator'

export class ChangeReportingLinesDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string

  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  majorReportingLineId: string

  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  minorReportingLineId: string
}