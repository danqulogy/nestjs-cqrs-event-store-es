import { IsMongoId, IsNumber } from 'class-validator'

export class SalaryRangeDto {
  @IsNumber()
  lowerBound: number
  @IsMongoId()
  upperBound: number
}
