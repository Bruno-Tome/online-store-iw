import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  orderCount: number; // Tracks the number of orders made with this product

  @Prop({ required: true, default: 0 })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
