import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body:any){
    return this.orderService.createOrder(body);  
  }
}
