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

  @Prop({
    type: {
      width: Number,
      height: Number,
      length: Number,
      weight: Number,
    },
    required: true,
    default: {
      width: 15,
      height: 15,
      length: 15,
      weight: 0.5,
    },
  })
  dimensions: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };
}

export const ProductSchema = SchemaFactory.createForClass(Product);
