import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { environment, FeLogger } from '@fom/backend/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersRepository } from '@fom/backend/persistence';
import { AccountActivatedEvent } from '@fom/backend/domain';

@EventsHandler(AccountActivatedEvent)
export class AccountActivatedEventHandler implements IEventHandler<AccountActivatedEvent> {
  constructor(private console: FeLogger,
              private usersRepository: UsersRepository,
              private readonly mailerService: MailerService) {
    this.console.setContext(AccountActivatedEventHandler.name);
  }

  handle(event: AccountActivatedEvent): any {

    const { email, displayName,  hiddenPassword } = event;

    this.mailerService.sendMail({
      to: `${displayName} <${email}>`,
      from: environment.mail.from,
      subject: 'Your account has been activated',
      template: 'account-activated-ack',
      context: {
        name: displayName,
        email: email,
        link: `/#/passport/login`,
        company: environment.company,
        password: hiddenPassword
      }
    })
      .then(success => {
        this.console.log(`Sent user account activated acknowledgement to ${email}`);
      })
      .catch(err => {
        //todo: Put on Queue to retry again
        console.log('An error occurred while sending user account activated ack email', err);
      });
  }

}
