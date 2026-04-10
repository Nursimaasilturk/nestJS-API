import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
	@IsNotEmpty()
	name:string;

	@Min(1)
	price:number;

	@Min(0)
	stock:number;
	
	@IsNotEmpty()
	category:string
}