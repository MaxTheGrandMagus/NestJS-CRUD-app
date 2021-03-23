/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Characteristics } from './entities/characteristics.entity';
import { Event } from './../events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Characteristics, Event])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {
}