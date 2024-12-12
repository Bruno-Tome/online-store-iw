import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../schemas/products.schema';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async onModuleInit() {
    try {
      const res = await this.findAll(); // this method returns user data exist in database (if any)
      // checks if any user data exist

      if (res.length === 0) {
        const newProduct = {
          name: 'Product 1',
          price: 100,
          stock: 10,
          images: ['https://picsum.photos/200', 'https://picsum.photos/200'],
          description: 'This is a product description',
          dimensions: {
            width: 10,
            height: 10,
            length: 10,
            weight: 10,
          },
        } as CreateProductDto;

        for (let i = 0; i < 10; i++) {
          newProduct.name = `Product ${i + 1}`;
          newProduct.price = Math.floor(Math.random() * 1000);
          newProduct.stock = Math.floor(Math.random() * 100);

          const response = await this.create(newProduct); // this method creates new user in database
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async create(data: CreateProductDto): Promise<Product> {
    const product = new this.productModel(data);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.orderCount > 0) {
      throw new Error('Cannot delete a product that has associated orders');
    }

    return this.productModel.findByIdAndDelete(id).exec();
  }
  async updateStock(id: string, stock: number): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, { stock }, { new: true })
      .exec();
  }

  async updateOrderCount(id: string, count: number): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, { $inc: { orderCount: count } }, { new: true })
      .exec();
  }
  async deleteAll(): Promise<any> {
    return this.productModel.deleteMany().exec();
  }
}
