import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class SetAccountPasswordDto {

  @IsNotEmpty({ message: 'PasswordValue cannot be empty' })
  password: string // todo: allow only strong passwords
}
