import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { BadRequestException } from '@nestjs/common'
import { UsersRepository } from '@fom/backend/persistence';
import { User } from '@fom/backend/domain';

export class ResetPasswordCommand {
  constructor(public readonly token: string,
              public readonly password: string) {}
}

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler implements ICommandHandler<ResetPasswordCommand>{
  constructor(private usersRepository: UsersRepository,
              private publisher: EventPublisher) {
  }
  async execute(command: ResetPasswordCommand): Promise<any> {
    const exist = await this.usersRepository.findActiveUserById(command.token)
    if(!exist){
      throw new BadRequestException('Account not found')
    }

    const user = this.publisher.mergeObjectContext(new User(exist, true))
    user.changePassword(command.password)
    await this.usersRepository.persist(user, true)
    user.commit()

    return Promise.resolve(undefined);
  }

}
