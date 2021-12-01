import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '../queries/get-users.query';
import { UsersRepository } from '@fom/backend/persistence';
import { ChangeAccessStatusDto, ChangeUserRoleDto, RegisterUserDto } from '@fom/shared/api-dtos';
import { RegisterUserCommand, SendUserConfirmationEmailCommand } from '../commands';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '@fom/backend/domain';
import { GetAuthUser } from '../get-authed-user.decorator';
import { ChangeAccessStatusCommand } from '../commands/change-access-status.command';
import { ChangeUserRoleCommand } from '../commands/changeUserRoleCommand';
import { DeleteUserCommand } from '../commands/deleteUserCommand';


@Controller({
  path: 'users'
})
export class UsersController {

  constructor(private queryBus: QueryBus,
              private repository: UsersRepository,
              private commandBus: CommandBus) {}


  @Post()
  async register(@Body() payload: RegisterUserDto){
    return this.commandBus.execute(new RegisterUserCommand(payload))
  }

  @Get()
  async getUsers(){
    return this.queryBus.execute(new GetUsersQuery())
  }

  @UseGuards(AuthGuard())
  @Post(':id/acl')
  async changeAccessStatus(@Param('id') id: string,
                           @Body() accessStatusDto: ChangeAccessStatusDto,
                           @GetAuthUser() admin: IUser){
    return this.commandBus.execute(new ChangeAccessStatusCommand(id, accessStatusDto, admin))
  }

  @UseGuards(AuthGuard())
  @Patch(':id/role')
  changeUserRole(@Param('id') id: string,
                 @Body() payload: ChangeUserRoleDto,
                 @GetAuthUser() admin: IUser){
    return this.commandBus.execute(new ChangeUserRoleCommand(payload, admin))
  }

  @UseGuards(AuthGuard())
  @Post(':id/resend-verification')
  async resendUserVerificationEmail(@Param('id') id: string,
                              @GetAuthUser() admin: IUser){
    const user = await this.repository.findUserById(id)
    if(!user){
      throw new BadRequestException('User not found')
    }

    if(!user.active){
      throw new BadRequestException('User account has been deactivated')
    }

    return this.commandBus.execute(new SendUserConfirmationEmailCommand(user))
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteUser(@Param('id') id: string,
                   @GetAuthUser() actor: IUser){
      return this.commandBus.execute(new DeleteUserCommand(id, actor))
  }
}
