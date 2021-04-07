/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Characteristics } from './entities/characteristics.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from './../events/entities/event.entity';

import { ConfigService, ConfigType } from '@nestjs/config';
import productsConfig from './config/products.config';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Characteristics) private readonly characteristicsRepository: Repository<Characteristics>,
    private readonly connection: Connection,
    @Inject(productsConfig.KEY)
    private readonly productsConfiguration: ConfigType<typeof productsConfig>,
  ) {
    console.log(productsConfig);
  }


  async getAll(paginationQuery: PaginationQueryDto): Promise<Product[]> {
    const { limit, offset } = paginationQuery;
    return this.productRepository.find({
      relations: ['characteristics'],
      skip: offset,
      take: limit
    });
  }


  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id, { relations: ['characteristics'] })
    if (!product) {
      // optional ↓
      // throw new HttpException(`Product #${id} not found`, HttpStatus.NOT_FOUND)
      throw new NotFoundException(`Product ${id} not found`)
    }
    return product;
  }


  async create(createProductDto: CreateProductDto): Promise<Product> {
    const characteristics = await Promise.all(
      createProductDto.characteristics.map(name => this.preloadCharacteristicsByName(name)),
    );

    const newProduct = this.productRepository.create({
      ...createProductDto,
      characteristics
    })
    return this.productRepository.save(newProduct)
  }


  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const characteristics = updateProductDto.characteristics && 
    (await Promise.all(
      updateProductDto.characteristics.map(name => this.preloadCharacteristicsByName(name)),
    ));

    const product = await this.productRepository.preload({
      id: +id,
      ...updateProductDto,
      characteristics
    })
    if(!product) {
      throw new NotFoundException(`Product ${id} not found`)
    }
    return this.productRepository.save(product)
  }


  async remove(id: string): Promise<Product> {
    const product = await this.getById(id)
    return this.productRepository.remove(product)
  }


  async recommendProduct(product: Product) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      product.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_product';
      recommendEvent.type = 'product';
      recommendEvent.payload = { productId: product.id };

      await queryRunner.manager.save(product);
      await queryRunner.manager.save(recommendEvent)

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }


  private async preloadCharacteristicsByName(name: string): Promise<Characteristics> {
    const existingCharacteristics = await this.characteristicsRepository.findOne({ name });
    if (existingCharacteristics) {
      return existingCharacteristics;
    }
    return this.characteristicsRepository.create({ name })
  }

}