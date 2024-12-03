import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductsService } from '../products/services/products.service';
import { Order, OrderSchema } from './schemas/orders.schema';
import { Product, ProductSchema } from '../products/schemas/products.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Order.name, schema: OrderSchema },
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    controllers: [OrdersController],
    providers: [OrdersService, ProductsService],
    exports: [OrdersService],
})
export class OrdersModule {}
