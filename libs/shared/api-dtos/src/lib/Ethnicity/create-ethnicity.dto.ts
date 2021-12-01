import { IsNotEmpty, IsString } from 'class-validator'

export class CreateEthnicityDto {
  @IsNotEmpty()
  name: string
}

