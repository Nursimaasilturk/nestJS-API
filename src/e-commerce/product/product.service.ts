import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
	constructor(private prisma:PrismaService){}

	create(body:any){
		return this.prisma.product.create({data: body});
	}
	getAllProducts(){
		return this.prisma.product.findMany({
			include:{
				user:true
			}
		});
	}
	getProductById(id:number){
		return this.prisma.product.findUnique({
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
	}
	updateProductById(id:number,body:any){
		return this.prisma.product.update({
			where:{
				id
			},
			data:body
		})
	}
	deleteProductById(id:number){
		return this.prisma.product.delete({
			where:{
				id
			}
		})
	}
}
