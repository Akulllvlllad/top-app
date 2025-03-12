import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

class ProductCharacteristics {
  @Prop()
  name: string;

  @Prop()
  value: string;
}

@Schema({ timestamps: true })
export class Product {
  @Prop()
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  advantages: string;

  @Prop()
  disAdvantages: string;

  @Prop()
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop()
  credit: number;

  @Prop()
  calculatedRating: number;

  @Prop({ type: () => [String] })
  categories: string[];

  @Prop({ type: () => [String] })
  tags: string[];

  @Prop({ type: () => [ProductCharacteristics], _id: true })
  characteristics: ProductCharacteristics[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
