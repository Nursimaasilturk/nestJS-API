import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductOutOfStockException } from 'src/common/exceptions/product-out-of-stock.exception';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';
import { InvalidQuantityException } from 'src/common/exceptions/invalid-quantity.exception';
import { ProductNotFoundException } from 'src/common/exceptions/product-not-found.exception';
import { OrderNotFoundException } from 'src/common/exceptions/order-not-found.exception';

@Injectable()
export class OrderService {
	constructor(private prisma:PrismaService){}

	async createOrder(data: CreateOrderDto) {
		const user = await this.prisma.user.findUnique({
			where:{
				id: data.userId
			}
		})
		if(!user) throw new UserNotFoundException();
		for (const item of data.items){
			const product = await this.prisma.product.findUnique({
				where:{
					id:item.productId,
				}
			})
			if(!product) throw new ProductNotFoundException();
			if(item.quantity < 0) throw new InvalidQuantityException();
			if(product.stock < item.quantity) throw new ProductOutOfStockException();
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
		if(!order) throw new OrderNotFoundException();
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
		if(!order) throw new OrderNotFoundException();
		return this.prisma.order.delete({where:{id}})
	}
}
