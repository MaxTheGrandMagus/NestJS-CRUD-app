/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string;

	@Column()
	price: number;

	@Column("json", { nullable: true })
	characteristics: string[]
}