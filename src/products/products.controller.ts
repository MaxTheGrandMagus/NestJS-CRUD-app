/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Header, Query, Redirect, Req, Res, } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { PaginationQueryDto } from './../common/dto/pagination-query.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}
  
  // @Get()
  // @Redirect('https://google.com ', 301)
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   res.status(201).end('Poka');
  //   return 'getAll';
  // }

  @Get()
  getAll(@Query() paginationQuery: PaginationQueryDto): Promise<Product[]> {
    return this.productsService.getAll(paginationQuery);
  }


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
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsService.update(id, updateProductDto)
  }
  
}
