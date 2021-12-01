import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ReligionDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsBoolean()
  @IsOptional()
  active:boolean
}
