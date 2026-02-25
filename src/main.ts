import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from '@core/interceptors/response/response.interceptor';
import { GlobalExceptionFilter } from '@core/filters/global-exception/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,Cookie',
  });

  app.use(json());
  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.log('Application faild to start', err);
  process.exit(1);
});
