import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsException extends HttpException{
	constructor(){
		super({
			message:'User already exists',
			errorCode:'USER_ALREADY_EXISTS',		
		},HttpStatus.CONFLICT)
	}
}