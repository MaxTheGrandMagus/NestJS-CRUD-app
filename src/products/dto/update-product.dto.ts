/* eslint-disable prettier/prettier */
// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

//duplicates and inherits sample class
export class UpdateProductDto extends PartialType(CreateProductDto) {}