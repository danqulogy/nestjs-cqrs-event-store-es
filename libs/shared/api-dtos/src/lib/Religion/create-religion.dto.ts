import { IsNotEmpty, IsString } from 'class-validator'

export class CreateReligionDto {
  @IsNotEmpty()
  name: string
}

