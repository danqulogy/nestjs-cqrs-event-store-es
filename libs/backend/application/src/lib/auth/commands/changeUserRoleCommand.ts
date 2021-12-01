import { ChangeUserRoleDto, SystemUserRole } from '@fom/shared/api-dtos';
import { IUser, User } from '@fom/backend/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RolesRepository, UsersRepository } from '@fom/backend/persistence';
import { BadRequestException } from '@nestjs/common';

export class ChangeUserRoleCommand {
  constructor(public readonly payload: ChangeUserRoleDto, public readonly admin: IUser) {

  }

}

@CommandHandler(ChangeUserRoleCommand)
export class ChangeUserRoleCommandHandler implements ICommandHandler<ChangeUserRoleCommand>{
  constructor(private readonly repository: UsersRepository,
              private readonly rolesRepository: RolesRepository){

  }
  async execute(command: ChangeUserRoleCommand): Promise<any> {
    const exist = await this.repository.findUserById(command.payload.userId)
    if(!exist){
      throw new BadRequestException('User not found')
    }

    if(!exist.active){
      throw new BadRequestException('Request denied! User has been blocked.')
    }

    if((exist._role.name.includes(SystemUserRole.ADMINISTRATOR)
      || exist._role.name.includes(SystemUserRole.HEADMASTER))
    ) {
      throw new BadRequestException(`Request Denied. Cannot change ${exist._role.name} role!`)
    }

    const roleExist = await this.rolesRepository.findById(command.payload.roleId)
    if(!roleExist){
      throw new BadRequestException('Selected role not found')
    }

    if(!roleExist.active){
      throw new BadRequestException('Selected role have been deactivated.')
    }
// console.log('admin',)
    if((!command.admin._role.name.includes(SystemUserRole.ADMINISTRATOR)
      && !command.admin._role.name.includes(SystemUserRole.HEADMASTER))
    ) {
      // console.log(command.admin._role.name, SystemUserRole.ADMINISTRATOR)
      throw new BadRequestException('Request not allowed. Administrative rights required')
    }

    const user = new User(exist, true)
    user.changeRole(command.payload.roleId)

    await this.repository.persist(user, true)

  }
}
