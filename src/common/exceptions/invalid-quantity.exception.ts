import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidQuantityException extends HttpException{
	constructor(){
		super({
			message:'Quantity must be greater than zero',
			errorCode:'INVALID_QUANTITY'
		},HttpStatus.BAD_REQUEST)
	}
}