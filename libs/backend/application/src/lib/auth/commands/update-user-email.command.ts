import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '@fom/backend/persistence';
import { NotFoundException } from '@nestjs/common';
import { User } from '@fom/backend/domain';

export class UpdateUserEmailCommand {
  constructor(public readonly employeeId: string,
              public readonly previousOfficeEmail: string,
              public readonly newOfficeEmail: string) {
  }

}

@CommandHandler(UpdateUserEmailCommand)
export class UpdateUserEmailCommandHandler implements ICommandHandler<UpdateUserEmailCommand>{
  constructor(private repository: UsersRepository) {
  }
  async execute(command: UpdateUserEmailCommand): Promise<any> {

    console.log('UpdateUserEmailCommandHandler',command)

    const exist = await this.repository.findUserByEmployeeId(command.employeeId)
    if(!exist){
      return;
    }


    const user = new User(exist, true)
    user.changeEmail(command.newOfficeEmail)
    await this.repository.persist(user, true)
  }

}

