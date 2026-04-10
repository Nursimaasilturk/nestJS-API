import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {
	constructor(private prisma:PrismaService){}
	async create(
		data:{
			orderId:number;
			productId:number;
			quantity:number;
			price:number;
		}
	)
	{
		return this.prisma.orderItem.create({
			data,
			include:{
				product:true,
				order:true
			}
		})
	}
}	
