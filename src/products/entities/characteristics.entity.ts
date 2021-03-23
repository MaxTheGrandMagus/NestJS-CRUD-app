/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Characteristics {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(
    type => Product, 
    product => product.characteristics
  )
  products: Product[];
}