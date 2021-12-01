import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@fom/backend/persistence';
import { FeLogger } from '@fom/backend/common';
import { User } from '@fom/backend/domain';

export class ActivateUserAccountCommand implements ICommand {
  constructor(public readonly userId: string, public readonly password: string) {}
}

@CommandHandler(ActivateUserAccountCommand)
export class SetAccountPasswordCommandHandler
  implements ICommandHandler<ActivateUserAccountCommand> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private console: FeLogger,
    private eventPublisher: EventPublisher
  ) {
    this.console.setContext(SetAccountPasswordCommandHandler.name);
  }

  async execute(command: ActivateUserAccountCommand): Promise<any> {
    const exist = await this.usersRepository.findUserById(command.userId);
    if (!exist) {
      throw new NotFoundException('Account not found');
    }

    const user = this.eventPublisher.mergeObjectContext(new User(exist, true));

    if (user.isPasswordSet()) {
      throw new BadRequestException("This account's password has already been set. ");
    }

    user.activateAccount(command.password);
    await this.usersRepository.persist(user, true);
    this.console.log(`Activated ${user.name} users account. Password set`);
    user.commit();

    return Promise.resolve(undefined);
  }
}
