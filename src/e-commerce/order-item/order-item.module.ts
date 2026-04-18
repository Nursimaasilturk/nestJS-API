import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderService } from '../order/order.service';

@Module({
  imports:[PrismaModule],
  controllers: [OrderItemController],
  providers: [OrderItemService,OrderService],
})
export class OrderItemModule {}
