import { HhData, TopLevelCategory, TopPageAdvantage } from '../top-page.model';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  firstLevelCategory: TopLevelCategory;

  @IsString()
  secondLevelCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  hh?: HhData;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantage)
  advantages: TopPageAdvantage[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
