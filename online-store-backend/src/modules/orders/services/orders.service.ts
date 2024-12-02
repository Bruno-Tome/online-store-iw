import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from '../../products/services/products.service';
import { Order } from '../schemas/orders.schema';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>,
        private productsService: ProductsService,
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const { items, customerId } = createOrderDto;

        // Update product stock
        for (const item of items) {
            const product = await this.productsService.findOne(item.productId);
            if (!product || product.stock < item.quantity) {
                throw new NotFoundException(
                    `Product ${item.productId} does not exist or insufficient stock.`,
                );
            }
            await this.productsService.updateStock(item.productId, product.stock - item.quantity);
        }

        const order = new this.orderModel({ customerId, items });
        return order.save();
    }

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async findOne(id: string): Promise<Order> {
        return this.orderModel.findById(id).exec();
    }
}
