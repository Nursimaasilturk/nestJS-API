import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidStockException extends HttpException{
	constructor(){
		super({
			message:'Stock not be negative',
			errorCode:'INVALID_STOCK',		
		},HttpStatus.BAD_REQUEST)
	}
}