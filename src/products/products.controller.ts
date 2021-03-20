/* eslint-disable prettier/prettier */
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Redirect, Header, Req, Res, Query } from '@nestjs/common';
import { Response, Request } from 'express';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {
  }
  
  // @Get()
  // @Redirect('https://google.com ', 301)
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   res.status(201).end('Poka');
  //   return 'getAll';
  // }

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  // @Get()
  // findAll(@Query() paginationQuery) {
  //   const { limit, offset } = paginationQuery;
  //   return `This action returns all products. Limit: ${limit}, offset: ${offset}`;
  // }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto)
  }
  
  @Delete(':id')
  remove (@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id)
  }

  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
    return this.productsService.update(id, updateProductDto)
  }
}
