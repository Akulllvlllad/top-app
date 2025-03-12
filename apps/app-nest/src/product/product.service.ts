import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModule } from './product.module';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(dto);
    return product.save();
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateProductDto): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto) {
    return this.productModel
      .aggregate([
        { $match: { categories: dto.category } },
        { $limit: dto.limit },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$review' },
            reviewAvg: { $avg: '$review.rating' },
          },
        },
      ])
      .exec();
  }
}
