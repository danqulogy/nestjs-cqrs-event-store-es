import { Controller, Get } from '@nestjs/common'

import { AppService } from './app.service'
import { MailerService } from '@nestjs-modules/mailer'
import { environment } from '@fom/backend/common'
import { SendGridService } from "@anchan828/nest-sendgrid";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly sendGrid: SendGridService,
              private readonly mailerService: MailerService) {}

  @Get('mail')
  async getData() {
    // await this.sendGrid.send({
    //   from: environment.mail.from,
    //   subject: "Sending with SendGrid is Fun",
    //   text: "and easy to do anywhere, even with Node.js",
    //   templateId: 'user-welcome',
    //   personalizations: [
    //     {
    //       to: [
    //         {
    //           email: "danquahwhite@gmail.com"
    //         }
    //       ],
    //       dynamicTemplateData: {
    //
    //       }
    //     }
    //   ]
    // });



    return  this.mailerService.sendMail({
      to: 'Danquah White <developer@maybert.org>',
      from: environment.mail.from,
      subject: 'Testing from nest',
      template: 'user-welcome',
      context: {
        company: environment.company,
        logo: environment.company.logo,
        name: 'Maxwell',
        role: 'Software Developer',
        email: 'maxwellofori@maybertgh.com',
        password: '',
        link: 'http://google.com',
        portal: 'apps.maybert.org'
      }
    });
      // .then(success => console.log(console.log('mail sent', success)))
      // .catch(err => console.log(err))

    console.log('mail sent');
  }
}
