import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Patch,
  HttpCode,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_EXIST } from './auth.constants';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_EXIST);
    }
    return product;
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedProduct = await this.productService.deleteById(id);
    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_EXIST);
    }
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateProductDto) {
    const updatedProduct = await this.productService.updateById(id, dto);
    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_EXIST);
    }
    return updatedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return await this.productService.findWithReviews(dto);
  }
}
