import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BadRequestException, Logger } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer'
import { environment, FeLogger } from '@fom/backend/common';
import { UsersRepository } from '@fom/backend/persistence';

export class SendPasswordResetLinkCommand implements ICommand{
  constructor(public readonly email: string) {

  }

}

@CommandHandler(SendPasswordResetLinkCommand)
export class SendPasswordResetLinkCommandHandler implements ICommandHandler<SendPasswordResetLinkCommand>{
  constructor(private usersRepository: UsersRepository,
              private console:FeLogger,
              private readonly mailerService: MailerService) {
    this.console.setContext(SendPasswordResetLinkCommandHandler.name)
  }
  async execute(command: SendPasswordResetLinkCommand): Promise<any> {
    Logger.log('Executing SendPasswordReset Link Command');
    const exist = await this.usersRepository.findActiveUserByEmail(command.email)
    if(!exist){
      throw new BadRequestException('Related user not found')
    }

    const {displayName, email, _role, _id} = exist


    this.mailerService.sendMail({
      to: `${displayName} <${email}>`,
      from: environment.mail.from,
      subject: 'Your password reset link',
      template: 'password-reset',
      context: {
        name: displayName,
        link: `/#/passport/reset/${_id}`,
        company: environment.company,
        email: email
      }
    })
      .then(success => {
        this.console.log(`Sent a password reset link to  ${email}`)
      })
      .catch(err => {
        //todo: Put on Queue to retry again
        console.log('An error occurred while sending user password reset link',err)
      })

    Logger.log('Executed SendPasswordReset Link Command');

    return Promise.resolve(undefined);
  }

}
