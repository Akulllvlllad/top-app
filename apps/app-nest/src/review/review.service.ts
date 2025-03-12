import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewDocument> {
    const review = new this.reviewModel(dto);
    return review.save();
  }

  async delete(id: number): Promise<ReviewDocument | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId) {
    return this.reviewModel.find({ productId }).exec();
  }

  async deleteAllByProductId(productId) {
    return this.reviewModel.deleteMany({ productId }).exec();
  }
}
