import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export * from './updateCompanyDetailsDto';

export class FiscalYearDto {
  @IsNotEmpty()
  _id?: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  @IsDateString()
  startDate?: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate?: Date;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}

export class AddFiscalYearDto {
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
