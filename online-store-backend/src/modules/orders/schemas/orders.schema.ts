import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  customerId: string;

  @Prop([{ productId: String, quantity: Number }])
  items: { productId: string; quantity: number }[];

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({
    required: true,
    default: {
      id: 1,
      price: 30,
    },
    type: {
      id: String,
      price: Number,
    },
  })
  quotation: {
    id: string;
    price: number;
  };
}

export const OrderSchema = SchemaFactory.createForClass(Order);
