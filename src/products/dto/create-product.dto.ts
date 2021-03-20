/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
  readonly title: string

  @IsNumber()
  readonly price: number
}