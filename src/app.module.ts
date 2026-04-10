import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './e-commerce/product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './e-commerce/user/user.module';
import { OrderModule } from './e-commerce/order/order.module';
import { OrderItemModule } from './e-commerce/order-item/order-item.module';

@Module({
  imports: [PrismaModule,UserModule,ProductModule, OrderModule, OrderItemModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
