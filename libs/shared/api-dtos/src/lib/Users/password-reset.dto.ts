import { IsMongoId, IsNotEmpty } from 'class-validator'

export class PasswordResetDto {
  @IsNotEmpty()
  @IsMongoId({message: 'Invalid request'})
  token: string

  @IsNotEmpty()
  password: string
}
