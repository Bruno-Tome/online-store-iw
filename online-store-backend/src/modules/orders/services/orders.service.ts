import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from '../../products/services/products.service';
import { Order } from '../schemas/orders.schema';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private productsService: ProductsService,
  ) {}

  //  Seed data for order, if no order exists
  //   async onModuleInit() {
  //     try {
  //       const res = await this.findAll();
  //       if (res.length === 0) {
  //         const newOrder = {
  //           customerId: '1',
  //           items: [
  //             {
  //               productId: '1',
  //               quantity: 1,
  //             },
  //           ],
  //         } as CreateOrderDto;
  //         const response = await this.create(newOrder);
  //       }
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { items, customerId } = createOrderDto;

    // Update product stock
    for (const item of items) {
      const product = await this.productsService.findOne(item.productId);
      if (!product || product.stock < item.quantity) {
        throw new ForbiddenException(
          `Product ${item.productId} does not exist or insufficient stock.`,
        );
      } else {
        await this.productsService.updateStock(
          item.productId,
          product.stock - item.quantity,
        );
      }
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
  async findByUser(customerId: string): Promise<Order[]> {
    return this.orderModel.find({ customerId }).exec();
  }

  async update(updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { id, ...data } = updateOrderDto;
    return this.orderModel
      .findByIdAndUpdate(
        id,
        {
          ...data,
          updatedAt: new Date(),
        },
        { new: true },
      )
      .exec();
  }
}
