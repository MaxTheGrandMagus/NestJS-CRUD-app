/* eslint-disable prettier/prettier */
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Redirect, Header, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {

  }
  
  // @Get()
  // @Redirect('https://google.com', 301)
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   res.status(201).end('Poka');
  //   return 'getAll';
  // }

  @Get()
  getAll(): string {
    return 'getAll';
  }

  @Get(':id')
  getOne(@Param('id') id: string): string {
    return 'getOne ' + id
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createProductDto: CreateProductDto) {
    return `Title: ${createProductDto.title} Price: ${createProductDto.price}`
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return 'Remove ' + id
  }

  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    return 'Update ' + id
  }
}
