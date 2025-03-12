import {
  Body,
  Controller,
  Post,
  Param,
  Delete,
  Get,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new NotFoundException(REVIEW_NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId', IdValidationPipe) productId: string,
    @UserEmail() email: string
  ) {
    console.log(email);
    return this.reviewService.findByProductId(productId);
  }
}
