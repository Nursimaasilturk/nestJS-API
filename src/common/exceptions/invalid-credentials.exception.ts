import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCredentialsException extends HttpException{
	constructor(){
		super({
			message:'Invalid credentials',
			errorCode:'INVALID_CREDENTIALS',		
		},HttpStatus.UNAUTHORIZED)
	}
}