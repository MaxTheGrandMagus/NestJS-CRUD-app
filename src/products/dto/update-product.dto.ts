/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

//duplicates and inherits sample class
export class UpdateProductDto extends PartialType(CreateProductDto) {}