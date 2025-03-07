export class ProductModel {
  _id: string;
  image: string;
  title: string;
  description: string;
  advantages: string;
  disAdvantages: string;
  price: number;
  oldPrice: number;
  credit: number;
  calculatedRating: number;
  categories: string[];
  tags: string[];
  characteristics: Record<string, string>;
}
