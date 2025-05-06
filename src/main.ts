import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import { AllExceptionsFilterFilter } from './common/fitlers/all-exceptions-filter.filter';
import { ValidationPipe } from '@nestjs/common';
import { corsConfig } from './config/cors.config';
import { validationConfig } from './config/validation.config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(corsConfig);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilterFilter());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
