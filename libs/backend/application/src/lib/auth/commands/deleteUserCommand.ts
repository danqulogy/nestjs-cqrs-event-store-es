import { IUser, User } from '@fom/backend/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '@fom/backend/persistence';
import { BadRequestException } from '@nestjs/common';
import { SystemUserRole } from '@fom/shared/api-dtos';

export class DeleteUserCommand {
  constructor(public readonly id: string, public readonly actor: IUser) {

  }

}

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand>{
  constructor(private readonly repository: UsersRepository){

  }

  async execute(command: DeleteUserCommand): Promise<any> {
    const exist = await this.repository.findUserById(command.id)
    if(!exist){
      throw new BadRequestException('User not found')
    }

    if((exist._role.name.includes(SystemUserRole.ADMINISTRATOR)
      || exist._role.name.includes(SystemUserRole.HEADMASTER))
    ) {
      throw new BadRequestException(`Request Denied. Cannot delete a super user!`)
    }


    if((!command.actor._role.name.includes(SystemUserRole.ADMINISTRATOR)
      && !command.actor._role.name.includes(SystemUserRole.HEADMASTER))
    ) {
      // console.log(command.admin._role.name, SystemUserRole.ADMINISTRATOR)
      throw new BadRequestException('Request not allowed. Administrative rights required')
    }


    await this.repository.delete(exist._id)
  }

}
