import { IsBoolean } from 'class-validator';

export class ChangeAccessStatusDto {
  @IsBoolean()
  status: boolean
}

