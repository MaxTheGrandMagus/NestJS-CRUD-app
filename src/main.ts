/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //transforms a type to what we're expecting
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,  
    })
  );
  await app.listen(3000);
}
bootstrap();
