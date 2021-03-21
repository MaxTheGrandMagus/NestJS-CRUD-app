/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id)
    if (!product) {
      // optional ↓
      // throw new HttpException(`Product #${id} not found`, HttpStatus.NOT_FOUND)
      throw new NotFoundException(`Product ${id} not found`)
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto)
    return this.productRepository.save(newProduct)
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.preload({
      id: +id,
      ...updateProductDto
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
}