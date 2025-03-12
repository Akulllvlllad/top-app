import { Injectable } from '@nestjs/common';
import { TopLevelCategory, TopPage, TopPageDocument } from './top-page.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name) private readonly topPage: Model<TopPage>
  ) {}

  async create(dto: CreateTopPageDto): Promise<TopPageDocument> {
    const review = new this.topPage(dto);
    return review.save();
  }

  async findById(id: string): Promise<TopPageDocument | null> {
    return this.topPage.findById(id).exec();
  }

  async deleteById(id: string): Promise<TopPageDocument | null> {
    return this.topPage.findByIdAndDelete(id).exec();
  }

  async updateById(
    id: string,
    dto: CreateTopPageDto
  ): Promise<TopPageDocument | null> {
    return this.topPage.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByAlias(alias: string): Promise<TopPageDocument | null> {
    return this.topPage.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory): Promise<TopPage[]> {
    return this.topPage
      .aggregate()
      .match({ firstLevelCategory: firstCategory })
      .group({
        _id: { secondLevelCategory: '$secondLevelCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } },
      })
      .exec();
  }

  async textSearch(query: string): Promise<TopPage[]> {
    return this.topPage
      .find({ $text: { $search: query, $caseSensitive: false } })
      .exec();
  }
}
