import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
	products = [
		{
		  id: 1,
		  name: 'Laptop',
		  price: 15000,
		  stock: 5,
		  category: 'tech',
		},
		{
		  id: 2,
		  name: 'Phone',
		  price: 8000,
		  stock: 10,
		  category: 'tech',
		},
		{
		  id: 3,
		  name: 'T-shirt',
		  price: 300,
		  stock: 50,
		  category: 'clothing',
		},
	  ];
	createProduct(createProductDto:CreateProductDto){
		const newProductObject={
			id:Date.now(),
			...createProductDto
		}
		this.products.push(newProductObject);
		return newProductObject;
	}
	getAllProducts(){
		return this.products;
	}
	findProductById(productId:string){
		const product = this.products.find( product => product.id === Number(productId) );
		return product;
	}
	updateProductById(productId:string,updatedProductDto:UpdateProductDto){
		const productIndex = this.products.findIndex( product => product.id === Number(productId) );
		if(productIndex === -1) return undefined;
		this.products[productIndex] = {...this.products[productIndex],...updatedProductDto,}

		return this.products[productIndex]

	}
	deleteProductById(productId:string){
		const index = this.products.findIndex(product => product.id === Number(productId));
		if(index === -1) return undefined;
		const deleted = this.products.splice(index,1);
		return deleted[0];
	} 

}
