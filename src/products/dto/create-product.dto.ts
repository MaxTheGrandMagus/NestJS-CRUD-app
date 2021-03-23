/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'Price of the product' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly characteristics: string[];
}