import { IsNumber } from 'class-validator';

export class PaginateQueryParamDto {
  @IsNumber()
  limit: number;

  @IsNumber()
  skip: number;
}
