import { IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5)
  @Min(0)
  rating: number;

  @IsString()
  productId: string;
}
