import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "src/e-commerce/order-item/dto/create-order-item.dto";

export class CreateOrderDto{
	@IsInt()
	@IsNotEmpty()
	@Type(()=> Number)
	userId:number;
	@IsArray()
	// iç içe her itemın validate edilmesini sağlar.
	@ValidateNested({each:true})
	@ArrayMinSize(1)
	@Type(()=> CreateOrderItemDto)
	items: CreateOrderItemDto[];
}