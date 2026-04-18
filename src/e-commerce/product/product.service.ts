import { Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductNotFoundException } from 'src/common/exceptions/product-not-found.exception';
import { InvalidPriceException } from 'src/common/exceptions/invalid-price.exception';
import { InvalidStockException } from 'src/common/exceptions/invalid-stock.exception';

@Injectable()
export class ProductService {
	constructor(private prisma:PrismaService){}

	create(data:CreateProductDto){
		if(data.price < 0) throw new InvalidPriceException();
		if(data.stock < 0) throw new InvalidStockException();
		return this.prisma.product.create({data: data});
	}
	getAllProducts(){
		return this.prisma.product.findMany({
			include:{
				user:true
			}
		});
	}
	async getProductById(id:number){
		const product = await this.prisma.product.findUnique({
			where:{
				id
			},
			include:{
				orderItems:{
					include:{
						order:true
					}
				}
			}
		})
		if(!product) throw new ProductNotFoundException();
		return product;
	}
	async updateProductById(id:number,data:UpdateProductDto){
		const product = await this.prisma.product.findUnique({where:{id}})
		if(!product) throw new ProductNotFoundException();
		if(data.price !== undefined && data.price < 0) throw new InvalidPriceException();
		if(data.stock !== undefined && data.stock < 0) throw new InvalidStockException();
		return this.prisma.product.update({
			where:{
				id
			},
			data:data
		})
	}
	async deleteProductById(id:number){
		const product = await this.prisma.product.findUnique({where:{id}})
		if(!product) throw new ProductNotFoundException();
		return this.prisma.product.delete({
			where:{
				id
			}
		})
	}
	
}
