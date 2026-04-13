import { Transform, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, min, MinLength } from "class-validator";

export class CreateProductDto{
	@IsString()
	@IsNotEmpty()
	@MinLength(3,{message:'Too short!'})
	@Transform(({value})=>{value.trim()})
	name:string;
	@IsOptional()
	@IsString()
	description?:string;
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	// gelen veriyi numbera çevirir.
	@Type(()=> Number)
	price:number;
	@IsInt()
	@IsNotEmpty()
	@Min(0)
	@Type(()=> Number)
	stock:number;
	@IsNumber()
	@IsNotEmpty()
	@Type(()=> Number)
	userId:number;
}