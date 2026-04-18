import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
	constructor(private prisma:PrismaService){}

	create(data:CreateProductDto){
		if(data.price < 0) throw new BadRequestException('Price not be negative')
		if(data.stock < 0) throw new BadRequestException('Stock not be negative')	
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
		if(!product) throw new NotFoundException('Product not found');
		return product;
	}
	async updateProductById(id:number,data:UpdateProductDto){
		const product = await this.prisma.product.findUnique({where:{id}})
		if(!product) throw new NotFoundException('Product not found');
		if(data.price !== undefined && data.price < 0) throw new BadRequestException('Price not be negative')
		if(data.stock !== undefined && data.stock < 0) throw new BadRequestException('Stock not be negative')
		return this.prisma.product.update({
			where:{
				id
			},
			data:data
		})
	}
	async deleteProductById(id:number){
		const product = await this.prisma.product.findUnique({where:{id}})
		if(!product) throw new NotFoundException('Product not found');
		return this.prisma.product.delete({
			where:{
				id
			}
		})
	}
	
}
