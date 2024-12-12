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

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Update product stock

    for (const item of createOrderDto.items) {
      const product = await this.productsService.findOne(item.productId);

      if (!product || product.stock < item.quantity) {
        throw new ForbiddenException(
          `Product ${item.productId} does not exist or insufficient stock.`,
        );
      } else {
        await this.productsService.updateOrderCount(
          item.productId,
          item.quantity,
        );
        await this.productsService.updateStock(
          item.productId,
          product.stock - item.quantity,
        );
      }
    }
    const order = new this.orderModel(createOrderDto);
    order.total = 0;
    for (const item of createOrderDto.items) {
      const productPrice = (await this.productsService.findOne(item.productId))
        .price;

      order.total += productPrice * item.quantity;
    }
    order.total = order.total + Number(createOrderDto.quotation.price);
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
    // Update product stock
    const order = await this.findOne(id);
    if (!order) {
      throw new ForbiddenException(`Order ${id} does not exist.`);
    }

    for (const item of data.items) {
      const product = await this.productsService.findOne(item.productId);
      const oldItem = order.items.find((i) => i.productId === item.productId);
      if (oldItem) {
        await this.productsService.updateStock(
          item.productId,
          product.stock + oldItem.quantity - item.quantity,
        );
        await this.productsService.updateOrderCount(
          item.productId,
          item.quantity - oldItem.quantity,
        );
      }
    }

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
