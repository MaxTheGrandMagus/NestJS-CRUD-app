/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Characteristics } from './characteristics.entity';

@Entity() //sql table === 'product'
export class Product {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
  title: string;
  
  @Column({ nullable: true }) //for testing migrations
  description: string;

	@Column()
  price: number;
  
  @Column({ default: 0 })
  recommendations: number;
	
	@JoinTable()
	@ManyToMany(
		type => Characteristics, 
		characteristics => characteristics.products,
		{ 
			cascade: true, // ['insert']
		}
	)
	characteristics: Characteristics[]
}