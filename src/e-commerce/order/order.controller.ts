import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body:CreateOrderDto){
    return this.orderService.createOrder(body);  
  }
  @Get(':id')
  getOrderById(@Param('id')id:string){
    return this.orderService.getOrderById(+id);
  }
  @Delete(':id')
  deleteOrderById(@Param('id') id:string){
    return this.orderService.deleteOrderById(+id);
  }
}
