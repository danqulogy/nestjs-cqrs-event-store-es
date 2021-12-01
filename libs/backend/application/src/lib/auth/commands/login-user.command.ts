import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UnauthorizedException, Inject, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '@fom/backend/persistence';
import { AuthResponseDto, SystemUserRole } from '@fom/shared/api-dtos';
import { environment } from '@fom/backend/common';
import { User } from '@fom/backend/domain';
import { AuthFacadeService } from '../auth-facade.service';

export class LoginUserCommand implements ICommand {
  constructor(
    public email: string,
    public readonly plainPassword: string,
    public readonly hostname: string | string[]
  ) {}
}

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private userRepository: UsersRepository,
    private authFacade: AuthFacadeService,
    private jwtService: JwtService
  ) {}


  async execute(command: LoginUserCommand): Promise<AuthResponseDto> {
    const exist = await this.userRepository.findActiveUserByEmail(command.email);
    if (!exist) {
      throw new UnauthorizedException(
        `Unauthorized credentials. ${
          !environment.production ? 'Incorrect email' : 'Account not found'
        }`
      );
    }

    const user = new User(exist, true);

    Logger.debug({ description: 'User Domain Object', data: user }, LoginUserCommandHandler.name);

    if (!user.isVerified) {
      throw new UnauthorizedException(
        'Unverified account. Please check your mailbox to ' +
          'verify your account or contact your administrator.'
      );
    }
    Logger.log('User attempting to login is verified', LoginUserCommandHandler.name);

    if (!user.active) {
      throw new UnauthorizedException(
        'Your account has been deactivated. ' + 'Please contact your administrator.'
      );
    }
    Logger.log('User attempting to login is activated', LoginUserCommandHandler.name);

    if (!user.isRoleAccessible()) {
      throw new UnauthorizedException('Role access not allowed.');
    }
    Logger.log('User attempting to login has an active role', LoginUserCommandHandler.name);


    Logger.log(
      'User attempting to login passed client validation test',
      LoginUserCommandHandler.name
    );

    if (!user.password.matches(command.plainPassword)) {
      throw new UnauthorizedException(
        `Unauthorized credentials. ${!environment.production ? 'Incorrect password' : ''}\``
      );
    }
    Logger.log('User attempting to login has a valid password', LoginUserCommandHandler.name);

    const payload: JwtPayload = {
      name: user.name,
      email: user.email.value,
      role: user.role.name,
    };

    const accessToken = this.jwtService.sign(payload);

    const results =  { accessToken, user: this.authFacade.convertToUserDto(exist) };
    console.log('AUTH RESULTS', results)
    return  results
  }
}

export interface JwtPayload {
  name: string;
  email: string;
  role: string;
}
