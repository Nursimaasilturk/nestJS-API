import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
	constructor(private prisma:PrismaService){}

	async createOrder(data: CreateOrderDto) {
		const user = await this.prisma.user.findUnique({
			where:{
				id: data.userId
			}
		})
		if(!user) throw new NotFoundException('user is not found')
		for (const item of data.items){
			const product = await this.prisma.product.findUnique({
				where:{
					id:item.productId,
				}
			})
			if(!product) throw new NotFoundException(`Product ${item.productId} is not found`);
			if(item.quantity < 0) throw new BadRequestException('Quantity must be greater than zero');
			if(product.stock < item.quantity) throw new BadRequestException(`Not enough stock for product ${product.name}`)
		}
		return this.prisma.order.create({
		  data: {
			userId: data.userId,
			total: 0, // şimdilik boş ver
			items: {
			  create: data.items.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
				price: 100, // şimdilik sabit ver (sonra düzelteceğiz)
			  })),
			},
		  },
		  include: {
			items: true,
		  },
		});
	}
	async getOrderById(id:number){
		const order = await this.prisma.order.findUnique({
			where:{
				id
			}
		});
		if(!order) throw new NotFoundException('order not found');
		return this.prisma.order.findUnique({
			where:{
				id
			},
			include:{
				user:true,
				items:{
					include:{
						product:true
					}
				}
			}
		});
	}
	async deleteOrderById(id:number){
		const order = await this.prisma.order.findUnique({
			where:{
				id
			}
		});
		if(!order) throw new NotFoundException('order not found');
		return this.prisma.order.delete({where:{id}})
	}
}
