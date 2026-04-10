import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
	constructor(private prisma:PrismaService){}

	async createOrder(data: any) {
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
}
