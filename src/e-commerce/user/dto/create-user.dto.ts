import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto{
	@IsEmail({},{message:'Invalid email format'})
	@IsNotEmpty()
	@IsString()
	email:string;
	@MinLength(3,{
		message:'Name is too short. Minimal length is $constraint1 characters, but actual is $value'
	})
	@IsNotEmpty()
	@IsString()
	//Transform transformerı name değerindeki boşlukları siler. Name de '  ' bu değeri girdiğimizde bunun hata olarak gözükmesini sağlar.
	@Transform(({value})=> value.trim())
	name:string;
	@MinLength(8,{
		message:'Password is too short.Powerful password should be $constraint1 characters, but actual is $value'
	})
	@IsNotEmpty()
	@IsString()
	password:string;

}