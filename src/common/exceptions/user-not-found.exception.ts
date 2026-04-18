import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException{
	constructor(){
		super({
			message:'User not found',
			errorCode:'USER_NOT_FOUND',		
		},HttpStatus.NOT_FOUND)
	}
}