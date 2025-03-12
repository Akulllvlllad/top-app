import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum TopLevelCategory {
  Courses = 1,
  Services,
  Books,
  Products,
}

export type TopPageDocument = HydratedDocument<TopPage>;

export class HhData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

export class TopPageAdvantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

@Schema({ timestamps: true })
export class TopPage {
  @Prop({ enum: TopLevelCategory, type: () => Number })
  firstLevelCategory: TopLevelCategory;

  @Prop()
  secondLevelCategory: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({ type: () => HhData })
  hh?: HhData;

  @Prop({ type: () => [TopPageAdvantage] })
  advantages: TopPageAdvantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop({ type: () => [String] })
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
