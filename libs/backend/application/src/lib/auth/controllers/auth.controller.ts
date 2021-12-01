import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GetUserFirstNameByIdQuery } from '../queries/get-user-first-name-by-id.query'
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { ResetPasswordCommand } from '../commands/reset-password.command'
import {
  ActivateUserAccountCommand,
  LoginUserCommand,
  SendPasswordResetLinkCommand,
  VerifyUserCommand
} from '../commands';
import {
  AuthCredentialDto,
  IActionResult,
  ModelIdParamDto, PasswordResetDto,
  PasswordResetRequestDto,
  SetAccountPasswordDto
} from '@fom/shared/api-dtos';
import { GetAuthUser } from '../get-authed-user.decorator';
import { IUser } from '@fom/backend/domain';


@Controller('auth')
export class AuthController {

  constructor(private commandBus: CommandBus,
              private queryBus: QueryBus) {
  }

  @Post('/verify/:id')
  async verifyUserAccount(@Param('id') userId: string): Promise<IActionResult>{
    return this.commandBus.execute(new VerifyUserCommand(userId))
  }

  @Get('/user/:id')
  async GetUserUnderVerification(@Param() param: ModelIdParamDto,  ){
    return this.queryBus.execute(new GetUserFirstNameByIdQuery(param.id))
  }

  @Post('/activate/:id')
  async activateAccount(@Param('id') userId: string, @Body() payload: SetAccountPasswordDto){
    return this.commandBus.execute(new ActivateUserAccountCommand(userId, payload.password))
  }

  @Post('login')
  async login(@Body() payload: AuthCredentialDto, @Req() request: Request){
    return this.commandBus.execute(new LoginUserCommand(payload.email, payload.password, request.headers.referer))
  }

  @Post('password-reset/request')
  OnPasswordResetRequest(@Body() passwordRequestDto: PasswordResetRequestDto){
    return this.commandBus.execute(new SendPasswordResetLinkCommand(passwordRequestDto.email))
  }

  @Post('password-reset')
  resetPassword(@Body() dto: PasswordResetDto){
    return this.commandBus.execute(new ResetPasswordCommand(dto.token, dto.password))
  }


  @Post('test')
  @UseGuards(AuthGuard())
  test(@GetAuthUser() user){
    console.log('request', user as IUser)
  }
  changePassword(){}


}
