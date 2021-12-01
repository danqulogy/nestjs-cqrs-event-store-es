import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '@fom/backend/persistence';
import { NotFoundException } from '@nestjs/common';
import { User } from '@fom/backend/domain';

export class UpdateUserDisplayNameCommand {
  constructor(public readonly employeeId: string,
              public readonly previousFirstName: string,
              public readonly newFirstName: string) {
  }

}

@CommandHandler(UpdateUserDisplayNameCommand)
export class UpdateUserDisplayNameCommandHandler implements ICommandHandler<UpdateUserDisplayNameCommand>{
  constructor(private repository: UsersRepository) {
  }
  async execute(command: UpdateUserDisplayNameCommand): Promise<any> {

    console.log('UpdateUserDisplayNameCommandHandler',command)

    const exist = await this.repository.findUserByEmployeeId(command.employeeId)
    if(!exist){
      return;
    }


    const user = new User(exist, true)
    user.changeDisplayName(command.newFirstName)
    await this.repository.persist(user, true)
  }

}

