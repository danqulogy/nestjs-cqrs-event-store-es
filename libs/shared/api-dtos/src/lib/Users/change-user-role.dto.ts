import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ChangeUserRoleDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  roleId: string;
}
