import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductNotFoundException extends HttpException{
	constructor(){
		super({
			message:'Product not found',
			errorCode:'PRODUCT_NOT_FOUND',		
		},HttpStatus.NOT_FOUND)
	}
}