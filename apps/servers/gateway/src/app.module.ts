import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SERVER_ENVIRONMENT, environment } from '@fom/backend/common';
import { MulterModule } from '@nestjs/platform-express';
import { BackendApplicationModule } from '@fom/backend/application';
import { ScheduleModule } from '@nestjs/schedule';
import { SendGridModule } from '@anchan828/nest-sendgrid';

/**
 * Todo: CreateIndex() during off-peak hours
 * If you make updates to your indexes, you will need to run the createIndex()
 * operation; however we recommend doing this during off-peak hours when your
 * database isn't been hitting with tons of requests/second.
 * check http://mongoosejs.com/docs/api.html#model_Model.ensureIndexes
 */

@Module({
  imports: [
    MulterModule.register({
      dest: './avatars2',
    }),
    MongooseModule.forRoot(environment.mongodbUrl, {
    }),
    MongooseModule.forRoot(environment.readsMongodbUrl, {
      connectionName: 'reads',
    }),
    SendGridModule.forRoot({
      apikey: environment.sendGrid.apiKey,
    }),
    MailerModule.forRoot({
      transport: {
        host: environment.ses.host,
        port: environment.ses.port,
        secure: false,
        auth: {
          user: environment.ses.smtpUserName,
          pass: environment.ses.smtpPassword,
        },
      },
      defaults: {
        from: '"Moe Food Inventory Management" <ministerofeducationdevelopment@gmail.com>',
        priority: 'high',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(undefined, {
          inlineCssEnabled: true,
          inlineCssOptions:{
            url: 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css',
            preserveMediaQueries: true,
          }
        }),
        options: {
          strict: true,
        },
      },
    }),
    BackendApplicationModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: SERVER_ENVIRONMENT,
      useValue: environment,
    },
  ],
})
export class AppModule {
  constructor() {
  }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(PagerMiddleware)
  //     .forRoutes('activity-logs')
  // }
}
