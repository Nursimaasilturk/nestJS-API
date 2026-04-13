import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto{
	@IsString()
	@IsNotEmpty()
	@IsEmail({},{message:'Invalid email format!'})
	email:string;
	@IsString()
	@IsNotEmpty()
	password:string;
}