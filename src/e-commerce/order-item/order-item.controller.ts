import { Body, Controller, Post } from '@nestjs/common';
import { OrderItemService } from './order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() body:any){
    return this.orderItemService.create(body);
  }
}
