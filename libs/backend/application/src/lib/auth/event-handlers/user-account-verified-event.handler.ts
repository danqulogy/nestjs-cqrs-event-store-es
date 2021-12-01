import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MailerService } from '@nestjs-modules/mailer';
import { UserAccountVerifiedEvent } from '@fom/backend/domain';
import { FeLogger,  environment } from '@fom/backend/common';
import { UsersRepository } from '@fom/backend/persistence';


@EventsHandler(UserAccountVerifiedEvent)
export class UserAccountVerifiedEventHandler implements IEventHandler<UserAccountVerifiedEvent> {
  constructor(private readonly console: FeLogger,
              private userRepository: UsersRepository,
              private readonly mailerService: MailerService) {
    this.console.setContext(UserAccountVerifiedEventHandler.name);
  }

  async handle(event: UserAccountVerifiedEvent): Promise<any> {

    const { name, email } = event.user;

    const user = await this.userRepository.findActiveUserByEmail(email.value);

    this.mailerService.sendMail({
      to: `${name} <${email.value}>`,
      from: environment.mail.from,
      subject: 'Activate your FOM Account',
      template: 'set-password',
      context: {
        name: name,
        email: email.value,
        company: environment.company
      }
    })
      .then(success => {
        this.console.log(`Sending user account info to ${event.user.email.value}`);
      })
      .catch(err => {
        //todo: Put on Queue to retry again
        console.log('An error occurred while sending user complete account with password email', err);
      });
  }

}
