/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //transforms a type to what we're expecting
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,  
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  const options = new DocumentBuilder()
    .setTitle('MaxON products')
    .setDescription('CRUD application')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
