/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Characteristics } from './entities/characteristics.entity';
import { Event } from './../events/entities/event.entity';

import { ConfigModule } from '@nestjs/config';
import productsConfig from "./config/products.config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Characteristics, Event]), 
    ConfigModule.forFeature(productsConfig)
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}