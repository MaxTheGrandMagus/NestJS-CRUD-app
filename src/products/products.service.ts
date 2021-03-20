/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto'
import { Product, ProductDocument } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
  }

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<Product> {
    const product = this.productModel.findById(id)
    if (!product) {
      // optional ↓
      // throw new HttpException(`Product #${id} not found`, HttpStatus.NOT_FOUND)
      throw new NotFoundException(`Product ${id} not found`)
    }
    return product
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}