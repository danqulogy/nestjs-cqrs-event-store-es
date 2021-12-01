import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MailerService } from '@nestjs-modules/mailer';
import { PasswordChangedEvent } from '@fom/backend/domain';
import { environment, FeLogger, SERVER_ENVIRONMENT } from '@fom/backend/common';
import { Inject } from '@nestjs/common';

@EventsHandler(PasswordChangedEvent)
export class PasswordChangedEventHandler implements IEventHandler<PasswordChangedEvent> {
  constructor(private console: FeLogger,
              private readonly mailerService: MailerService) {
    this.console.setContext(PasswordChangedEventHandler.name);
  }

  handle(event: PasswordChangedEvent): any {
    const { displayName, email } = event;
    this.mailerService.sendMail({
      to: `${displayName} <${email}>`,
      from: environment.mail.from,
      subject: 'Account updated',
      template: 'password-changed-ack',
      context: {
        name: displayName,
        link: `$/#/passport/login`,
        company: environment.company,
        email: email
      }
    })
      .then(success => {
        this.console.log(`Send Password changed acknowledgement`);
      })
      .catch(err => {
        //todo: Put on Queue to retry again
        console.log('An error occurred while sending changed acknowledgement', err);
      });
  }

}
