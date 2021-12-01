import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterMemberDto, UpdateMemberInfoDto } from '@fom/shared/api-dtos';
import { GetAuthUser } from '../auth';
import { IUser } from '@fom/backend/domain';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SendSmsCommand } from './send-sms.command';
import { GetAllSmsMessagesQuery } from './get-all-sms-messages.query';

@Controller('sms')
export class SmsController {

  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  }

  @Get()
  @UseGuards(AuthGuard())
  getAll(){
    return this.queryBus.execute(new GetAllSmsMessagesQuery());
  }

  @Post()
  add(@Body() payload: RegisterMemberDto){
    return this.commandBus.execute(new SendSmsCommand(payload));
  }
}
