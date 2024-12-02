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
}

export const OrderSchema = SchemaFactory.createForClass(Order);
