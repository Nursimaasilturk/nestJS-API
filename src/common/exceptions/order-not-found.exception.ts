import { HttpException, HttpStatus } from "@nestjs/common";

export class OrderNotFoundException extends HttpException{
	constructor(){
		super({
			message:'Order not found',
			errorCode:'ORDER_NOT_FOUND',		
		},HttpStatus.NOT_FOUND)
	}
}