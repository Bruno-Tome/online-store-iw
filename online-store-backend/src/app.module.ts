import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { QuotationModule } from './modules/quotation/quotation.module';


@Module({
  imports: [
    UsersModule,

   MongooseModule.forRoot('mongodb://mongo:27017/online-store'),
    ProductsModule, 
   OrdersModule, AuthModule, QuotationModule
  ],
})
export class AppModule {}
