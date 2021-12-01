import {
  LoginUserCommandHandler,
  RegisterUserCommandHandler, ResetPasswordCommandHandler,
  SendPasswordResetLinkCommandHandler, SendUserConfirmationEmailCommandHandler,
  SetAccountPasswordCommandHandler, VerifyUserCommandHandler
} from './commands';
import {
  AccountActivatedEventHandler, PasswordChangedEventHandler,
  UserAccountVerifiedEventHandler,
  UserRegisteredEventHandler
} from './event-handlers';
import { GetRolesListQueryHandler, GetUserFirstNameByIdQueryHandler, GetUsersQueryHandler } from './queries';
import { JwtStrategy } from './jwt.strategy';
import { AuthSaga } from './auth.saga';
import { AuthController, RolesController, UsersController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { BackendCommonModule, environment } from '@fom/backend/common';
import { BackendPersistenceModule } from '@fom/backend/persistence';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthFacadeService } from './auth-facade.service';
import { ChangeAccessStatusCommandHandler } from './commands/change-access-status.command';
import { ChangeUserRoleCommandHandler } from './commands/changeUserRoleCommand';
import { DeleteUserCommandHandler } from './commands/deleteUserCommand';
import { UpdateUserEmailCommandHandler } from './commands/update-user-email.command';
import { UpdateUserDisplayNameCommandHandler } from './commands/update-user-display-name.command';

const COMMAND_HANDLERS = [
  RegisterUserCommandHandler,
  VerifyUserCommandHandler,
  SendUserConfirmationEmailCommandHandler,
  SetAccountPasswordCommandHandler,
  LoginUserCommandHandler,
  SendPasswordResetLinkCommandHandler,
  ResetPasswordCommandHandler,
  ChangeAccessStatusCommandHandler,
  ChangeUserRoleCommandHandler,
  DeleteUserCommandHandler,
  UpdateUserEmailCommandHandler,
  UpdateUserDisplayNameCommandHandler
]

const EVENT_HANDLERS = [
  UserRegisteredEventHandler,
  UserAccountVerifiedEventHandler,
  AccountActivatedEventHandler,
  PasswordChangedEventHandler
]

const QUERY_HANDLERS = [
  GetUserFirstNameByIdQueryHandler,
  GetUsersQueryHandler,
  GetRolesListQueryHandler
]

const PROVIDERS = [
  JwtStrategy,
  AuthSaga,
  AuthFacadeService
]

const CONTROLLERS = [
  AuthController,
  RolesController,
  UsersController
]

@Module({
  imports: [
    CqrsModule,
    BackendCommonModule,
    BackendPersistenceModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: environment.authentication.secret,
      signOptions: {
        expiresIn: environment.authentication.jwtOptions.expiresIn
      }
    }),
  ],
  providers: [...PROVIDERS, ...COMMAND_HANDLERS, ...QUERY_HANDLERS, ...EVENT_HANDLERS],
  controllers: [...CONTROLLERS],
  exports:[PassportModule]
})
export class AuthModule {

}
