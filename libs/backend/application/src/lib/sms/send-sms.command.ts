import { RegisterMemberDto } from '@fom/shared/api-dtos';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { SchoolsRepository } from '@fom/backend/persistence';

export class SendSmsCommand {
  constructor(public readonly payload: RegisterMemberDto) {}

}

@CommandHandler(SendSmsCommand)
export class SendSmsCommandHandler implements ICommandHandler<SendSmsCommand>{
  constructor(private repository: SchoolsRepository) {
  }

  async execute(command: SendSmsCommand): Promise<any> {
  }

}
