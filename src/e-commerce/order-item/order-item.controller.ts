import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { CreateOrderDto } from '../order/dto/create-order.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() body:CreateOrderDto){
    return this.orderService.createOrder(body);
  }
}
