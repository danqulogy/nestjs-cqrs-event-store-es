import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UsersRepository } from '@fom/backend/persistence'
import { IActionResult } from '@fom/shared/api-dtos';
import { User } from '@fom/backend/domain';

export class VerifyUserCommand implements ICommand {
  constructor(public readonly userId: string) {

  }

}

@CommandHandler(VerifyUserCommand)
export class VerifyUserCommandHandler implements ICommandHandler<VerifyUserCommand>{
  constructor(private userRepo: UsersRepository,
              private eventPublisher: EventPublisher) {
  }

  async execute(command: VerifyUserCommand): Promise<IActionResult> {
    const userId = command.userId

    const userEntity = await this.userRepo.findUserById(userId)

    if (!userEntity){
      // return error page -> not found
      return {
        status: '404',
        title: 'Invalid Token',
        subtitle1: 'Token not found.',
        subtitle2: 'For support, contact your administrator.'
      }
    }

    const user = this.eventPublisher.mergeObjectContext(new User(userEntity, true))


    // Already verified
    if(user.isVerified){

      return {
        status: 'success',
        title: 'Email already verified!',
        subtitle1: `You're all set, ${userEntity.email} is already verified.`,
        subtitle2: 'You should have received a mail containing a link to setup a password for your account. ' +
          '\n If you have not received such an email, kindly contact your administrator.'
      }

    }

    // // Unverified but link expired
    if(!user.isVerified && user.verifyExpires.isExpired){

      return {
        status: 'error',
        title: 'Expired token',
        subtitle1: `The verification link has been expired.`,
        subtitle2: 'Contact your Administrator to resend you a verification link.'
      }
    }


    // verify user
    user.verifyAccount()
    await this.userRepo.persist(user, true)
    user.commit()

    return {
      status: 'success',
      title: 'Your email has been Verified Successfully!!',
      subtitle1: 'Almost done. One last step to complete your account setup.',
      subtitle2: 'Check your mailbox for link to set up password for your account.'
    }
  }

}
