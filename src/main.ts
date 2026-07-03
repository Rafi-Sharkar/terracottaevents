import 'reflect-metadata';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { ENVEnum } from './common/enum/env.enum';
import { AllExceptionsFilter } from './core/filter/http-exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const configService = app.get(ConfigService);
  //  --------------- using logger --------------
  const logger = new Logger();

  // * -------------------- enable cors -----------------------------
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // *  ----------------- add global pipes ----------------------
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // *  ------------------ add global filters error handler ------------------------
  app.useGlobalFilters(new AllExceptionsFilter());

  // * ---------------- configure Swagger config with Bearer Auth ---------------------------
  const config = new DocumentBuilder()
    .setTitle('Backend API Documentation - NestJS')
    .setDescription('The API description')
    .setVersion('3.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // * -------------------- add body parser -----------------------------
  app.use('/stripe-webhook', bodyParser.raw({ type: 'application/json' }));
  app.use(cookieParser());
  // * -------------------- set port -----------------------------
  const port = parseInt(configService.get<string>(ENVEnum.PORT) ?? '4000', 10);
  //  --------------- using logger --------------

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}/docs`);
}
bootstrap();
