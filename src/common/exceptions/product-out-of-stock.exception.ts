import { HttpException, HttpStatus } from "@nestjs/common"

export class ProductOutOfStockException extends HttpException{
	constructor(){
		super({
			message:'Not enough stock',
			errorCode:'NOT_ENOUGH_STOCK'
		},HttpStatus.BAD_REQUEST)
	}
}