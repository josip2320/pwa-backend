import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { sessionConfig } from './configs/session.config';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT || 4000, () => {
    console.log(`App is runing at port ${process.env.port}`);
  });
}
bootstrap();
