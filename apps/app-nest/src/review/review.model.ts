import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MSchema } from 'mongoose';

import { Product } from '../product/product.model';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop({ type: MSchema.Types.ObjectId, ref: Product.name })
  productId: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
