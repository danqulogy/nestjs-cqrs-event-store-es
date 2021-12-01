import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator'

export class RegisterUserDto{
  @IsNotEmpty({message: "User name is required"})
  name: string

  @IsNotEmpty({message: "User email is required"})
  email: string

  @IsNotEmpty()
  @IsMongoId({message: "Invalid assigned role"})
  roleId: string
}
