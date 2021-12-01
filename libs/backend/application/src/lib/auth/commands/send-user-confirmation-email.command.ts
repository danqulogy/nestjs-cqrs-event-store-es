import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { MailerService } from '@nestjs-modules/mailer'
import { FeLogger, environment } from '@fom/backend/common';
import { UsersRepository } from '@fom/backend/persistence';
import { IUser } from '@fom/backend/domain';

export class SendUserConfirmationEmailCommand implements ICommand {
  constructor(public readonly savedUser: IUser) {

  }
}

@CommandHandler(SendUserConfirmationEmailCommand)
export class SendUserConfirmationEmailCommandHandler implements
  ICommandHandler<SendUserConfirmationEmailCommand>{
  constructor(private console:FeLogger,
              private usersRepository: UsersRepository,
              private readonly mailerService: MailerService) {
    this.console.setContext(SendUserConfirmationEmailCommandHandler.name)
  }

  async execute(command: SendUserConfirmationEmailCommand): Promise<any> {
    const {email,verifyToken, displayName, _id} = command.savedUser

    const user = await this.usersRepository.findActiveUserByEmail(email)

    console.log('user', user)

    /**
     * We could have use queueing here, but
     * Registering of users happens once in while
     * So this won't be a performance effect on day to day operations
     */
    this.mailerService.sendMail({
      to: `${displayName} <${email}>`,
      from: environment.mail.from,
      subject: 'Welcome to the BackOffice - Confirm your email',
      template: 'email-verification',
      context: {
        name: displayName,
        link: `/#/passport/verify/${user._id}`,
        company: environment.company,
        role: user._role.name
      }
    })
      .then(success => {
        this.console.log(`Sent user confirmation message to ${command.savedUser.email}`)
      })
      .catch(err => {
        //todo: Put on Queue to retry again
        console.log('An error occurred while sending user confirmation email',err)
      })

    return Promise.resolve(undefined);
  }
}
