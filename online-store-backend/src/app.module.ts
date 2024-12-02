import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';


@Module({
  imports: [
    UsersModule,
   MongooseModule.forRoot('mongodb://mongo:27017/online-store'),
    ProductsModule, 
   OrdersModule
  ],
})
export class AppModule {}
