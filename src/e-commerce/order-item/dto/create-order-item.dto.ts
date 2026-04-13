import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateOrderItemDto{
	@IsInt()
	@IsNotEmpty()
	@Type(()=> Number)
	productId:number;
	@IsInt()
	@IsNotEmpty()
	@Min(1)
	@Type(()=> Number)
	quantity:number;
}