import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidPriceException extends HttpException{
	constructor(){
		super({
			message:'Price not be negative',
			errorCode:'INVALID_PRICE',		
		},HttpStatus.BAD_REQUEST)
	}
}