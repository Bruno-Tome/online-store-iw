import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
;
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../schemas/products.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

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
        return this.productModel.findByIdAndDelete(id).exec();
    }
    async updateStock(id: string, stock: number): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, { stock }, { new: true }).exec();
    }
        
        
}
