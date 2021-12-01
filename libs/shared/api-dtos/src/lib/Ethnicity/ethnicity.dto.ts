import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class EthnicityDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsBoolean()
  @IsOptional()
  active:boolean
}
