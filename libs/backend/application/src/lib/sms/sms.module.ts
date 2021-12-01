import { Module } from '@nestjs/common';
import { BackendPersistenceModule } from '@fom/backend/persistence';
import { CqrsModule } from '@nestjs/cqrs';
import { SendSmsCommandHandler } from './send-sms.command';
import { SmsController } from './sms.controller';
import { AuthModule } from '../auth/auth.module';
import { GetAllSmsMessagesQueryHandler } from './get-all-sms-messages.query';

const COMMAND_HANDLERS = [
  SendSmsCommandHandler,
];

const QUERY_HANDLERS = [GetAllSmsMessagesQueryHandler];

@Module({
  imports: [BackendPersistenceModule, AuthModule, CqrsModule],
  controllers: [SmsController],
  providers: [...COMMAND_HANDLERS, ...QUERY_HANDLERS],
})
export class SmsModule {}
