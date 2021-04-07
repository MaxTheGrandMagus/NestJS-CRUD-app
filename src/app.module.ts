/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProductRatingModule } from './product-rating/product-rating.module';

import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
// import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig]
      // envFilePath: '.environment',
      // ignoreEnvFile: true
      // optional ↑

      // validationSchema: Joi.object({
      //   DATABASE_HOST: Joi.required(),
      //   DATABASE_PORT: Joi.number().default(5432),
      // }),
      // validation ↑
    }),
    ProductsModule, 
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true
        // disable synchronize when u r on production ↑
      })
    }), 
    ProductRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
