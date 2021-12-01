import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { environment } from '@fom/backend/common';
import {
  GlobalFallbackFilter,
  HttpExceptionFilter,
  ValidationException,
  ValidationFilter,
} from '@fom/backend/common';

import {connectToEventStore} from '@fom/backend/application'

environment.production ? mongoose.set('autoIndex', false) : mongoose.set('autoIndex', true);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // await connectToEventStore()

  app.useStaticAssets(join(__dirname, 'public'));
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');

  app.enableCors();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   })
  // );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => `${Object.values(error.constraints).join(',')}`);
        return new ValidationException(messages);
      },
    })
  );

  app.useGlobalFilters(
    new GlobalFallbackFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  );

  const port = process.env.port || environment.production ? 3334 : 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap().then((r) =>
  console.log(
    `Application started in ${environment.production ? 'production' : 'development'} environment`
  )
);
